import { Component, OnInit, signal } from '@angular/core';

import { PlacesContainerComponent } from '../places-container/places-container.component';
import { PlacesComponent } from '../places.component';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-user-places',
  standalone: true,
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent],
})
export class UserPlacesComponent implements OnInit{

   
  subscription:Subscription | undefined;
  error=signal('')
  isFetching=signal(false);
  constructor(private http:HttpClient,private placesService:PlacesService){}

  places=this.placesService.loadedUserPlaces;

  ngOnInit(): void {
//user-places
this.isFetching.set(true);
this.subscription=this.placesService.loadUserPlaces().subscribe({
  complete:()=> {
    this.isFetching.set(false)
  },
  error:(error:Error)=>{
    this.error.set(error.message);
  }
})
  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe
    }
  }


}
