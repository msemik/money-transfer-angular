///<reference path="../../../../node_modules/@angular/core/src/metadata/lifecycle_hooks.d.ts"/>
import {Component, DoCheck, ElementRef, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren} from '@angular/core';
import {Account} from "../../models/Account";
import {AccountService} from "../../service/account.service";
import {StompService} from "@stomp/ng2-stompjs";
import {Message} from "@stomp/stompjs";
import {map} from "rxjs/operators";
import {Transfer} from "../../models/Transfer";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";
import {SubscriptionService} from "../../service/subscription.service";

@Component({
  selector: 'app-list-accounts',
  templateUrl: './list-accounts.component.html',
  styleUrls: ['./list-accounts.component.css']
})
export class ListAccountsComponent implements OnInit, DoCheck {
  totalBalance: number = 0;
  @ViewChildren('tooltip') toolTips: QueryList<NgbTooltip>;

  constructor(
    private readonly accountService: AccountService,
    private readonly subscriptionService: SubscriptionService) {
  }

  private _accounts: Account[] = [];

  get accounts(): Account[] {
    return this._accounts;
  }

  set accounts(value: Account[]) {
    this._accounts = value;
    this.computeTotalBalance();
  }

  ngOnInit() {
    this.initAccounts();
    this.initTransferSubscription();
  }

  ngDoCheck(): void {
    this.openTooltips();
  }

  private initTransferSubscription() {
    var subscription = this.subscriptionService.subscribe("/topic/transfer/*/*");
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

  private initAccounts() {
    this.accountService.findAll()
      .subscribe(accounts => this.accounts = accounts,
        err => console.error(err))
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
        acc.tooltipEnabled = true;
      });
  }

  public closeTooltip(t: NgbTooltip) {
    var index = this.toolTips.toArray().findIndex(tooltip => t === tooltip);
    this.accounts[index].tooltipEnabled = false;
    t.close();
  }

  private openTooltips() {
    this.accounts.forEach(
      (acc, index) => {
        if (!acc.tooltipEnabled) {
          return;
        }
        var ngbTooltip = this.toolTips.toArray()[index];
        if (!ngbTooltip.isOpen()) {
          ngbTooltip.open();
        }
      }
    )
  }
}
