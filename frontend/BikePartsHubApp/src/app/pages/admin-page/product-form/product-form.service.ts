import { Injectable } from '@angular/core';
import { BikeService } from '../../../shared/services/bike.service';
import { Observable } from 'rxjs';
import { Bike } from '../../../core/models/interface/Bike';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductFormService {
  private apiUrl: string = 'http://localhost:8080';

  private bikeType = new Set<string>();
  private bikeModel = new Set<string>();
  private bikeVersion = new Set<string>();
  private bikeManufacture = new Set<string>();

  constructor(private bikeService: BikeService, private http: HttpClient) {}

  getBikes(): Observable<Bike[]> {
    return this.http.get<Bike[]>(`${this.apiUrl}/api/v1/bikes/getAllBikes`);
  }

  getBikeId(
    type: string,
    model: string,
    version: string,
    manufacture: string
  ): Observable<number | null> {
 
    const url = `${
      this.apiUrl
    }/api/v1/bikes/getBikeId?type=${encodeURIComponent(
      type
    )}&model=${encodeURIComponent(model)}&version=${encodeURIComponent(
      version
    )}&manufacture=${encodeURIComponent(manufacture)}`;

    // Perform the GET request and return the observable
    return this.http.get<number | null>(url);
  }
}
