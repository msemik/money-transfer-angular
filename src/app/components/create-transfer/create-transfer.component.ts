import { Component, OnInit } from '@angular/core';
import {Transfer} from '../../Transfer';

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

  constructor() { }

  ngOnInit() {
  }
  onSubmit(transfer: Transfer): void {
    console.log('Works!');
  }
}
