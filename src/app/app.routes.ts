import { Routes } from '@angular/router';
import { CategoryComponent } from './components/category/category.component';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { PartComponent } from './components/part/part.component';
import { PartFormComponent } from './components/part-form/part-form.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { Supplier } from './models/Supplier';
import { CustomerComponent } from './components/customer/customer.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { Customer } from './models/Customer';

export const routes: Routes = [

     //Routes for categories

    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'categories', component: CategoryComponent},
    { path: 'categories/create', component: CategoryFormComponent},
    { path: 'categories/edit/:idCategory', component: CategoryFormComponent},

    //Routes for parts

    { path: 'parts', component: PartComponent },
    { path: 'parts/create', component: PartFormComponent},
    { path: 'parts/edit/:idPart', component: PartComponent},

    //Routes for Suppliers
    
    { path: 'suppliers', component: SupplierComponent},
    { path: 'suppliers/create', component: SupplierComponent},
    { path: 'suppliers/edit/:idPart', component: SupplierComponent},

    //Routes for Customers
    { path: 'customers', component: CustomerComponent},
    { path: 'customers/create', component: CustomerFormComponent},
    { path: 'customers/edit/:idCustomer', component: CustomerFormComponent}
];
