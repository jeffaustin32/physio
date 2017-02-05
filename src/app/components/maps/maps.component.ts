declare var google: any;
import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { PractitionerModel } from '../../models/practitioner.model';

@Component({
    moduleId: module.id,
    selector: 'maps-cmp',
    templateUrl: 'maps.component.html',
    animations: [
        trigger('maps', [
            state('*', style({
                opacity: 1
            })),
            transition('void => *', [
                style({
                    opacity: 0,
                }),
                animate('1s 0s ease-out')
            ])
        ])
    ]
})

export class MapsComponent implements OnInit {
    ngOnInit() {
        // Get the practitioners information
        let practitioner: PractitionerModel = JSON.parse(localStorage.getItem('practitioner'));
        let myLatlng = new google.maps.LatLng(practitioner.latLng.lat, practitioner.latLng.lng);

        let mapOptions = {
            zoom: 13,
            center: myLatlng
        }

        let map = new google.maps.Map(document.getElementById("map"), mapOptions);
        let marker = new google.maps.Marker({
            position: myLatlng,
            title: "Home"
        });

        // Add the marker to the map
        marker.setMap(map);
    }
}
