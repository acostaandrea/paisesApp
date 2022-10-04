import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';

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

  regiones: string[] = ['eu', 'efta', 'caricom', 'pa', 'au','usan', 'eeu', 'al', 'asean', 'cais','cefta', 'nafta', 'saarc'];
  regionActiva: string ='';
  paises: Country [] = [];

  constructor() { }

  getClaseCSS(region : string): string{
    return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activarRegion( region:string){
    this.regionActiva = region;

    //TODO: hacer llamado al servicio

  }

 
}
