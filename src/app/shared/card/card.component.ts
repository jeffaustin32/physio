import { Component, OnInit, AfterViewInit, trigger, state, style, transition, animate, keyframes, Input } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('slideInOut', [
      state('*', style({
        '-ms-transform': 'translate3D(0px, 0px, 0px)',
        '-webkit-transform': 'translate3D(0px, 0px, 0px)',
        '-moz-transform': 'translate3D(0px, 0px, 0px)',
        '-o-transform': 'translate3D(0px, 0px, 0px)',
        transform: 'translate3D(0px, 0px, 0px)',
        opacity: 1
      })),
      state('void', style({
        opacity: 0
      })),
      transition('void => *', [
        style({
          opacity: 0,
          '-ms-transform': 'translate3D(0px, 100px, 0px)',
          '-webkit-transform': 'translate3D(0px, 100px, 0px)',
          '-moz-transform': 'translate3D(0px, 100px, 0px)',
          '-o-transform': 'translate3D(0px, 100px, 0px)',
          transform: 'translate3D(0px, 100px, 0px)',
        }),
        animate('0.2s 0s ease-out'),
      ]),
      transition('* => void', [
        style({ opacity: 1 }),
        animate('0.2s 0s ease-out'),
      ])
    ])
  ]
})

export class CardComponent implements OnInit {
  @Input() private header: string;

  constructor() { }

  ngOnInit() {
  }

}
