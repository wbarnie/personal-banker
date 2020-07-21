import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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

import {AppRoutingModule} from './app-routing.module';
import {DropdownDirective} from './shared/dropdown.directive';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {AlertComponent} from './shared/alert/alert.component';
import {PlaceholderDirective} from './shared/placeholder/placeholder.directive';

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
    TransactionDetailComponent,
    DropdownDirective,
    AuthComponent,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule {
}
