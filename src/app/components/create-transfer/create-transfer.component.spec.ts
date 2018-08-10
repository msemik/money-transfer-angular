import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateTransferComponent} from './create-transfer.component';
import {FormsModule} from "@angular/forms";
import {MatSnackBarModule} from "@angular/material";
import {By} from '@angular/platform-browser';
import {TransferService} from "../../service/transfer.service";
import {AccountService} from "../../service/account.service";
import {empty} from "rxjs";

describe('CreateTransferComponent', () => {
  let component: CreateTransferComponent;
  let fixture: ComponentFixture<CreateTransferComponent>;
  let mockTransferService;
  let mockAccountService;

  beforeEach(async(() => {
    mockAccountService = jasmine.createSpyObj('mockAccountService', ['findAll'])
    mockAccountService.findAll.and.returnValue(empty());
    mockTransferService = jasmine.createSpyObj('mockTransferService', ['create']);
    mockTransferService.create.and.returnValue(empty());
    TestBed.configureTestingModule({
      declarations: [CreateTransferComponent],
      imports: [FormsModule, MatSnackBarModule],
      providers :[
        {
          provide: TransferService,
          useValue: mockTransferService
        },
        {
          provide: AccountService,
          useValue: mockAccountService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.debugElement.query(By.css("h4")).nativeElement.textContent).toContain('Transfer');
    //TODO: finish test
    // expect(fixture.debugElement.query(By.css(".source-account-select")).nativeElement.textContent).toContain(2);
    expect(component).toBeTruthy();
  });
});
