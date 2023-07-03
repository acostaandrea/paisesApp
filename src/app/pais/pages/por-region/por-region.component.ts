import { Component } from '@angular/core';
import { defaultThrottleConfig } from 'rxjs/internal/operators/throttle';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';
import { Region } from '../../interfaces/region.type';



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

  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  selectedRegion?: Region;
  countries: Country [] = [];

  constructor(
    private paisService : PaisService
  ) { }

  ngOnInit(): void {
    this.countries = this.paisService.cacheStore.byRegion.countries;
    this.selectedRegion = this.paisService.cacheStore.byRegion.region;
  }

  searchByRegion( region: Region ):void  {

    this.selectedRegion = region;

    this.paisService.buscarRegion( region )
      .subscribe( countries => {
        this.countries = countries;
      });

  }

  // getClaseCSS(region : string): string{
  //   return (region === this.regionActiva) ? 'btn btn-primary' : 'btn btn-outline-primary'
  // }

  // activarRegion( region:string){

  //   if(region === this.regionActiva){return}   //para que no haga refresh cuando seguimos en la misma seccion
  //   this.regionActiva = region;
  //   this.paises = []; //purgo paises para cambiar la velocidad de reaccion

  //   this.paisService.buscarRegion( region)
  //   .subscribe (paises => this.paises = paises);

  // }


}
