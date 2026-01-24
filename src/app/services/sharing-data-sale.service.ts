import { EventEmitter, Injectable } from "@angular/core";
import { Sale } from "../models/Sale";

@Injectable({
  providedIn: 'root'
})
export class SharingDataService {

  private _newSaleEventEmitter: EventEmitter<Sale> = new EventEmitter();
  
  private _idSaleEventEmitter = new EventEmitter();
  
  private _findSaleEventEmitter = new EventEmitter();

  private _selectSaleEventEmitter = new EventEmitter();

  private _errorsSaleFormEventEmitter = new EventEmitter();

  constructor() {

  }

  get errorsSaleFormEventEmitter(){
    return this._errorsSaleFormEventEmitter;
  }

  get newSaleEventEmitter(): EventEmitter<Sale>{
    return this._newSaleEventEmitter;
  }
  
  get idSaleEventEmitter(): EventEmitter<Number>{
    return this._idSaleEventEmitter;
  }

  get findSaleEventEmitter(){
    return this._findSaleEventEmitter;
  }

  get selectSaleEventEmitter(){
    return this._selectSaleEventEmitter;
  }

}