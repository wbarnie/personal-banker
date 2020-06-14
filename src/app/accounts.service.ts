import {Injectable} from '@angular/core';
import {Account, AccountTypes} from './shared/account.model';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AccountsService {
  accountURL = 'https://personalbanker-34ced.firebaseio.com/accounts.json';
  accountSelected = new Subject<Account>();
  accountsArray = [];
  error = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getAccounts(): Observable<Account[]> {
    this.accountsArray = [];
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Account }>(
        this.accountURL,
        {
          headers: new HttpHeaders({'Custom-Header': 'Hello'}),
          params: searchParams,
          responseType: 'json'
        }
      )
      .pipe(
        map(responseData => {
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              this.accountsArray.push({...responseData[key], id: key});
            }
          }
          return this.accountsArray;
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  getAccount(accountIndex: number): Account {
    this.accountSelected.next(this.accountsArray[accountIndex]);
    return this.accountsArray[accountIndex];
  }

  updateAccount(index: number, account: Account) {
    this.accountsArray[index] = account;

    this.http
      .put(
        this.accountURL,
        this.accountsArray
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  deleteAccount(index: number) {
    this.accountsArray.splice(index, 1);
    this.http
      .put(
        this.accountURL,
        this.accountsArray
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  addAccount(account: Account) {
    this.http
      .post(
        this.accountURL,
        account
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
  }
}
