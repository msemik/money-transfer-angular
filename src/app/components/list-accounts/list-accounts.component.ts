import {Component, OnInit} from '@angular/core';
import {Account} from "../../models/Account";
import {AccountService} from "../../service/account.service";
import {StompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {map} from "rxjs/operators";

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
          return message.body;
        }
      ))
      .subscribe((msg_body: string) => {
        console.log(`Received: ${msg_body}`);
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
}
