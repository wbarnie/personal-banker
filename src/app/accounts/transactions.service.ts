import {Injectable} from '@angular/core';
import {Account} from '../shared/account.model';
import {Transaction} from '../shared/transaction.model';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  transactionURL = 'https://personalbanker-34ced.firebaseio.com/transactions.json';
  private transactions: Transaction[];
  error = new Subject<string>();
  transactionsChanged = new Subject<Transaction[]>();

  constructor(private http: HttpClient) {
  }

  getTransactions(accountNbr: string): Observable<Transaction[]> {
    this.transactions = [];
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');
    return this.http
      .get<{ [key: string]: Transaction }>(
        this.transactionURL,
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
              this.transactions.push({...responseData[key], id: key});
            }
          }
          return this.transactions.filter(
            transaction => transaction.accountId === accountNbr);
        }),
        catchError(errorRes => {
          // Send to analytics server
          return throwError(errorRes);
        })
      );
  }

  getIndexByKey(transactionKey: string): number {
    for (let i = 0; i < this.transactions.length; i++) {
      if (this.transactions[i].id === transactionKey) {
        return i;
      }
    }
    return -1;
}
  getTransactionByIndex(transIndex: number): Transaction {
    return this.transactions[transIndex];
  }

  getTransactionByKey(transactionId: string): Transaction {
    return this.transactions.find(
      transaction => transaction.id === transactionId);
  }

  addTransaction(transaction: Transaction) {
    this.http
      .post(
        this.transactionURL,
        transaction
      )
      .subscribe(
        responseData => {
          console.log(responseData);
        },
        error => {
          this.error.next(error.message);
        }
      );
    this.transactionsChanged.next(this.transactions);
  }

  updateTransaction(index: number, transaction: Transaction) {
    this.transactions[index] = transaction;

    this.http
      .put(
        this.transactionURL,
        this.transactions
      )
      .subscribe(response => {
        console.log(response);
      });
  }

  deleteTransaction(index: number) {
    this.transactions.splice(index, 1);
    this.http
      .put(
        this.transactionURL,
        this.transactions
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
