import {EventEmitter, Injectable} from '@angular/core';
import {Account} from './shared/account.model';

@Injectable()
export class AccountsService {
  accountSelected = new EventEmitter<Account>();
  private accounts: Account[] = [
    new Account(1, '100102', 250.34, 'bank 1', 'checking', '1234', '', '', '', '', ''),
    new Account(2, '100103', 500.34, 'bank 2', 'brokerage', '5678', '', '', '', '', ''),
    new Account(3, '100104', 550.34, 'bank 3', 'savings', '91234', '', '', '', '', '')
  ];

  constructor() {
  }

  getAccounts() {
    return this.accounts.slice();
  }
}
