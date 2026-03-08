import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Vehicle } from "../models/Vehicle";
import { Engine } from "../models/Engine";


@Injectable({
    providedIn: 'root'
})
export class VehicleService{

    private url:string = 'http://localhost:8080/api/vehicles';

    constructor(private http: HttpClient){

    }

    vehicleList(): Observable<Vehicle[]>{
        return this.http.get<Vehicle[]>(this.url);
    }

    saveVehicle(vehicle: Vehicle): Observable<Vehicle>{
        return this.http.post<Vehicle>(this.url, vehicle);
    }

    findVehicleById(id: number): Observable<Vehicle>{
        return this.http.get<Vehicle>(`${this.url}/${id}`);
    }
    
    updateVehicle(vehicle: Vehicle): Observable<Vehicle>{
        return this.http.put<Vehicle>(`${this.url}/${vehicle.idVehicle}`, vehicle);
    }
    
    deleteVehicleById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    getYearsByModel(modelId: number): Observable<number[]> {
        return this.http.get<number[]>(`${this.url}/models/${modelId}/years`);
    }

    getEnginesByModelAndYear(modelId: number, year: number): Observable<Engine[]> {
        return this.http.get<Engine[]>(`${this.url}/models/${modelId}/years/${year}/engines`);
    }
    
    getVehicleByFilters(modelId: number, year: number, engineId: number): Observable<Vehicle> {
        return this.http.get<Vehicle>(`${this.url}/filter/${modelId}/year/${year}/engine/${engineId}`);
    }

}