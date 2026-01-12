import { EventEmitter, Injectable } from "@angular/core";
import { Supplier } from "../models/Supplier";



@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceSupplier {

  private _newSupplierEventEmitter: EventEmitter<Supplier> = new EventEmitter();
  
  private _idSupplierEventEmitter = new EventEmitter();
  
  private _findSupplierByIdEventEmitter = new EventEmitter();

  private _selectSupplierEventEmitter = new EventEmitter();

  private _errorsSupplierFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsSupplierFormEventEmitter(){
    return this._errorsSupplierFormEventEmmitter;
  }

  get newSupplierEventEmitter(): EventEmitter<Supplier>{
    return this._newSupplierEventEmitter;
  }
  
  get idSupplierEventEmitter(): EventEmitter<Number>{
    return this._idSupplierEventEmitter;
  }

  get findSupplierByIdEventEmitter(){
    return this._findSupplierByIdEventEmitter;
  }

  get selectSupplierEventEmitter(){
    return this._selectSupplierEventEmitter;
  }

}
