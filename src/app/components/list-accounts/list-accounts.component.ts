import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/Account";
import {AccountService} from "../../service/account.service";

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
  private _accounts: Account[] = [];
  private accountService: AccountService;
  totalBalance: number;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
  }

  ngOnInit() {
    this.accountService.findAll()
      .subscribe(accounts => this.accounts = accounts,
        err => console.error(err))
  }

  get accounts(): Account[] {
    return this._accounts;
  }

  set accounts(value: Account[]) {
    this._accounts = value;
    this.computeTotalBalance();
  }

  private computeTotalBalance() {
    this.totalBalance = this.accounts
      .map(a => a.balanceInCents)
      .reduce((e1, e2) => e1 + e2, 0) / 100;
  }
}
