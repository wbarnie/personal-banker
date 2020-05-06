import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountsComponent} from './accounts/accounts.component';
import {AccountEditComponent} from './accounts/account-edit/account-edit.component';
import {AccountAddComponent} from './accounts/account-add/account-add.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'personalBanker/accounts', pathMatch: 'full' },
  { path: 'personalBanker/accounts', component: AccountsComponent, children: [
    { path: 'edit/:id', component: AccountEditComponent },
  ]},
  { path: 'personalBanker/add', component: AccountAddComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
