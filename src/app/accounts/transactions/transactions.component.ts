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
  // selectedAccount: Account = undefined;
  transactions: Transaction[];
  // private accountServiceSubscription: Subscription;
  isFetching = false;
  error = null;
  account = null;
  private errorSub: Subscription;
  private accountSelected: Subscription;
  private transactionSubscription: Subscription;

  constructor(private accountsService: AccountsService, private transactionSerivce: TransactionsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.errorSub = this.accountsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.transactionSubscription = this.transactionSerivce.transactionsChanged
      .subscribe(
              (transactions: Transaction[]) => {
                this.transactions = transactions;
              }
            );
    this.accountSelected = this.accountsService.accountSelected
      .subscribe(
        (account: Account) => {
          this.account = account;
          this.transactions = [];
          if (account !== undefined ) {
            console.log('account !== null: ', account);
            this.getTransactions(this.account);
          }
        });
    /*this.accountServiceSubscription = this.accountsService.accountSelected
      .subscribe(
        (account: Account) => {
          if (account !== undefined) {
            console.log('BINGO BINGO!!!!!');
            this.selectedAccount = account;
            this.transactions = this.transactionSerivce.getTransactions(this.selectedAccount.id);
            console.log('Got Transactions');
          } else {
            console.log('NOT BINGO!!!!!');
            this.selectedAccount = undefined;
            this.transactions = null;
          }
        }
      );*/
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.accountSelected.unsubscribe();
    this.transactionSubscription.unsubscribe();
    // this.accountServiceSubscription.unsubscribe();
  }

  onTransactionEdit(transactionKey: string) {
    console.log('onTransactionEdit: ' + transactionKey);
    this.router.navigate(['transaction/edit', transactionKey], {relativeTo: this.route});
  }

  getTransactions(account: Account) {
      this.isFetching = true;
      this.transactionSerivce.getTransactions(this.account.id).subscribe(
        trans => {
          this.isFetching = false;
          this.transactions = trans;
        },
        error => {
          this.isFetching = false;
          this.error = error.message;
        }
      );
    }
}
