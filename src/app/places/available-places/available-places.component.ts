import { Component, OnDestroy, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Subscription, throwError } from 'rxjs';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit , OnDestroy {

  places = signal<Place[] | undefined>(undefined);
subscription:Subscription | undefined;
  constructor(private http: HttpClient,private placesService:PlacesService) {}
 isFetching=signal(false);
error=signal('')

  ngOnInit(): void {
    this.isFetching.set(true);
    this.subscription=this.placesService.loadAvailablePlaces().subscribe(
      {
        next:(resData)=>{this.places.set(resData.places)},
        complete:()=> {
          this.isFetching.set(false)
        },
        error:(error:Error)=>{
          this.error.set(error.message);
        }
      })
    
  }
  onSelectPlaces(selectedPlace: Place) {
    this.placesService.addPlaceToUserPlaces(selectedPlace)
  }



  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe
    }
  }
}
