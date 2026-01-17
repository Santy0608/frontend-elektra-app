import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Customer } from "../models/Customer";



@Injectable({
    providedIn: 'root'
})
export class CustomerService{
    
    private url: string = "http://localhost:8080/api/customers";

    constructor(private http: HttpClient){

    }

    customerList(): Observable<Customer[]>{
        return this.http.get<Customer[]>(this.url);
    }

    findCustomerById(id: number): Observable<Customer>{
        return this.http.get<Customer>(`${this.url}/${id}`)
    }
    
    saveCustomer(customer: Customer): Observable<Customer>{
        return this.http.post<Customer>(this.url, customer);
    }
    
    updateCustomer(customer: Customer): Observable<Customer>{
        return this.http.put<Customer>(`${this.url}/${customer.idCustomer}`, customer);
    }
    
    deleteCustomer(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`)
    }
    

}