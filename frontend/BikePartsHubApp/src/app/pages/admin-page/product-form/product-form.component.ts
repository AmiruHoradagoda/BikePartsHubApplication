import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductSave } from '../../../core/models/interface/Product';
import { BikeGet, BikeSave } from '../../../core/models/interface/Bike';
import { ProductAttributeSave } from '../../../core/models/interface/ProductAttribute';
import { CommonModule } from '@angular/common';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { ProductService } from '../../../shared/services/product.service';
import { ProductFormService } from './product-form.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  templateUrl: './product-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent implements OnInit {
  productFormGroup: FormGroup;
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

  constructor(
    private formBuilder: FormBuilder,
    private af: AngularFireStorage,
    private productService: ProductService,
    private productFormService: ProductFormService
  ) {
    this.productFormGroup = this.formBuilder.group({
      productform: this.formBuilder.group({
        productName: new FormControl('', Validators.required),
        productType: new FormControl(''),
        quantity: new FormControl('', [Validators.required, Validators.min(1)]),
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
    this.fetchBikes();
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
      },
      (error) => {
        console.error('Error fetching bikes:', error);
      }
    );
  }

  upload($event: Event): void {
    const input = $event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
    }
  }

  uploadImage(): void {
    if (!this.file) {
      console.error('No file selected for upload');
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
                bikeId: bikeId, // Assuming BikeSave includes bikeId
                ...bikeDetails,
              });
              this.productFormGroup.get('bikeForm')?.reset();
              console.log('Bike ID added:', bikeId);
            } else {
              console.error('Bike ID not found');
            }
          },
          (error) => {
            console.error('Error fetching bike ID:', error);
          }
        );
    } else {
      console.error('Bike form is invalid');
    }
  }

  removeBike(index: number): void {
    this.bikeId.splice(index, 1);
    this.bikeArray.splice(index, 1);
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
          bikeIds: [...this.bikeId], // Changed to bikeIds to match interface
        } as unknown as ProductAttributeSave;
      });

      console.log('productAttributeArray:', this.productAttributeArray);

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
        imageUrl: this.imageUrl,
        productAttributes: this.productAttributeArray,
      };
      console.log(productData);
      this.productService.saveProduct(productData).subscribe(
        (response) => {
          console.log('Product saved successfully:', response);
        },
        (error) => {
          console.error('Error saving product:', error);
        }
      );
    } else {
      console.error('Form is invalid');
    }
  }
}
