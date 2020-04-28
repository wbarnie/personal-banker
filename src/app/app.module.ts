import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {AccountsComponent} from './accounts/accounts.component';
import {TransactionsComponent} from './accounts/transactions/transactions.component';
import {AccountEditComponent} from './accounts/account-edit/account-edit.component';
import {AccountAddComponent} from './accounts/account-add/account-add.component';
import {TransactionAddComponent} from './accounts/transactions/transaction-add/transaction-add.component';
import {TransactionEditComponent} from './accounts/transactions/transaction-edit/transaction-edit.component';
import {AccountsService} from './accounts.service';
import {TransactionDetailComponent} from './accounts/transactions/transaction-detail/transaction-detail.component';
import {FormsModule} from '@angular/forms';
import {TransactionsService} from './accounts/transactions.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AccountsComponent,
    TransactionsComponent,
    AccountEditComponent,
    AccountAddComponent,
    TransactionAddComponent,
    TransactionEditComponent,
    TransactionDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [AccountsService, TransactionsService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
