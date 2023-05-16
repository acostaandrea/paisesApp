import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {switchMap, tap} from "rxjs/operators";  //permite recibir un observable y regrasar otro observable, tap dispara un efecto secundario
import { Country } from '../../interfaces/pais.interface';


import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  public pais?: Country;   //con signo de pregunta le digo a typescript que puede ser undefined

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService,
    private router: Router
    ) { } // viene con todo lo necesario para subscribirse a todos los cambios del url

  ngOnInit(): void {
    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.paisService.getPaisPorId(id) ),
      tap(console.log)  //recibe el prodcuto del observable e imprime en consola
    )
    .subscribe ( pais => {
      if(!pais){
        return this.router.navigateByUrl('/'); //si no hay pais regresa a la pagina principal
      }
      this.pais = pais; //si hay pais lo asigna a la variable pais
      return
    });


    // this.activatedRoute.params.subscribe(({id}) =>{
    //   console.log(id);

    //   this.paisService.getPaisPorId(id)
    //   .subscribe(pais =>{
    //     console.log(pais);
    //   })


    // } )

  }

}

//creamos un observable en los servicios
// Con el pipe especifico que operadores trabajan con el productio del observable params
