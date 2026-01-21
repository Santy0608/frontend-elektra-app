import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Supplier } from "../models/Supplier";



@Injectable({
    providedIn: 'root'
})
export class SupplierService{
    private url:string = 'http://localhost:8080/api/suppliers';

    constructor(private http: HttpClient){

    }

    supplierList(): Observable<Supplier[]>{
        return this.http.get<Supplier[]>(this.url);
    }

    findSupplierById(id: number): Observable<Supplier>{
        return this.http.get<Supplier>(`${this.url}/${id}`);
    }

    saveSupplier(supplier: Supplier): Observable<Supplier>{
        return this.http.post<Supplier>(this.url, supplier)
    }

    updateSupplier(supplier: Supplier): Observable<Supplier>{
        return this.http.put<Supplier>(`${this.url}/${supplier.idSupplier}`, supplier);
    }

    deleteSupplierById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    searchSuppliers(name: string, email: string, address: string): Observable<Supplier[]>{
        let params = new HttpParams();
        if (name){
            params = params.append('nombre', name);
        }
        if (email){
            params = params.append('correo', email);
        }
        if (address){
            params = params.append('direccion', address);
        }

        return this.http.get<Supplier[]>(`${this.url}/search`, { params: params });
    }


}