import {Injectable} from '@angular/core';
import {Account} from './shared/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private accounts: Account[] = [
    new Account('100102', 250.34, 'bank 1', '1234', '', '', '', '', ''),
    new Account('100103', 250.34, 'bank 2', '5678', '', '', '', '', ''),
    new Account('100104', 550.34, 'bank 2', '91234', '', '', '', '', '')
  ];

  constructor() {
  }

  getAccounts() {
    return this.accounts.slice();
  }
}
