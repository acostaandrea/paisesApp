import { Component } from '@angular/core';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styles: [`
    button{
      margin-right: 5px;
      margin-bottom: 5px
    }
  `]
})
export class PorRegionComponent {

  regiones: string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string ='';
  paises: Country [] = [];

  constructor(
    private paisService : PaisService
  ) { }

  getClaseCSS(region : string): string{
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion( region:string){

    if(region === this.regionActiva){return}   //para que no haga refresh cuando seguimos en la misma seccion 
    this.regionActiva = region;
    this.paises = []; //purgo paises para cambiar la velocidad de reaccion

    this.paisService.buscarRegion( region)
    .subscribe (paises => this.paises = paises);

  }

 
}
