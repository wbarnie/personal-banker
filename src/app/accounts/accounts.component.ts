import {Component, OnDestroy, OnInit} from '@angular/core';
import {Account} from '../shared/account.model';
import {AccountsService} from '../accounts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[];
  accountNumber = '';
  accountIndex = 0;
  id = '';
  account: Account;
  isFetching = false;
  error = null;
  private errorSub: Subscription;

  constructor(private accountsService: AccountsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.errorSub = this.accountsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    this.isFetching = true;
    this.accountsService.getAccounts().subscribe(
      accts => {
        this.isFetching = false;
        this.accounts = accts;
      },
      error => {
        this.isFetching = false;
        this.error = error.message;
      }
    );
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onAccountSelected(element) {
    this.accountNumber = element.target.value;
    if (this.accountNumber !== '') {
      this.account = this.accounts.find(account => account.accountNumber === this.accountNumber);
      this.accountIndex = this.accounts.indexOf(this.account);
      this.id = this.account.id;
      this.accountsService.accountSelected.next(this.account);
    } else {
      this.accountsService.accountSelected.next(undefined);
      this.account = undefined;
      this.router.navigate(['perssonalBanker/accounts']);
    }
  }

  onEditAccount() {
    if (this.account !== undefined) {
      this.router.navigate(['/personalBanker/edit', this.accountIndex]);
    }
  }
  onAddTransactions() {
      if (this.account !== undefined) {
        this.router.navigate(['/personalBanker/accounts/transaction/add', this.id]);
      }
    }
}
