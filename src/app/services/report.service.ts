import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class ReportService {

    private url: string = 'http://localhost:8080/api/reports';

    constructor(private http: HttpClient){

    }

    generarReporteVentas(startDate?:string, endDate?:string): Observable<Blob>{
        let params = new HttpParams();
        if (startDate){
            params = params.set('fechaInicio', startDate);
        }
        if (endDate){
            params = params.set('fechaFin', endDate);
        }
        return this.http.get(`${this.url}/sales`, { params, responseType: 'blob' })
    }

}