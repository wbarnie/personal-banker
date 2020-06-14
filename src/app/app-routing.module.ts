import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {AccountEditComponent} from './accounts/account-edit/account-edit.component';
import {AccountAddComponent} from './accounts/account-add/account-add.component';
import {TransactionEditComponent} from './accounts/transactions/transaction-edit/transaction-edit.component';
import {TransactionAddComponent} from './accounts/transactions/transaction-add/transaction-add.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'personalBanker/accounts', pathMatch: 'full' },
  { path: 'personalBanker/accounts', component: AccountsComponent, children: [
    { path: 'transaction/add/:id', component: TransactionAddComponent },
    { path: 'transaction/edit/:id', component: TransactionEditComponent },
  ]},
  { path: 'personalBanker/add', component: AccountAddComponent },
  { path: 'personalBanker/edit/:id', component: AccountEditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
