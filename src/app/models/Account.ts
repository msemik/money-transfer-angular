import {QueryList, ViewChild, ViewChildren} from "@angular/core";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

export class Account {
  id: number;
  firstName: string;
  surname: string;
  private _balance: number;
  private _balanceInCents: number;
  tooltipEnabled: boolean = false;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  get balance(): number {
    return this._balance;
  }

  set balance(value: number) {
    this._balance = value;
    this._balanceInCents = value * 100;
  }

  get balanceInCents(): number {
    return this._balanceInCents;
  }

  set balanceInCents(value: number) {
    this._balanceInCents = value;
    this._balance = value / 100;
  }
}
