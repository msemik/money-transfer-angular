import {Injectable} from '@angular/core';
import {StompService} from "@stomp/ng2-stompjs";
import {Observable} from "rxjs";
import * as Stomp from '@stomp/stompjs';
import {map} from "rxjs/operators";
import {Transfer} from "../models/Transfer";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private cache: Map<string, Observable<Transfer>> = new Map();

  constructor(private readonly stompService: StompService) {
  }

  subscribe(topic: string): Observable<Transfer> {
    if (!this.cache.has(topic)) {
      this.cache[topic] = this.stompService.subscribe(topic)
        .pipe(
          map((message: Stomp.Message) => {
            return new Transfer(JSON.parse(message.body));
          })
        );
    }
    return this.cache[topic];
  }
}
