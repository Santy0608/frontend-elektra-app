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
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrandComponent } from './components/brand/brand.component';
import { BrandFormComponent } from './components/brand-form/brand-form.component';
import { ModelComponent } from './components/model/model.component';
import { ModelFormComponent } from './components/model-form/model-form.component';
import { EngineComponent } from './components/engine/engine.component';
import { EngineFormComponent } from './components/engine-form/engine-form.component';
import { VehicleComponent } from './components/vehicle/vehicle.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';

export const routes: Routes = [

     //Routes for categories

    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'categories', component: CategoryComponent},
    { path: 'categories/create', component: CategoryFormComponent},
    { path: 'categories/edit/:idCategory', component: CategoryFormComponent},

    //Routes for parts

    { path: 'parts', component: PartComponent },
    { path: 'parts/create', component: PartFormComponent},
    { path: 'parts/edit/:idPart', component: PartFormComponent},

    //Routes for Suppliers

    { path: 'suppliers', component: SupplierComponent},
    { path: 'suppliers/create', component: SupplierFormComponent},
    { path: 'suppliers/edit/:idSupplier', component: SupplierFormComponent},
    
    //Routes for Brands
    { path: 'brands', component: BrandComponent },
    { path: 'brands/create', component: BrandFormComponent},
    { path: 'brands/edit/:idBrand', component: BrandFormComponent},

    //Routes for Models
    { path: 'models', component: ModelComponent },
    { path: 'models/create', component: ModelFormComponent},
    { path: 'models/edit/:idModel', component: ModelFormComponent},

    { path: 'engines', component: EngineComponent},
    { path: 'engines/create', component: EngineFormComponent},
    { path: 'engines/edit/:idEngine', component: EngineFormComponent},

    //Routes for Vehicles

    {path: 'vehicles', component: VehicleComponent},
    {path: 'vehicles/create', component: VehicleFormComponent},
    {path: 'vehicles/edit/:idVehicle', component: VehicleFormComponent},

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

    {path: 'reports/sales', component: ReportComponent},

    //Routes for Dashboard

    {path: 'dashboard', component: DashboardComponent}

];
