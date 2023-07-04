import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators'; //permite recibir un observable y regrasar otro observable, tap dispara un efecto secundario
import { Country } from '../../interfaces/pais.interface';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

import { PaisService } from '../../services/pais.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styleUrls: ['./ver-pais.component.css'],
})
export class VerPaisComponent implements OnInit {
  public country?: Country; //con signo de pregunta le digo a typescript que puede ser undefined

  public googleMapsImageUrl: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService,
    private router: Router
  ) {} // viene con todo lo necesario para subscribirse a todos los cambios del url

  @ViewChild('mapa') divMap?: ElementRef;


  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.paisService.getPaisPorId(id)),
        tap(console.log)
      )
      .subscribe((pais) => {
        if (!pais) {
          return this.router.navigateByUrl('/');
        }
        this.country = pais;
        const lat = pais.latlng[0];
        const lng = pais.latlng[1];
        this.googleMapsImageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}`;
        this.cargarMapa();
        return;
      });
  }

  cargarMapa() {
    if (this.country) {
      const lat = this.country.latlng[0];
      const lng = this.country.latlng[1];
      const map = new mapboxgl.Map({
        container: this.divMap?.nativeElement,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [lng, lat],
        zoom: 3,

      });
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);


    }
  }

}

//creamos un observable en los servicios
// Con el pipe especifico que operadores trabajan con el productio del observable params
