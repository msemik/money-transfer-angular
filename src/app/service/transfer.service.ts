import {Injectable} from '@angular/core';
import {Transfer} from "../models/Transfer";
import {Observable, of} from "rxjs";
import {catchError, map, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {Account} from "../models/Account";
import {TransferTO} from "../transferobject/TransferTO";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private transferUrl: string = "http://localhost:8080/money-transfer"

  constructor(
    private readonly http: HttpClient
  ) {
  }

  create(transfer: TransferTO): Observable<any> {
    return this.http.post(this.transferUrl, transfer)
      .pipe(
        map(res => new Transfer(res)),
        tap<Transfer>(_ => console.log(`transfer exchanged`))
      );
  }
}
