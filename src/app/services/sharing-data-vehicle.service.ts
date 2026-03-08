import { EventEmitter, Injectable } from "@angular/core";
import { Vehicle } from "../models/Vehicle";



@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceVehicle {

  private _newVehicleEventEmitter: EventEmitter<Vehicle> = new EventEmitter();
  
  private _idVehicleEventEmitter = new EventEmitter();
  
  private _findVehicleByIdEventEmitter = new EventEmitter();

  private _selectVehicleEventEmitter = new EventEmitter();

  private _errorsVehicleFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsVehicleFormEventEmitter(){
    return this._errorsVehicleFormEventEmmitter;
  }

  get newVehicleEventEmitter(): EventEmitter<Vehicle>{
    return this._newVehicleEventEmitter;
  }
  
  get idVehicleEventEmitter(): EventEmitter<Number>{
    return this._idVehicleEventEmitter;
  }

  get findVehicleByIdEventEmitter(){
    return this._findVehicleByIdEventEmitter;
  }

  get selectVehicleEventEmitter(){
    return this._selectVehicleEventEmitter;
  }

}
