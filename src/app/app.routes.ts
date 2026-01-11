import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';

export const routes: Routes = [

     //Rutas para categorías

    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'categories', component: CategoryComponent},
    { path: 'categories/create', component: CategoryFormComponent},
    { path: 'categories/edit/:idCategory', component: CategoryFormComponent},

];
