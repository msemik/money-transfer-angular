import {inject, TestBed} from '@angular/core/testing';

import {TransferService} from './transfer.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {of, empty} from "rxjs";
import {fail} from "assert";

describe('TransferService', () => {
  let mockHttpClient;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('mockHttpClient', ['post', 'put', 'get', 'delete'])
    mockHttpClient.post.and.returnValue(empty());
    mockHttpClient.put.and.returnValue(empty());
    mockHttpClient.get.and.returnValue(empty());
    mockHttpClient.delete.and.returnValue(empty());
    TestBed.configureTestingModule({
      providers: [
        TransferService,
        {
          provide: HttpClient,
          useValue: mockHttpClient
        }
      ],
      imports: [HttpClientModule]
    });
  });

  it('should be created', inject([TransferService], (service: TransferService) => {
    expect(service).toBeTruthy();
  }));

  it('should create transfer', inject([TransferService], (service: TransferService) => {
    var mockResponse = jasmine.createSpyObj("mockResponse", ['verifyCalled']);
    var mockTransfer = jasmine.createSpyObj("mockTransfer", ["sourceAccountId", "destinationAccountId", "cents"]);
    mockHttpClient.post.and.returnValue(of(mockResponse));

    service.create(mockTransfer)
      .subscribe(anything => {
          expect(anything).toBe(mockResponse);
          mockResponse.verifyCalled();
        },
        err => {
          fail("shouldn't generate errors");
        });

    expect(mockHttpClient.post.calls.count()).toBe(1)
    expect(mockHttpClient.post).toHaveBeenCalledWith("http://localhost:8080/transfer", mockTransfer);
    expect(mockResponse.verifyCalled.calls.count()).toBe(1)
  }));
});
