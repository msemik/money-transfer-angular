export class Transfer {
  id: number|string;
  sourceAccountId: number|string;
  destinationAccountId: number|string;
  private _cents: number;
  private _dollars: number;

  constructor(obj?: any) {
    Object.assign(this, obj);
  }

  get cents(): number {
    return this._cents;
  }

  set cents(value: number) {
    this._cents = value;
    this._dollars = value / 100;
  }

  get dollars(): number {
    return this._dollars;
  }

  set dollars(value: number) {
    this._dollars = value;
    this._cents = value * 100;
  }
}
