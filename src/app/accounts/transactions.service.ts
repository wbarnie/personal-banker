import {Injectable} from '@angular/core';
import {Account} from '../shared/account.model';
import {Transaction} from '../shared/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  private transDate = new Date('02-02-2020');
  private transactions: Transaction[] = [
    new Transaction(1, '100102', this.transDate, 250.34, '', '', true, false, '', '', '', ''),
    new Transaction(4, '100102', this.transDate, 250.34, '', '', true, false, '', '', '', ''),
    new Transaction(5, '100102', this.transDate, 250.34, '', '', true, false, '', '', '', ''),
    new Transaction(6, '100102', this.transDate, 250.34, '', '', true, false, '', '', '', ''),
    new Transaction(2, '100103', this.transDate, 250.34, '', '', false, false, '', '', '', ''),
    new Transaction(7, '100103', this.transDate, 250.34, '', '', false, false, '', '', '', ''),
    new Transaction(8, '100103', this.transDate, 250.34, '', '', false, false, '', '', '', ''),
    new Transaction(9, '100103', this.transDate, 250.34, '', '', false, false, '', '', '', ''),
    new Transaction(3, '100104', this.transDate, 550.34, '', '', true, false, '', '', '', '')
  ];

  constructor() {
  }
  getTransactions(accountNbr: string): Transaction[] {
    return this.transactions.filter(
      transaction => transaction.accountNumber === accountNbr);
  }
}
