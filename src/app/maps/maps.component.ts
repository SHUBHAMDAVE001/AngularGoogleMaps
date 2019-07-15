import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
// import * as googleMaps from '@google/maps';
// import { } from 'googlemaps';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  const google: any;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;

  
  locationSelected = false;
  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone ) { 
  
  }

  ngOnInit () {
    this.zoom = 8;
    this.latitude = 25.317294;
    this.longitude = 83.017947;

    this.searchControl = new FormControl();

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: {'country':'IN'}
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry == undefined || place.geometry == null) {
            return;
          }
          const latlong = {
            latitude : place.geometry.location.lat,
            longitude : place.geometry.location.lng
          };

          this.latlongs.push(latlong);
          this.searchControl.reset();
        });
      });
    });
  }

  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude
        this.zoom = 8;
      })
    }
  }
  onchooseLocation(event) {
    console.log(event);
    this.longitude = event.coords.lng;
    this.latitude = event.coords.lat;
    this.locationSelected = true;
  }

}
