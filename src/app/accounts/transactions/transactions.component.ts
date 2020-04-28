import {Component, OnInit} from '@angular/core';
import {TransactionsService} from '../transactions.service';
import {AccountsService} from '../../accounts.service';
import {Account} from '../../shared/account.model' ;
import {Transaction} from '../../shared/transaction.model';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  selectedAccount: Account = undefined;
  transactions: Transaction[];

  constructor(private accountsService: AccountsService, private transactionSerivce: TransactionsService) {
  }

  ngOnInit(): void {
    this.accountsService.accountSelected
      .subscribe(
        (account: Account) => {
          if (account !== undefined) {
            console.log('BINGO BINGO!!!!!');
            this.selectedAccount = account;
            this.transactions = this.transactionSerivce.getTransactions(this.selectedAccount.accountNumber);
            console.log('Got Transactions');
          } else {
            console.log('NOT BINGO!!!!!');
            this.selectedAccount = undefined;
            this.transactions = null;
          }
        }
      );
  }
}
