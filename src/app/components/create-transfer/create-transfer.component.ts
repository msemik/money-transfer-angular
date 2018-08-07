import {Component, OnInit} from '@angular/core';
import {Transfer} from '../../models/Transfer';
import {TransferService} from "../../service/transfer.service";
import {MatSnackBar} from "@angular/material";
import {AccountService} from "../../service/account.service";
import {Account} from "../../models/Account";
import {TransferTO} from "../../transferobject/TransferTO";

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {
  readonly transfer: Transfer;
  accounts: Account[] = [];
  private readonly snackbar: MatSnackBar;

  constructor(
    private readonly transferService: TransferService,
    private readonly accountService: AccountService,
    snackbar: MatSnackBar
  ) {
    this.snackbar = snackbar;
    this.transfer = new Transfer();
    this.transfer.sourceAccountId = 2;
    this.transfer.destinationAccountId = 1;
    this.transfer.cents = 100;
  }

  ngOnInit() {
    this.initAccounts();
  }

  onSubmit(): void {
    this.transferService.create(new TransferTO(this.transfer))
      .subscribe(res => {
        this.snackbar.open('Transfer completed.', null, {
          duration: 3000
        });
      }, err => {
        this.snackbar.open('Error during exchanging transfer', null, {
          duration: 3000
        });
      });
  }

  private initAccounts() {
    this.accountService.findAll()
      .subscribe(
        (acc: Account[]) => this.accounts = acc,
        err => console.error(err)
      );
  }

}
