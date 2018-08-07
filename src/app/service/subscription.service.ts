import {Injectable} from '@angular/core';
import {StompService} from "@stomp/ng2-stompjs";
import {Observable} from "rxjs";
import * as Stomp from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private cache: Map<string, Observable<Stomp.Message>> = new Map();

  constructor(private readonly stompService: StompService) {
  }

  subscribe(topic: string): Observable<Stomp.Message> {
    if (!this.cache.has(topic)) {
      this.cache[topic] = this.stompService.subscribe(topic);
    }
    return this.cache[topic];
  }
}
