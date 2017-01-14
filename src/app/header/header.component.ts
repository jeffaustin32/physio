import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header-nav',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  getTitle() {
    return 'Dashboard';
  }

  constructor() { }

  ngOnInit() {
  }

}
