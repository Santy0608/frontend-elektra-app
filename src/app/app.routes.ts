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
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { UserComponent } from './components/user/user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthComponent } from './auth_components/auth/auth.component';
import { authGuard } from './guards/auth.guard';
import { Forbidden403Component } from './forbidden_components/forbidden/forbidden.component';
import { SaleComponent } from './components/sale/sale.component';
import { SaleFormComponent } from './components/sale-form/sale-form.component';
import { ReportComponent } from './components/report/report.component';

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
    { path: 'suppliers/create', component: SupplierFormComponent},
    { path: 'suppliers/edit/:idSupplier', component: SupplierFormComponent},

    //Routes for Customers
    { path: 'customers', component: CustomerComponent},
    { path: 'customers/create', component: CustomerFormComponent},
    { path: 'customers/edit/:idCustomer', component: CustomerFormComponent},


    //Routes for Users
    { path: 'users', component: UserComponent},
    { path: 'users/create', component: UserFormComponent, canActivate: [authGuard]},
    { path: 'users/edit/:idUser', component: UserFormComponent, canActivate: [authGuard]},

    {path: 'login', component: AuthComponent},

    {path: 'forbidden', component: Forbidden403Component},

    //Routes for Sales

    {path: 'sales', component: SaleComponent},
    {path: 'sales/create', component: SaleFormComponent},

    //Routes for Reports

    {path: 'reports/sales', component: ReportComponent}

];
