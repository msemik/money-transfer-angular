import { Component, OnInit } from '@angular/core';
import {Transfer} from '../../Transfer';
import {TransferService} from "../../service/transfer.service";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-create-transfer',
  templateUrl: './create-transfer.component.html',
  styleUrls: ['./create-transfer.component.css']
})
export class CreateTransferComponent implements OnInit {
  transfer: Transfer = {
    id: null,
    sourceAccountId: 1,
    destinationAccountId: 2,
    cents: 10
  };
  private transferService: TransferService;
  private snackbar: MatSnackBar;


  constructor(transferService: TransferService, snackbar: MatSnackBar) {
    this.transferService = transferService;
    this.snackbar = snackbar;
  }

  ngOnInit() {
  }

  onSubmit(transfer: Transfer): void {
    this.transferService.create(transfer)
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
