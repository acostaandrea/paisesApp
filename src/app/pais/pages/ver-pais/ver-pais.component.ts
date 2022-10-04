import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {switchMap, tap} from "rxjs/operators";  //permite recibir un observable y regrasar otro observable, tap dispara un efecto secundario
import { Country } from '../../interfaces/pais.interface';


import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css']
})
export class VerPaisComponent implements OnInit {

  pais!: Country;   //con signo de admiracion le digo a typescript que confie en mi

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    
     
    ) { } // viene con todo lo necesario para subscribirse a todos los cambios del url

  ngOnInit(): void {


    this.activatedRoute.params
    .pipe(
      switchMap(({id}) => this.paisService.getPaisPorId(id) ),
      tap(console.log)  //recibe el prodcuto del observable e imprime en consola 
    )
    .subscribe ( pais => {this.pais = pais[0]});


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
