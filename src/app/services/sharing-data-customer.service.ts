import { EventEmitter, Injectable } from "@angular/core";
import { Customer } from "../models/Customer";




@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceCustomer {

  private _newCustomerEventEmitter: EventEmitter<Customer> = new EventEmitter();
  
  private _idCustomerEventEmitter = new EventEmitter();
  
  private _findCustomerEventEmitter = new EventEmitter();

  private _selectCustomerEventEmitter = new EventEmitter();

  private _errorsCustomerFormEventEmitter = new EventEmitter();

  constructor() {

  }

  get errorsCustomerFormEventEmitter(){
    return this._errorsCustomerFormEventEmitter;
  }

  get newCustomerEventEmitter(): EventEmitter<Customer>{
    return this._newCustomerEventEmitter;
  }
  
  get idCustomerEventEmitter(): EventEmitter<Number>{
    return this._idCustomerEventEmitter;
  }

  get findCustomerEventEmitter(){
    return this._findCustomerEventEmitter;
  }

  get selectCustomerEventEmitter(){
    return this._selectCustomerEventEmitter;
  }

}
