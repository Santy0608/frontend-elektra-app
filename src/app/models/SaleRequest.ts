import { DetailRequest } from "./DetailRequest";

export interface SaleRequest{

    customerId: number;
    requests: DetailRequest[];

}