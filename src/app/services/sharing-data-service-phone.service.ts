import { EventEmitter, Injectable } from "@angular/core";
import { Phone } from "../models/Phone";


@Injectable({
  providedIn: 'root'
})
export class SharingDataServicePhone {

  private _newPhoneEventEmitter: EventEmitter<Phone> = new EventEmitter();
  
  private _idPhoneEventEmitter = new EventEmitter();
  
  private _findPhoneByIdEventEmitter = new EventEmitter();

  private _selectPhoneEventEmitter = new EventEmitter();

  private _errorsPhoneFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsPhoneFormEventEmitter(){
    return this._errorsPhoneFormEventEmmitter;
  }

  get newPhoneEventEmitter(): EventEmitter<Phone>{
    return this._newPhoneEventEmitter;
  }
  
  get idPhoneEventEmitter(): EventEmitter<Number>{
    return this._idPhoneEventEmitter;
  }

  get findPhoneByIdEventEmitter(){
    return this._findPhoneByIdEventEmitter;
  }

  get selectPhoneEventEmitter(){
    return this._selectPhoneEventEmitter;
  }

}
