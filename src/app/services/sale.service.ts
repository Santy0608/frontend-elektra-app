import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sale } from "../models/Sale";
import { SaleRequest } from "../models/SaleRequest";


@Injectable({
    providedIn: 'root'
})
export class SaleService{

    private url: string = 'http://localhost:8080/api/sales'

    constructor(private http: HttpClient){

    }

    saleList(): Observable<Sale[]>{
        return this.http.get<Sale[]>(this.url);
    }

    findSaleById(id: number): Observable<Sale>{
        return this.http.get<Sale>(`${this.url}/${id}`);
    }

    saveSale(saleRequest: SaleRequest): Observable<Sale>{
        return this.http.post<Sale>(this.url, saleRequest);
    }

    deleteSale(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    generatePDFInvoice(id: number){
        return this.http.get(`${this.url}/invoice/${id}`, { responseType: 'blob'})
    }

}