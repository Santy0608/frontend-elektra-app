import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/Category";


@Injectable({
    providedIn: 'root'
})
export class CategoryService{
    private url:string = 'http://localhost:8080/api/categories';

    constructor(private http: HttpClient){

    }

    categoryList(): Observable<Category[]>{
        return this.http.get<Category[]>(this.url);
    }

    findCategoryById(id: number): Observable<Category>{
        return this.http.get<Category>(`${this.url}/${id}`);
    }

    saveCategory(category: Category): Observable<Category>{
        return this.http.post<Category>(this.url, category)
    }

    updateCategory(category: Category): Observable<Category>{
        return this.http.put<Category>(`${this.url}/${category.idCategory}`, category);
    }

    deleteCategoryById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    searchCategory(name: string): Observable<Category[]>{
        let params = new HttpParams();
        if (name){
            params = params.append('name', name);
        }
        return this.http.get<Category[]>(`${this.url}/search`, { params: params });
    }

}