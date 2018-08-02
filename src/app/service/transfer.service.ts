import {Injectable} from '@angular/core';
import {Transfer} from "../Transfer";
import {Observable, of} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  private http: HttpClient;
  private transferUrl: string = "http://localhost:8080/money-transfer"

  constructor(http: HttpClient) {
    this.http = http;
  }

  create(transfer: Transfer): Observable<any> {
    return this.http.post(this.transferUrl, transfer)
      .pipe(
        tap<Transfer>(_ => console.log(`transfer exchanged`))
      );
  }

}
