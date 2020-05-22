import {Injectable} from '@angular/core';
import {Account, AccountTypes} from './shared/account.model';
import {Subject} from 'rxjs';

@Injectable()
export class AccountsService {
  accountSelected = new Subject<Account>();
  accountsChanged = new Subject<Account[]>();
  private accounts: Account[] = [
    new Account('Bank one', 'Webster 5', '100102', 258.34, AccountTypes.Checking,  '1234'),
    new Account('Bank two', 'Fidelity', '100103', 500.34, AccountTypes.Savings, ''),
    new Account('Bank Three', 'Lemonster Credit Union', '100104', 550.34, AccountTypes.Brokerage, '')
  ];

  constructor() {
  }

  getAccounts() {
    return this.accounts.slice();
  }

  getAccount(index: number): Account {
    return this.accounts[index];
    // return this.accounts.find(account => account.accountNumber === accountNbr);
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
}
