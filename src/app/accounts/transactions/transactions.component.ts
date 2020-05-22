import {Component, OnDestroy, OnInit} from '@angular/core';
import {TransactionsService} from '../transactions.service';
import {AccountsService} from '../../accounts.service';
import {Account} from '../../shared/account.model' ;
import {Transaction} from '../../shared/transaction.model';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit, OnDestroy {
  selectedAccount: Account = undefined;
  transactions: Transaction[];
  private accountServiceSubscription: Subscription;

  constructor(private accountsService: AccountsService, private transactionSerivce: TransactionsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountServiceSubscription = this.accountsService.accountSelected
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

  ngOnDestroy(): void {
    this.accountServiceSubscription.unsubscribe();
  }

  onTransactionEdit(transactionKey: string) {
    console.log('onTransactionEdit: ' + transactionKey);
    this.router.navigate(['transaction/edit', transactionKey], {relativeTo: this.route});
  }
}
