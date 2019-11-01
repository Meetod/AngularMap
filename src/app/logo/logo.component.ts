import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  template: `
  <img esriCustomWidget [position]="position" src="https://images.forbes.com/media/lists/companies/esri_416x416.jpg" width="100">
  `,
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {

  position = 'bottom-right';
  
  constructor() { }

  ngOnInit() {
  }

}
