import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
//import { AppRoutingModule } from '../app-routing.module';


import { SidebarComponent } from './sidebar/sidebar.component';





@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent  //exporto componente porque va a ser usado por toda la aplicacion
  ],

  imports: [
    CommonModule,
    RouterModule //importo este modulo para que funcione el ruteo
  ]
})
export class SharedModule { }
