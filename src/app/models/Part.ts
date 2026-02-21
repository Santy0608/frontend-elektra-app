import { Brand } from "./Brand";
import { Category } from "./Category";
import { Supplier } from "./Supplier";

export class Part{

    idPart!: number;
    name!:string;
    code!:string;
    compatibleModel!:string;
    price!:number;
    stock!:number;
    status!:string;
    minimumStock!:number;
    brand!: Brand;
    category!:Category;
    supplier!:Supplier;
    categoryId?: number;
    supplierId?: number;
    brandId?: number;
    
}