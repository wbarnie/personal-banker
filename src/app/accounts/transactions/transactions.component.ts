import {Component, OnDestroy, OnInit} from '@angular/core';
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
  private accountIndexSubject: Subscription;
  private errorSub: Subscription;
  transactions: Transaction[];
  isFetching = false;
  accountSelectedIndex = undefined;
  error = null;
  account: Account;

  constructor(private accountsService: AccountsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.errorSub = this.accountsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
    this.accountIndexSubject = this.accountsService.accountIndexSubject.subscribe(index => {
      this.getTransacrtions();
    });
    this.getTransacrtions();
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
    this.accountIndexSubject.unsubscribe();
  }

  onTransactionEdit(index: number) {
    this.router.navigate(['transaction/edit', index], {relativeTo: this.route});
  }

  getTransactions(account: Account) {
    return account.transactions;
  }
  getTransacrtions() {
    this.accountSelectedIndex = this.accountsService.getSelectedAccountIndex();
    if (this.accountSelectedIndex !== undefined) {
      this.transactions = this.accountsService.getTransactions(this.accountSelectedIndex);
    } else {
      this.transactions = [];
    }
  }
}
