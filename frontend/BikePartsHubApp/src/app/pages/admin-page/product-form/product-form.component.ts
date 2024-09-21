import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  ProductGet,
  ProductSave,
  ProductUpdate,
} from '../../../core/models/interface/Product';
import { BikeGet, BikeSave } from '../../../core/models/interface/Bike';
import { ProductAttributeSave } from '../../../core/models/interface/ProductAttribute';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../shared/services/product.service';
import { ProductFormService } from './product-form.service';
import { ActivatedRoute } from '@angular/router';
import { BikeService } from '../../../shared/services/bike.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productFormGroup: FormGroup;
  productId = this.route.snapshot.paramMap.get('id');
  bikeId: number[] = [];
  colorArray: string[] = [];
  file!: File;
  imageUrl!: string;
  productAttributeArray: ProductAttributeSave[] = [];

  bikes: BikeGet[] = [];

  bikeTypes: string[] = [];
  bikeModels: string[] = [];
  bikeVersions: string[] = [];
  bikeManufactures: string[] = [];

  bikeArray: BikeSave[] = [];
  bikeIdNotFoundMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private af: AngularFireStorage,
    private productService: ProductService,
    private productFormService: ProductFormService,
    private bikeService: BikeService,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {
    this.productFormGroup = this.formBuilder.group({
      productform: this.formBuilder.group({
        productName: new FormControl('', Validators.required),
        productType: new FormControl(''),
        quantity: new FormControl('', [Validators.required, Validators.min(0)]),
        category: new FormControl(''),
        manufacture: new FormControl(''),
        itemDescription: new FormControl(''),
        activeState: new FormControl(true, Validators.required),
        averageRating: new FormControl(0, [
          Validators.min(0),
          Validators.max(5),
        ]),
        pricePerUnit: new FormControl(0, [
          Validators.required,
          Validators.min(0),
        ]),
        discount: new FormControl(0),
        material: new FormControl(''),
        partNumber: new FormControl(''),
        imageUrl: new FormControl(''),
      }),
      productAttributeForm: this.formBuilder.group({
        color: new FormControl<string[]>([]),
      }),
      bikeForm: this.formBuilder.group({
        type: new FormControl(''),
        model: new FormControl(''),
        version: new FormControl(''),
        manufacture: new FormControl(''),
      }),
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId) {
        this.loadProductDetails(productId);
      }
    });
    this.fetchBikes();
  }

  loadProductDetails(productId: string): void {
    this.productFormService.getProductById(productId).subscribe(
      (product: ProductGet) => {
        // Patch product details into the form
        this.productFormGroup.get('productform')?.patchValue({
          productName: product.productName,
          productType: product.productType,
          quantity: product.quantity,
          category: product.category,
          manufacture: product.manufacture,
          itemDescription: product.itemDescription,
          activeState: product.activeState,
          averageRating: product.averageRating,
          pricePerUnit: product.pricePerUnit,
          discount: product.discount,
          material: product.material,
          partNumber: product.partNumber,
          imageUrl: product.imageUrl,
        });

        // Reset bike arrays
        this.bikeArray = [];
        this.bikeId = [];

        // Populate bike details and bike IDs
        product.productAttributes.forEach((attr) => {
          attr.bikes.forEach((bike) => {
            // Add unique bikes to the bikeArray and bikeId
            if (this.isBikeUnique(bike, this.bikeArray)) {
              this.bikeArray.push(bike);
              this.bikeId.push(bike.bikeId);
            }
          });
        });

        // Populate color array
        this.colorArray = product.productAttributes.map((attr) => attr.color);
        this.toastr.success('Product details loaded successfully', 'Success', {
          closeButton: true,
        });
      },
      (error) => {
        console.error('Error loading product details:', error);
        this.toastr.error('Failed to load product details');
      }
    );
  }

  isBikeUnique(bike: BikeSave, existingBikes: BikeSave[]): boolean {
    return !existingBikes.some(
      (existingBike) =>
        existingBike.type === bike.type &&
        existingBike.model === bike.model &&
        existingBike.version === bike.version &&
        existingBike.manufacture === bike.manufacture
    );
  }
  fetchBikes(): void {
    this.productFormService.getBikes().subscribe(
      (bikes: BikeGet[]) => {
        this.bikes = bikes;
        this.bikeTypes = [...new Set(bikes.map((bike) => bike.type))];
        this.bikeModels = [...new Set(bikes.map((bike) => bike.model))];
        this.bikeVersions = [...new Set(bikes.map((bike) => bike.version))];
        this.bikeManufactures = [
          ...new Set(bikes.map((bike) => bike.manufacture)),
        ];
        this.toastr.success('Bikes loaded successfully');
      },
      (error) => {
        console.error('Error fetching bikes:', error);
        this.toastr.error('Failed to fetch bikes');
      }
    );
  }

  upload($event: Event): void {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      this.toastr.info('File selected for upload');
    }
  }

  uploadImage(): void {
    if (!this.file) {
      console.error('No file selected for upload');
      this.toastr.error('Please select a file to upload');
      return;
    }

    const filePath = `files/${Math.random()}_${this.file.name}`;
    const fileRef = this.af.ref(filePath);
    const task = this.af.upload(filePath, this.file);

    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.imageUrl = url;
            this.productFormGroup.get('productform.imageUrl')?.setValue(url); // Set imageUrl in the form
            this.toastr.success('Image uploaded successfully');
            console.log('Download URL:', this.imageUrl);
          });
        })
      )
      .subscribe();
  }

  addBike(): void {
    if (this.productFormGroup.get('bikeForm')?.valid) {
      const bikeDetails = this.productFormGroup.get('bikeForm')?.value;

      this.productFormService
        .getBikeId(
          bikeDetails.type,
          bikeDetails.model,
          bikeDetails.version,
          bikeDetails.manufacture
        )
        .subscribe(
          (bikeId: number | null) => {
            if (bikeId !== null) {
              this.bikeId.push(bikeId);
              this.bikeArray.push({
                bikeId: bikeId,
                ...bikeDetails,
              });
              this.productFormGroup.get('bikeForm')?.reset();
              this.bikeIdNotFoundMessage = null; // Clear any previous error message
              this.toastr.success('Bike added successfully');
              console.log('Bike ID added:', bikeId);
            } else {
              this.bikeIdNotFoundMessage = 'No such bike found.';
              this.toastr.warning('Bike not found');
              console.error('Bike ID not found');
            }
          },
          (error) => {
            this.bikeIdNotFoundMessage =
              'Error fetching bike ID. Please try again.';
            this.toastr.error('Error fetching bike ID');
            console.error('Error fetching bike ID:', error);
          }
        );
    } else {
      this.bikeIdNotFoundMessage =
        'Bike form is invalid. Please fill in all required fields.';
      this.toastr.error('Bike form is invalid');
      console.error('Bike form is invalid');
    }
  }

  removeBike(index: number): void {
    this.bikeId.splice(index, 1);
    this.bikeArray.splice(index, 1);
    this.toastr.success('Bike removed successfully');
  }

  onColorChange(event: Event, color: string): void {
    const target = event.target as HTMLInputElement;
    const isChecked = target.checked;

    this.colorArray =
      this.productFormGroup.get('productAttributeForm.color')?.value || [];

    if (isChecked) {
      if (!this.colorArray.includes(color)) {
        this.colorArray.push(color);
      }
    } else {
      const index = this.colorArray.indexOf(color);
      if (index > -1) {
        this.colorArray.splice(index, 1);
      }
    }

    this.productFormGroup
      .get('productAttributeForm.color')
      ?.setValue(this.colorArray);
    console.log('colorArray:', this.colorArray);
  }

  onSubmit(): void {
    console.log('Form submission triggered');

    if (this.productFormGroup.valid) {
      const formValues = this.productFormGroup.value;

      // Generate productAttributeArray
      this.productAttributeArray = this.colorArray.map((color) => {
        return {
          color: color,
          bike_id: [...this.bikeId], // Changed to bike_id to match interface
        } as unknown as ProductAttributeSave;
      });

      console.log('productAttributeArray:', this.productAttributeArray);
      let finalImageUrl = formValues.productform.imageUrl;
      if (!finalImageUrl && this.imageUrl) {
        finalImageUrl = this.imageUrl; // Use the previously loaded image URL
      }
      const productData: ProductSave = {
        productName: formValues.productform.productName,
        productType: formValues.productform.productType,
        quantity: formValues.productform.quantity,
        category: formValues.productform.category,
        manufacture: formValues.productform.manufacture,
        itemDescription: formValues.productform.itemDescription,
        activeState: formValues.productform.activeState,
        averageRating: formValues.productform.averageRating,
        pricePerUnit: formValues.productform.pricePerUnit,
        discount: formValues.productform.discount,
        material: formValues.productform.material,
        partNumber: formValues.productform.partNumber,
        imageUrl: finalImageUrl,
        productAttributes: this.productAttributeArray,
      };
      console.log(productData);

      const productId = this.route.snapshot.paramMap.get('id');
      if (productId) {
        // If a product ID exists in the route, update the product
        const updateData: ProductUpdate = {
          productId: Number(productId),
          ...productData,
        };
        this.productFormService
          .updateProductDetails(productId, updateData)
          .subscribe(
            (response) => {
              console.log('Product updated successfully:', response);
              this.toastr.success('Product updated successfully');
            },
            (error) => {
              console.error('Error updating product:', error);
              this.toastr.error('Failed to update product');
            }
          );
      } else {
        // If no product ID is in the route, save the product as a new one
        this.productService.saveProduct(productData).subscribe(
          (response) => {
            console.log('Product saved successfully:', response);
            this.toastr.success('Product saved successfully');
          },
          (error) => {
            console.error('Error saving product:', error);
            this.toastr.error('Failed to saved product');
          }
        );
      }
    } else {
      this.toastr.error('Form is invalid. Please fix the errors');
      console.error('Form is invalid');
    }
  }
}
