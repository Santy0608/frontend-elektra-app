import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';

export const routes: Routes = [

     //Rutas para categorías

    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'categories', component: CategoryComponent},
   // { path: 'categories/create', component: CategoriaFormComponent},
   // { path: 'categories/edit/:idCategory', component: CategoriaFormComponent},

];
