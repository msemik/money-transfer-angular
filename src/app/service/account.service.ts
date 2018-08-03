import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Account} from "../models/Account";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http: HttpClient;
  private readonly url: string = "http://localhost:8080/account";

  constructor(http: HttpClient) {
    this.http = http;
  }

  findAll(): Observable<Array<Account>> {
    return this.http.get<Array<Account>>(this.url);
  }
}
