import { Category } from "./Category";

export class Part{
    idPart!: number;
    name!:string;
    code!:string;
    brand!:string;
    compatibleModel!:string;
    price!:number;
    stock!:number;
    status!:string;
    minimumStock!:number;
    category!:Category;
    

    categoryId?: number;
    supplierId?: number;

    
}