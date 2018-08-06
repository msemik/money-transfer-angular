import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/Account";
import {AccountService} from "../../service/account.service";
import {StompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {map} from "rxjs/operators";
import {Transfer} from "../../models/Transfer";

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit {
  private _accounts: Account[] = [];
  totalBalance: number = 0;
  private readonly accountService: AccountService;
  private readonly stompService: StompService;

  constructor(accountService: AccountService, stompService: StompService) {
    this.accountService = accountService;
    this.stompService = stompService;
  }

  ngOnInit() {
    this.accountService.findAll()
      .subscribe(accounts => this.accounts = accounts,
        err => console.error(err))
    var subscription = this.stompService.subscribe("/topic/transfer/*/*");
    subscription.pipe(
      map((message: Message) => {
          return new Transfer(JSON.parse(message.body));
        }
      ))
      .subscribe((transfer: Transfer) => {
        this.refreshAccount(transfer.sourceAccountId);
        this.refreshAccount(transfer.destinationAccountId);
      });
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

  private refreshAccount(accountId: number) {
    var index = this.accounts.findIndex((account: Account) => account.id == accountId);
    if (index == -1) {
      return;
    }
    this.accountService.findOne(accountId)
      .subscribe((acc: Account) => {
        this.accounts[index] = acc;
      });
  }
}
