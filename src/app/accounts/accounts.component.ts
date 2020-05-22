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
  account: Account;
  accountSubscription: Subscription;

  constructor(private accountsService: AccountsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.accountSubscription = this.accountsService.accountsChanged
      .subscribe(
        (accounts: Account[]) => {
          this.accounts = accounts;
        }
      );
    this.accounts = this.accountsService.getAccounts();
  }

  ngOnDestroy() {
    this.accountSubscription.unsubscribe();
  }

  onAccountSelected(element) {
    this.accountNumber = element.target.value;
    if (this.accountNumber !== '') {
      this.account = this.accounts.find(account => account.accountNumber === this.accountNumber);
      this.accountIndex = this.accounts.indexOf(this.account);
      this.accountsService.accountSelected.next(this.account);
    } else {
      this.accountsService.accountSelected.next(undefined);
      this.account = undefined;
    }
  }

  onEditAccount() {
    if (this.account !== undefined) {
      this.router.navigate(['/personalBanker/edit', this.accountIndex]);
      // this.router.navigate(['/personalBanker/edit', this.accountNumber]);
      // this.router.navigate(['.', 'personalBanker/edit', this.accountNumber], {relativeTo: this.route});
    }
  }
}
