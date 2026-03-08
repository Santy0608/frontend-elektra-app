import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Engine } from "../models/Engine";


@Injectable({
    providedIn: 'root'
})
export class EngineService{

    private url: string = 'http://localhost:8080/api/engines';

    constructor(private http: HttpClient){

    }

    engineList(): Observable<Engine[]>{
        return this.http.get<Engine[]>(this.url);
    }



    saveEngine(engine: Engine): Observable<Engine>{
        return this.http.post<Engine>(this.url, engine);
    }

    findEngineById(id: number): Observable<Engine>{
        return this.http.get<Engine>(`${this.url}/${id}`);
    }
        
    updateEngine(engine: Engine): Observable<Engine>{
        return this.http.put<Engine>(`${this.url}/${engine.idEngine}`, engine);
    }
        
    deleteEngineById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }


}
