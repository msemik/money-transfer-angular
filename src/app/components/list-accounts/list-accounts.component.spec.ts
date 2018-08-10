import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ListAccountsComponent} from './list-accounts.component';
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {AccountService} from "../../service/account.service";
import {SubscriptionService} from "../../service/subscription.service";
import {empty} from 'rxjs';

describe('ListAccountsComponent', () => {
  let component: ListAccountsComponent;
  let fixture: ComponentFixture<ListAccountsComponent>;
  let mockAccountService;
  let mockSubscriptionService;

  beforeEach(async(() => {
    mockAccountService = jasmine.createSpyObj('mockAccountService', ['findAll']);
    mockAccountService.findAll.and.returnValue(empty());
    mockSubscriptionService = jasmine.createSpyObj('mockSubscriptionService', ['subscribe']);
    mockSubscriptionService.subscribe.and.returnValue(empty());
    TestBed.configureTestingModule({
      declarations: [ListAccountsComponent],
      imports: [NgbTooltipModule],
      providers: [
        {
          provide: AccountService,
          useValue: mockAccountService
        },
        {
          provide: SubscriptionService,
          useValue: mockSubscriptionService
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
