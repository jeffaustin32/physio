declare var google: any;
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { CoordinatesModel } from '../../models/coordinates.model';

@Injectable()
export class MapsService {
  constructor() { }

  geocode(address: string) {
    // Make a geocode request to Google
    return Observable.create((subscriber) => {
      let geocoder = new google.maps.Geocoder();

      geocoder.geocode({ 'address': address }, function (results, status) {
        let latLng: CoordinatesModel = new CoordinatesModel(0, 0);
        if (status == 'OK') {
          latLng = new CoordinatesModel(
            results[0].geometry.location.lat(),
            results[0].geometry.location.lng()
          );
        }
        subscriber.next(latLng);
        subscriber.complete();
      });
    });
  }

  distance(origin: string, destination: string) {
    // Make a geocode request to Google
    return Observable.create((subscriber) => {
      var service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [origin],
          destinations: [destination],
          travelMode: 'DRIVING',
          avoidHighways: false,
          avoidTolls: false,
        }, function (response, status) {
          console.log('status', status)
          console.log('response:', response);
          subscriber.next(response);
          subscriber.complete();
        });
    });
  }
}