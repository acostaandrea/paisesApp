import { Component, OnInit} from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent implements OnInit {

  termino: string = "";
  hayError: boolean = false;
  countries: Country [] = [];
  public initialValue: string = "";
  public isLoading: boolean = false;

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.countries = this.paisService.cacheStore.byCapital.countries;
    this.initialValue = this.paisService.cacheStore.byCapital.term;
  }
  searchByCapital( term: string ):void  {

    this.isLoading = true;

    this.paisService.buscarCapital( term )
      .subscribe( countries => {
        this.countries = countries;
        this.isLoading = false;
      });

  }

  // buscar(termino: string) {
  //   this.hayError = false;
  //   this.termino = termino;
  //   this.paisService.buscarCapital(termino)
  //     .subscribe(paises => {
  //       this.paises = paises; //incluyo el items del ngfor
  //     }, (err) => {
  //       this.hayError = true;
  //       this.paises = []
  //     });
  //   }
}
