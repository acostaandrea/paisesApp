import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'shared-home-page', //selecciono el componente
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
