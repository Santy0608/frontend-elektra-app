import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Brand } from "../models/Brand";


@Injectable({
    providedIn: 'root'
})
export class BrandService{

    private url: string = 'http://localhost:8080/api/brands';

    constructor(private http: HttpClient){

    }

    brandList(): Observable<Brand[]>{
        return this.http.get<Brand[]>(this.url);
    }

    saveBrand(brand: Brand): Observable<Brand>{
        return this.http.post<Brand>(this.url, brand);
    }

    findBrandById(id: number): Observable<Brand>{
        return this.http.get<Brand>(`${this.url}/${id}`);
    }

    updateBrand(brand: Brand): Observable<Brand>{
        return this.http.put<Brand>(`${this.url}/${brand.idBrand}`, brand);
    }

    deleteBrandById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    searchBrands(name: string): Observable<Brand[]>{
        let params = new HttpParams();
        if (name){
            params = params.append('name', name);
        }
        return this.http.get<Brand[]>(`${this.url}/search`, {params: params});
    }

    

}