import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { PartComponent } from './components/part/part.component';

export const routes: Routes = [

     //Routes for categories

    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'categories', component: CategoryComponent},
    { path: 'categories/create', component: CategoryFormComponent},
    { path: 'categories/edit/:idCategory', component: CategoryFormComponent},

    { path: 'parts', component: PartComponent },

];
