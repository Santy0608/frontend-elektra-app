import { EventEmitter, Injectable } from "@angular/core";
import { Brand } from "../models/Brand";

@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceBrand {

  private _newBrandEventEmitter: EventEmitter<Brand> = new EventEmitter();
  
  private _idBrandEventEmitter = new EventEmitter();
  
  private _findBrandByIdEventEmitter = new EventEmitter();

  private _selectBrandEventEmitter = new EventEmitter();

  private _errorsBrandFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsBrandFormEventEmitter(){
    return this._errorsBrandFormEventEmmitter;
  }

  get newBrandEventEmitter(): EventEmitter<Brand>{
    return this._newBrandEventEmitter;
  }
  
  get idBrandEventEmitter(): EventEmitter<Number>{
    return this._idBrandEventEmitter;
  }

  get findBrandByIdEventEmitter(){
    return this._findBrandByIdEventEmitter;
  }

  get selectBrandEventEmitter(){
    return this._selectBrandEventEmitter;
  }

}
