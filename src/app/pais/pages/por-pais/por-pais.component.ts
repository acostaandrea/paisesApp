import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-pais',
  templateUrl: './por-pais.component.html',
  styles: [
    `
    li{
      cursor: pointer;
    }
  `
  ]
})
export class PorPaisComponent implements OnInit{


  countries: Country [] = [];

  public isLoading: boolean = false;
  public initialValue: string = "";

  mostrarSugerencia : boolean = false; //para que nos ayude a ocultar la sugerencia

  constructor(private paisService: PaisService){ }

  ngOnInit(): void {
    this.countries = this.paisService.cacheStore.byCountries.countries;
    this.initialValue = this.paisService.cacheStore.byCountries.term;
  }


  searchByCountry( term: string ):void  {
    this.isLoading = true;
    this.paisService.buscarPais( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }

  // buscar(termino: string) {

  //   this.isLoading = true;

  //   this.hayError = false;
  //   this.termino = termino;
  //   this.mostrarSugerencia = false;

  //   this.paisService.buscarPais(termino)
  //     .subscribe((paises) => {

  //       // console.log(paises);
  //       this.countries = paises; //incluyo el items del ngfor
  //       this.isLoading = false;
  //     }, (err) => {
  //       this.hayError = true;
  //       this.countries = []
  //     });




  //   }


  //   sugerencias(termino: string){

  //     this.hayError=false;
  //     this.termino = termino;
  //     this.mostrarSugerencia = true;

  //     this.paisService.buscarPais(termino)
  //     .subscribe(
  //       paises => this.paisesSugeridos = paises.splice(0,5),
  //       (err) => this.paisesSugeridos = []
  //       );


  // }

  // buscarSugerido( termino : string){
  //   this.buscar(termino);

  // }
}
//para que se ejecute un observable pongo subscribe, resp es una respuesta exitosa (el next), segundo argunmento del subscribe (err)
    // buscarPais viene de pais.service


     //inyectamos el servicio generado
