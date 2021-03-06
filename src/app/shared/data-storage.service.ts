import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map, tap, take, exhaustMap} from 'rxjs/operators';

import {AccountsService} from '../accounts.service';
import {Account} from './account.model';
import {AuthService} from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  accountURL = 'https://personalbanker-34ced.firebaseio.com/accounts.json';

  constructor(
    private http: HttpClient,
    private accountService: AccountsService,
    private authService: AuthService
  ) {
  }

  saveAccounts() {
    const accounts = this.accountService.getAccounts();
    this.http
      .put(
        this.accountURL,
        accounts
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  patchAccounts(account: Account) {
    this.http
      .patch(
        this.accountURL,
        account
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  postAccounts(account: Account) {
    const accounts: Account[] = new Array(4);
    accounts.push(account);
    this.http
      .put(
        this.accountURL,
        accounts
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  getAccounts() {
    return this.http
      .get<Account[]>(
        this.accountURL
      )
      .pipe(
        map(accounts => {
          return accounts.map(account => {
            return {
              ...account,
              transactions: account.transactions ? account.transactions : []
            };
          });
        }),
        tap(accounts => {
          this.accountService.setAccounts(accounts);
        })
      );
  }

  /* getAccounts() {
       const userId = this.authService.getUserId();
       return this.http
         .get<Account[]>(this.accountURL)
         .pipe(
           map(accounts => accounts
             .map(account => ({...account, transactions: account.transactions ? account.transactions : []}))
             .filter(account => account.userId === userId)),
           tap(accounts => this.accountService.setAccounts(accounts)));
     }*/

}
