import { Customer } from "./Customer";
import { SaleDetail } from "./Sale-Detail";

export interface Sale{
    idSale: number;
    date: string;
    total: number;
    customer: Customer;
    details: SaleDetail[];
}