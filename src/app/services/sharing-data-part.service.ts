import { EventEmitter, Injectable } from "@angular/core";
import { Part } from "../models/Part";




@Injectable({
  providedIn: 'root'
})
export class SharingDataServicePart {

  private _newPartEventEmitter: EventEmitter<Part> = new EventEmitter();
  
  private _idPartEventEmitter = new EventEmitter();
  
  private _findPartEventEmitter = new EventEmitter();

  private _selectPartEventEmitter = new EventEmitter();

  private _errorsPartFormEventEmitter = new EventEmitter();

  constructor() {

  }

  get errorsPartFormEventEmitter(){
    return this._errorsPartFormEventEmitter;
  }

  get newPartEventEmitter(): EventEmitter<Part>{
    return this._newPartEventEmitter;
  }
  
  get idPartEventEmitter(): EventEmitter<Number>{
    return this._idPartEventEmitter;
  }

  get findPartEventEmitter(){
    return this._findPartEventEmitter;
  }

  get selectPartEventEmitter(){
    return this._selectPartEventEmitter;
  }

}
