import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {CreateTransferComponent} from './components/create-transfer/create-transfer.component';
import {HttpClientModule} from "@angular/common/http";
import {MatSnackBarModule} from "@angular/material";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ListAccountsComponent } from './components/list-accounts/list-accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateTransferComponent,
    ListAccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
