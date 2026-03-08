import { EventEmitter, Injectable } from "@angular/core";
import { Engine } from "../models/Engine";


@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceEngine {

  private _newEngineEventEmitter: EventEmitter<Engine> = new EventEmitter();
  
  private _idEngineEventEmitter = new EventEmitter();
  
  private _findEngineByIdEventEmitter = new EventEmitter();

  private _selectEngineEventEmitter = new EventEmitter();

  private _errorsEngineFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsEngineFormEventEmitter(){
    return this._errorsEngineFormEventEmmitter;
  }

  get newEngineEventEmitter(): EventEmitter<Engine>{
    return this._newEngineEventEmitter;
  }
  
  get idEngineEventEmitter(): EventEmitter<Number>{
    return this._idEngineEventEmitter;
  }

  get findEngineByIdEventEmitter(){
    return this._findEngineByIdEventEmitter;
  }

  get selectEngineEventEmitter(){
    return this._selectEngineEventEmitter;
  }

}
