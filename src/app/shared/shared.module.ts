import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  exports: [
    SidebarComponent  //exporto componente porque va a ser usado por toda la aplicacion
  ],

  imports: [
    CommonModule
  ]
})
export class SharedModule { }
