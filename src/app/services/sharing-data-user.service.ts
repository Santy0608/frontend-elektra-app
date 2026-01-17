import { EventEmitter, Injectable } from "@angular/core";
import { User } from "../models/User";



@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceUser {

  private _newUserEventEmitter: EventEmitter<User> = new EventEmitter();
  
  private _idUserEventEmitter = new EventEmitter();
  
  private _findUserEventEmitter = new EventEmitter();

  private _selectUserEventEmitter = new EventEmitter();

  private _errorsUserFormEventEmitter = new EventEmitter();

  constructor() {

  }

  get errorsUserFormEventEmitter(){
    return this._errorsUserFormEventEmitter;
  }

  get newUserEventEmitter(): EventEmitter<User>{
    return this._newUserEventEmitter;
  }
  
  get idUserEventEmitter(): EventEmitter<Number>{
    return this._idUserEventEmitter;
  }

  get findUserEventEmitter(){
    return this._findUserEventEmitter;
  }

  get selectUserEventEmitter(){
    return this._selectUserEventEmitter;
  }

}
