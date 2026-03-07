import { EventEmitter, Injectable } from "@angular/core";
import { Model } from "../models/Model";



@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceModel {

  private _newModelEventEmitter: EventEmitter<Model> = new EventEmitter();
  
  private _idModelEventEmitter = new EventEmitter();
  
  private _findModelByIdEventEmitter = new EventEmitter();

  private _selectModelEventEmitter = new EventEmitter();

  private _errorsModelFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsModelFormEventEmitter(){
    return this._errorsModelFormEventEmmitter;
  }

  get newModelEventEmitter(): EventEmitter<Model>{
    return this._newModelEventEmitter;
  }
  
  get idModelEventEmitter(): EventEmitter<Number>{
    return this._idModelEventEmitter;
  }

  get findModelByIdEventEmitter(){
    return this._findModelByIdEventEmitter;
  }

  get selectModelEventEmitter(){
    return this._selectModelEventEmitter;
  }

}
