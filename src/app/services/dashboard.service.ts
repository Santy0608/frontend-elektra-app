import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sale } from "../models/Sale";
import { TopPart } from "../models/TopPart";
import { CriticalStock } from "../models/CriticalStock";
import { TopCustomer } from "../models/TopCustomer";
import { ObserversModule } from "@angular/cdk/observers";
import { MonthlySale } from "../models/MonthlySale";


@Injectable({
    providedIn: 'root'
})
export class DashboardService{

    private url: string = 'http://localhost:8080/api/dashboard'

    constructor(private http: HttpClient){

    }

    getTotalSales(): Observable<Sale[]>{
        return this.http.get<Sale[]>(`${this.url}/sales`);
    }

    getTopParts(): Observable<TopPart[]>{
        return this.http.get<TopPart[]>(`${this.url}/top-parts`);
    }

    getCriticalStock(): Observable<CriticalStock[]>{
        return this.http.get<CriticalStock[]>(`${this.url}/critical-stock`);
    }    

    getTopCustomers(): Observable<TopCustomer[]>{
        return this.http.get<TopCustomer[]>(`${this.url}/top-customers`)
    }

    getSalesByMonth(): Observable<MonthlySale[]>{
        return this.http.get<MonthlySale[]>(`${this.url}/sales-by-month`);
    }

    private monthTranslations: { [key: string]: string } = {
        'January': 'Enero', 'February': 'Febrero', 'March': 'Marzo',
        'April': 'Abril', 'May': 'Mayo', 'June': 'Junio',
        'July': 'Julio', 'August': 'Agosto', 'September': 'Septiembre',
        'October': 'Octubre', 'November': 'Noviembre', 'December': 'Diciembre'
    };

    translateMonth(month: string): string {
        return this.monthTranslations[month] || month;
    }

}