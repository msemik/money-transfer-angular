import {inject, TestBed} from '@angular/core/testing';

import {SubscriptionService} from './subscription.service';
import {empty} from 'rxjs';
import {StompService} from '@stomp/ng2-stompjs';

describe('SubscriptionService', () => {
  let mockStomp;
  beforeEach(() => {
    mockStomp = jasmine.createSpyObj('mockStomp', ['subscribe']);
    mockStomp.subscribe.and.returnValue(empty());

    TestBed.configureTestingModule({
      providers: [SubscriptionService,  {
        provide: StompService,
        useValue: mockStomp
      }],
      imports: []
    });
  });

  it('subscription is cached', inject([SubscriptionService], (service: SubscriptionService) => {

    expect(service).toBeTruthy();
  }));
});
