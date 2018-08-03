import { Component, OnInit } from '@angular/core';
import {Transfer} from '../../models/Transfer';
import {TransferService} from "../../service/transfer.service";
import {MatSnackBar} from "@angular/material";
import {AccountService} from "../../service/account.service";
import {Account} from "../../models/Account";

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {
  transfer: Transfer = {
    id: null,
    sourceAccountId: 2,
    destinationAccountId: 1,
    cents: 10
  };
  accounts: Array<Account> = [];
  private transferService: TransferService;
  private accountService: AccountService;
  private snackbar: MatSnackBar;

  constructor(transferService: TransferService, accountService: AccountService, snackbar: MatSnackBar) {
    this.transferService = transferService;
    this.accountService = accountService;
    this.snackbar = snackbar;
  }

  ngOnInit() {
    this.accountService.findAll()
      .subscribe(
        (acc: Array<Account>) => this.accounts = acc,
        err => console.error(err)
      );
  }

  onSubmit(): void {
    this.transferService.create(this.transfer)
      .subscribe( res => {
        this.snackbar.open('Transfer completed.', null, {
          duration: 3000
        });
      }, err => {
        this.snackbar.open('Error during exchanging transfer', null, {
          duration: 3000
        });
      });
  }

}
