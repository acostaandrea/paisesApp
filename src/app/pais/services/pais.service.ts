import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/pais.interface';


@Injectable({
  providedIn: 'root' //a´plicado de manera global en la aplicacion
})
export class PaisService {

  private apiUrl: string = 'https://restcountries.com/v3.1'

  get httpParams() {
    return new HttpParams()
    .set('field', 'name')
    .set('field', 'capital')
    .set('field', 'population')
    .set('field', 'flags')
    .set('field', 'cca2')

  }

  constructor(private http: HttpClient) { }

  buscarPais(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/name/${termino}` //armamos el url

    return this.http.get<Country[]>(url, {params : this.httpParams })

  }

  buscarCapital(termino: string): Observable<Country[]> {

    const url = `${this.apiUrl}/capital/${termino}` //armamos el url

    return this.http.get<Country[]>(url, {params : this.httpParams })

  }

  getPaisPorId(id: string): Observable<Country | null> {

    const url = `${this.apiUrl}/alpha/${id}` //armamos el url
    return this.http.get<Country []>(url)
    .pipe(
      map( countries => countries.length > 0 ? countries[0] : null), //si no hay nada en el arreglo retorna null
      catchError( err => of(null)) //of es una funcion que genera observables que transforma lo que sea que pongamos entre parentesis en un nuevo observable
    )

  }

  buscarRegion(region : string): Observable<Country[]>{



    const url = `${this.apiUrl}/region/${region}` //armamos el url

    return this.http.get<Country []>(url, {params : this.httpParams })
    .pipe(
      catchError( err => of([])) //of es una funcion que genera observables que transforma lo que sea que pongamos entre parentesis en un nuevo observable
    )

  }


  //termino = termino de busqueda, subscribe para que se ejecute, es un metodo que recibe el termino y retorna un observable


} //inyectar el servici client http para trabajar sus peticiones

//operadores rxjs son unas funciones que se van a ejecutar en base al producto del observable]/ get/
// of es una funcion que genera observables que transforma lo que sea que pongamos entre parentesis en un nuevo observable
//Coloco el tipado luego de generar la  interface, como un arreglo para que la respuesta puedan ser varios paises coincidentes con la busqueda
