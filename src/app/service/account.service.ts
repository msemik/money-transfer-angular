import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../models/Account";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly url: string = "http://localhost:8080/account";

  constructor(
    private readonly http: HttpClient
  ) {
  }

  findAll(): Observable<Account[]> {
    return this.http.get<Account[]>(this.url)
      .pipe(map(res => res.map(element => new Account(element))));
  }

  findOne(accountId: number): Observable<Account> {
    return this.http.get<Account>(this.url + '/' + accountId)
      .pipe(map(element => new Account(element)));
  }
}
