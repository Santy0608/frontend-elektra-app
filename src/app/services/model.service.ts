import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Model } from "../models/Model";

@Injectable({
    providedIn: 'root'
})
export class ModelService{

    private url: string = 'http://localhost:8080/api/models';

    constructor(private http: HttpClient){

    }

    modelList(): Observable<Model[]>{
        return this.http.get<Model[]>(this.url);
    }

    getModelsByBrand(idBrand: number): Observable<Model[]> {
        return this.http.get<Model[]>(`${this.url}/by-brand/${idBrand}`);
    }

    saveModel(model: Model): Observable<Model>{
        return this.http.post<Model>(this.url, model);
    }
    
    findModelById(id: number): Observable<Model>{
        return this.http.get<Model>(`${this.url}/${id}`);
    }
    
    updateModel(model: Model): Observable<Model>{
        return this.http.put<Model>(`${this.url}/${model.idModel}`, model);
    }
    
    deleteModelById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }


    searchModels(name: string): Observable<Model[]>{
        let params = new HttpParams();
        if (name){
            params = params.append('name', name);
        }
        return this.http.get<Model[]>(`${this.url}/search`, {params: params});
    } 
    
    

}