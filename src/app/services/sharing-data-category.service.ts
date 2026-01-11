import { EventEmitter, Injectable } from "@angular/core";
import { Category } from "../models/Category";

@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceCategory {

  private _newCategoryEventEmitter: EventEmitter<Category> = new EventEmitter();
  
  private _idCategoryEventEmitter = new EventEmitter();
  
  private _findCategoryByIdEventEmitter = new EventEmitter();

  private _selectCategoryEventEmitter = new EventEmitter();

  private _errorsCategoryFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsCategoryFormEventEmitter(){
    return this._errorsCategoryFormEventEmmitter;
  }

  get newCategoryEventEmitter(): EventEmitter<Category>{
    return this._newCategoryEventEmitter;
  }
  
  get idCategoryEventEmitter(): EventEmitter<Number>{
    return this._idCategoryEventEmitter;
  }

  get findCategoryByIdEventEmitter(){
    return this._findCategoryByIdEventEmitter;
  }

  get selectCategoryEventEmitter(){
    return this._selectCategoryEventEmitter;
  }

}
