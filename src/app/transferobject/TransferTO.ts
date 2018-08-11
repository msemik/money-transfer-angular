import {Transfer} from "../models/Transfer";

export class TransferTO {
  sourceAccountId: number|string;
  destinationAccountId: number|string;
  cents: number;

  constructor(transfer: Transfer) {
    this.sourceAccountId = transfer.sourceAccountId;
    this.destinationAccountId = transfer.destinationAccountId;
    this.cents = transfer.cents;
  }
}
