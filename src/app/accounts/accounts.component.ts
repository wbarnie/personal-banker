import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Account} from '../shared/account.model';
import {DataStorageService} from '../shared/data-storage.service';
import {AccountsService} from '../accounts.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit, OnDestroy {
  accounts: Account[];
  id = undefined;
  accountIndex = 0;
  account: Account;
  isFetching = false;
  error = null;
  private errorSub: Subscription;
  userId: string;

  constructor(private accountsService: AccountsService,
              private dataStorageService: DataStorageService,
              private route: ActivatedRoute,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.errorSub = this.accountsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });

    // tslint:disable-next-line:no-shadowed-variable
    this.dataStorageService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
    // this.accountIndexSubject.unsubscribe();
  }

  onAccountSelected(element) {
    const acctId = element.target.value;
    if (acctId !== '') {
      // tslint:disable-next-line:radix
      this.id = parseInt(acctId);
    } else {
      this.id = undefined;
    }
    // this.id = element.target.value;
    if (this.id !== undefined) {
      this.account = this.accounts.find(account => account.id === this.id);
      this.accountIndex = this.accounts.indexOf(this.account);
      this.accountsService.setSelectedAccount(this.accountIndex);
      this.accountsService.selectedAccountSubject.next(this.account);
      this.accountsService.accountIndexSubject.next(this.accountIndex);
    } else {
      this.account = undefined;
      this.accountsService.setSelectedAccount(undefined);
      this.id = undefined;
      this.router.navigate(['/personalBanker/accounts']);
      this.accountsService.selectedAccountSubject.next(undefined);
      this.accountsService.accountIndexSubject.next(undefined);
    }
  }

  onEditAccount() {
    if (this.account !== undefined) {
      this.router.navigate(['/personalBanker/edit', this.accountIndex]);
    }
  }
}
