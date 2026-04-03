import { Brand } from "./Brand";
import { Category } from "./Category";
import { Model } from "./Model";
import { Supplier } from "./Supplier";
import { Vehicle } from "./Vehicle";

export class Part {

    idPart!: number;
    name!: string;
    code!: string;
    price!: number;
    stock!: number;
    status!: string;
    minimumStock!: number;

   // category!: Category;
   // supplier!: Supplier;

    categoryId?: number;
    nameCategory?: string;
    supplierId?: number;
    nameSupplier?: string;

    vehicles?: Vehicle[];
    vehicleNames?: string[];

    vehicleIds?: number[];

}