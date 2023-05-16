import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PorRegionComponent } from './pages/por-region/por-region.component';
import { PorCapitalComponent } from './pages/por-capital/por-capital.component';
import { VerPaisComponent } from './pages/ver-pais/ver-pais.component';
import { PorPaisComponent } from './pages/por-pais/por-pais.component';

const routes: Routes = [
  {
    path: 'region', //se muestra componente cuando alguien entre a /region
    component: PorRegionComponent

  },
  {
    path: 'capital', //se muestra componente cuando alguien entre a /capital
    component: PorCapitalComponent
  },
  {
    path: 'paises',
    component: PorPaisComponent
  },
  {
    path: 'pais/:id', // : para que sea dinamico
    component: VerPaisComponent
  },
  {
    path: '**',
    redirectTo: 'countries/paises'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
