import { Brand } from "./Brand";
import { Category } from "./Category";
import { Model } from "./Model";
import { Supplier } from "./Supplier";

export class Part{

    idPart!: number;
    name!:string;
    code!:string;
    price!:number;
    stock!:number;
    status!:string;
    minimumStock!:number;
    compatibleModels!: Model[];
    category!:Category;
    supplier!:Supplier;
    categoryId?: number;
    supplierId?: number;
    modelIds?: number[];
    brandId?: number;
    
}