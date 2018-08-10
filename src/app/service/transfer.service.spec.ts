import { TestBed, inject } from '@angular/core/testing';

import { TransferService } from './transfer.service';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {empty} from "rxjs";
import {StompService} from "@stomp/ng2-stompjs";

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
});
