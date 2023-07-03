import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';

import { Country } from '../interfaces/pais.interface';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';


@Injectable({
  providedIn: 'root' //a´plicado de manera global en la aplicacion
})
export class PaisService {
  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore : CacheStore={
    byCapital:    {term:'', countries:[]},
    byCountries:  {term:'', countries:[]},
    byRegion:     {region:'', countries:[]},
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorage()
  }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore))
  }
  private loadFromLocalStorage(){
    if(localStorage.getItem('cacheStore')){
      this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!) //el signo de admiracion es para que no me de error
    }
  }


  private getCountriesRequest( url: string ): Observable<Country[]> {
    return this.http.get<Country[]>( url )
      .pipe(
        catchError( () => of([]) ),
        // delay( 2000 ),
      );
  }


  buscarPais(termino: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${termino}` //armamos el url
    // return this.http.get<Country[]>(url, {params : this.httpParams })
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCountries = {term:termino, countries}),
      tap( ()=> this.saveToLocalStorage())
    )
  }

  buscarCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}` //armamos el url
    // return this.http.get<Country[]>(url, {params : this.httpParams })
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byCapital = {term, countries}),
      tap( ()=> this.saveToLocalStorage())
    )
  }

  getPaisPorId(id: string): Observable<Country | null> {
    const url = `${ this.apiUrl }/alpha/${ id }`;
    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
    }

    buscarRegion(region : Region): Observable<Country[]>{
      const url = `${this.apiUrl}/region/${region}` //armamos el url
      // return this.http.get<Country []>(url, {params : this.httpParams })
      // .pipe(
        //   catchError( err => of([])) //of es una funcion que genera observables que transforma lo que sea que pongamos entre parentesis en un nuevo observable
        // )
    return this.getCountriesRequest(url)
    .pipe(
      tap( countries => this.cacheStore.byRegion = {region, countries}),
      tap( ()=> this.saveToLocalStorage())
    )

  }
  get httpParams() {
    return new HttpParams()
    .set('field', 'name')
    .set('field', 'capital')
    .set('field', 'population')
    .set('field', 'flags')
    .set('field', 'cca2')

  }


  //termino = termino de busqueda, subscribe para que se ejecute, es un metodo que recibe el termino y retorna un observable


} //inyectar el servici client http para trabajar sus peticiones

//operadores rxjs son unas funciones que se van a ejecutar en base al producto del observable]/ get/
// of es una funcion que genera observables que transforma lo que sea que pongamos entre parentesis en un nuevo observable
//Coloco el tipado luego de generar la  interface, como un arreglo para que la respuesta puedan ser varios paises coincidentes con la busqueda

