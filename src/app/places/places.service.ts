import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
private http=inject(HttpClient)
  loadedUserPlaces = this.userPlaces.asReadonly();
  places = signal<Place[] >([]);
  loadAvailablePlaces() {
   return this.fetchPlacces('http://localhost:3000/places')
  }

  loadUserPlaces() {
   return this.fetchPlacces('http://localhost:3000/user-places').pipe(
    tap({//tap is used to check data without executing observable or update the data without subscribing
      next:(userPlaces)=>this.userPlaces.set(userPlaces.places)
    })
  )
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update((preValue)=>[...preValue,place])
    return this.http.put('http://localhost:3000/user-places',{ placeId:place.id})
  }

  removeUserPlace(place: Place) {}

  private fetchPlacces(url:string){
  return  this.http.get<{places:Place[]}>(url)
  }
}
