import {Injectable, OnInit} from '@angular/core';
import {Account, AccountTypes} from './shared/account.model';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Transaction} from './shared/transaction.model';

@Injectable({providedIn: 'root'})
export class AccountsService {
  accountsChanged = new Subject<Account[]>();
  selectedAccountSubject = new Subject<Account>();
  accountIndexSubject = new Subject<number>();
  error = new Subject<string>();
  private accountIndex: number;
  private accounts: Account[] = [];
  private selectedAccountIndex;

  constructor(private http: HttpClient) {
  }

  setAccounts(accounts: Account[]) {
    if (accounts !== undefined) {
      this.accounts = accounts;
      this.accountsChanged.next(this.accounts.slice());
    }
  }

  setSelectedAccount(accountIndex: number) {
    this.selectedAccountIndex = accountIndex;
    this.accountIndexSubject.next(accountIndex);
    this.selectedAccountSubject.next(this.accounts[accountIndex]);
  }

  getSelectedAccountIndex() {
    return this.selectedAccountIndex;
  }

  getAccount(accountIndex: number): Account {
    if (accountIndex !== undefined) {
      this.selectedAccountIndex = accountIndex;
      this.accountIndexSubject.next(accountIndex);
      this.selectedAccountSubject.next(this.accounts[accountIndex]);
      return this.accounts[accountIndex];
    }
  }

  getAccounts() {
    return this.accounts.slice();
  }

  updateAccount(index: number, account: Account) {
    this.accounts[index] = account;
    this.accountsChanged.next(this.accounts.slice());
  }

  deleteAccount(index: number) {
    this.accounts.splice(index, 1);
    this.accountsChanged.next(this.accounts.slice());
  }

  addAccount(account: Account) {
    this.accounts.push(account);
    this.accountsChanged.next(this.accounts.slice());
  }

  addTransaction(transaction: Transaction, accoutIdx: number) {
    let account: Account;
    account = this.accounts[accoutIdx];
    if (account.transactions === undefined) {
      account.transactions = [];
      account.transactions.push(transaction);
    } else {
      account.transactions.push(transaction);
    }
    this.accounts[this.selectedAccountIndex] = account;
    this.accountsChanged.next(this.accounts.slice());
  }

  updateTransaction(transactionIndex: number, transaction: Transaction) {
    const account = this.accounts[this.selectedAccountIndex];
    account.transactions[transactionIndex] = transaction;
    this.accountsChanged.next();
    // this.accountsChanged.next(this.accounts.slice());
  }

  deleteTransaction(transactionIndex: number) {
    const account = this.accounts[this.selectedAccountIndex];
    account.transactions.splice(transactionIndex, 1);
    this.accountsChanged.next();
  }

  getTransactionByIndex(index: number): Transaction {
    const account = this.accounts[this.selectedAccountIndex];
    return account.transactions[index];
  }

  getTransactions(index: number): Transaction[] {
    const account = this.accounts[index];
    return account.transactions === undefined ? [] : account.transactions;
  }
}
