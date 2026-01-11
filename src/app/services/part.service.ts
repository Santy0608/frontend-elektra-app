import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Part } from "../models/Part";


@Injectable({
    providedIn: 'root'
})
export class RepuestoService{
    
    private url:string = "http://localhost:8080/api/parts";

    constructor(private http: HttpClient){

    }

    partsList(): Observable<Part[]>{
        return this.http.get<Part[]>(this.url);
    }

    findPartById(id: number): Observable<Part>{
        return this.http.get<Part>(`${this.url}/${id}`)
    }

    savePart(part: Part): Observable<Part>{
        return this.http.post<Part>(this.url, part);
    }

    updatePart(part: Part): Observable<Part>{
        return this.http.put<Part>(`${this.url}/${part.idPart}`, part);
    }

    deletePart(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`)
    }

    searchParts(name: string, brand: string, code: string): Observable<Part[]>{
        let params = new HttpParams();
        if (name){
            params = params.append('name', name);
        }
        if (brand){
            params = params.append('brand', brand);
        }
        if (code){
            params = params.append('code', code);
        }

        return this.http.get<Part[]>(`${this.url}/search`, { params: params });
    }

}