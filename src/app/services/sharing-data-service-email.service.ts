import { EventEmitter, Injectable } from "@angular/core";
import { Email } from "../models/Email";


@Injectable({
  providedIn: 'root'
})
export class SharingDataServiceEmail {

  private _newEmailEventEmitter: EventEmitter<Email> = new EventEmitter();
  
  private _idEmailEventEmitter = new EventEmitter();
  
  private _findEmailByIdEventEmitter = new EventEmitter();

  private _selectEmailEventEmitter = new EventEmitter();

  private _errorsEmailFormEventEmmitter = new EventEmitter();

  constructor() {

  }

  get errorsEmailFormEventEmitter(){
    return this._errorsEmailFormEventEmmitter;
  }

  get newEmailEventEmitter(): EventEmitter<Email>{
    return this._newEmailEventEmitter;
  }
  
  get idEmailEventEmitter(): EventEmitter<Number>{
    return this._idEmailEventEmitter;
  }

  get findEmailByIdEventEmitter(){
    return this._findEmailByIdEventEmitter;
  }

  get selectEmailEventEmitter(){
    return this._selectEmailEventEmitter;
  }

}
