import { Part } from "./Part";
import { Sale } from "./Sale";

export interface SaleDetail{
    idSaleDetail: number;
    quantity: number;
    unitPrice: number;
    subtotal: number;
    sale?: Sale;
    part: Part;
}