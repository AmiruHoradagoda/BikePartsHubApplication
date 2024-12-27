import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bike, BikeGet, BikeSave, BikeUpdate } from '../../core/models/interface/Bike';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class BikeService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Fetch all bikes
  getBikes(): Observable<BikeGet[]> {
    return this.http.get<BikeGet[]>(`${this.apiUrl}/api/v1/bikes/getAllBikes`);
  }

  // Save new bike details
  saveBikeDetails(bike: BikeSave): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/api/v1/bikes/save`, bike);
  }

  // Update existing bike details
  updateBikeDetails(id: number, bike: BikeUpdate): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/api/v1/bikes/update`, bike, {
      params: { id: id.toString() },
    });
  }

  // Delete a bike by its ID
  deleteBikeDetails(bikeId: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/api/v1/bikes/delete`, {
      body: bikeId,
    });
  }
}
