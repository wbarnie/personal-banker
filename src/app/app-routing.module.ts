import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {AccountEditComponent} from './accounts/account-edit/account-edit.component';
import {AccountAddComponent} from './accounts/account-add/account-add.component';
import {TransactionEditComponent} from './accounts/transactions/transaction-edit/transaction-edit.component';
import {TransactionAddComponent} from './accounts/transactions/transaction-add/transaction-add.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard} from './auth/auth.guard';
import {HeaderComponent} from './header/header.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'personalBanker', pathMatch: 'full'},
  {path: 'personalBanker/auth', component: AuthComponent},
  {
    path: 'personalBanker/accounts', component: AccountsComponent, canActivate: [AuthGuard], children: [
      {path: 'add', component: AccountAddComponent},
      {path: 'edit/:id', component: AccountEditComponent},
      {path: 'transaction/add/:id', component: TransactionAddComponent},
      {path: 'transaction/edit/:id', component: TransactionEditComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
