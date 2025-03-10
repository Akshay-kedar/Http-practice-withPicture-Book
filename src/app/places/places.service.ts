import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
private http=inject(HttpClient)
  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
   return this.fetchPlacces('http://localhost:3000/places')
  }

  loadUserPlaces() {
   return this.fetchPlacces('http://localhost:3000/user-places')
  }

  addPlaceToUserPlaces(place: Place) {}

  removeUserPlace(place: Place) {}

  private fetchPlacces(url:string){
  return  this.http.get<{places:Place[]}>(url)
  }
}
