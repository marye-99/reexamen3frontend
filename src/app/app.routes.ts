import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { NotasComponent } from './componentes/notas/notas.component';

export const routes: Routes = [
    {
        path:'',
        component: HomeComponent,
        title: 'home'
    },
    {
        path:'notas',
        component:NotasComponent,
        title:'notas'
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }



];
