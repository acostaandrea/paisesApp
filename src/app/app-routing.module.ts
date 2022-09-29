import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PorCapitalComponent } from "./pais/pages/por-capital/por-capital.component";
import { PorPaisComponent } from './pais/pages/por-pais/por-pais.component';
import { PorRegionComponent } from "./pais/pages/por-region/por-region.component";
import { VerPaisComponent } from "./pais/pages/ver-pais/ver-pais.component";


const routes : Routes = [
    {
        path: '' , // simula cuando estoy en ruta vacia 
        component: PorPaisComponent,  // debe estar importado en el app.module y exportado en pais
        pathMatch: "full"   // porque quiero que esta url caiga en este lugar
    }, //configuracion de la ruta ppal
    {
        path: 'region', //se muestra componente cuando alguien entre a /region
        component: PorRegionComponent

    },
    { 
        path: 'capital', //se muestra componente cuando alguien entre a /capital
        component: PorCapitalComponent

    },
    {   path: 'pais/:id', // : para que sea dinamico
        component: VerPaisComponent
    },{
        path: '**',    //definir una ruta en caso de que la persona no navegue en un /vacio o distinta a las anteriores,
        redirectTo: '' // redirecciona a home
    }

                        

]   //importar esta constante



@NgModule({

    imports:[
        RouterModule.forRoot(routes)  //hace la configuracion propiamente de las rutas, forRoot para las ppales, routes por la const que defini previamente

    ],
    exports:[
        RouterModule //para utilizarlo afuera

    ]

})

export class AppRoutingModule{

}

//lo importo en app.module.ts
