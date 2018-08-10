import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {TransferService} from "./transfer.service";
import {empty} from "rxjs";

describe('AccountService', () => {
  let mockHttpClient;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['post', 'put', 'get', 'delete'])
    mockHttpClient.post.and.returnValue(empty());
    mockHttpClient.put.and.returnValue(empty());
    mockHttpClient.get.and.returnValue(empty());
    mockHttpClient.delete.and.returnValue(empty());
    TestBed.configureTestingModule({
      providers: [AccountService,
        {
          provide: HttpClient,
          useValue: mockHttpClient
        }
      ],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
  }));
});
