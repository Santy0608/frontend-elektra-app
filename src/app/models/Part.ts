import { Category } from "./Category";
import { Supplier } from "./Supplier";

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
    supplier!:Supplier;
    categoryId?: number;
    supplierId?: number;
    
}