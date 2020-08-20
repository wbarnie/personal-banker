import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../auth/auth.service';
import {DataStorageService} from '../shared/data-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  accountSelectedIndex = undefined;
  isAuthenticated = false;
  private userSub: Subscription;
  private accountIndexSubject: Subscription;
  account = true;

  constructor(
    private dataStorageService: DataStorageService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private accountsService: AccountsService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.userSub = this.authService.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });

    this.accountIndexSubject = this.accountsService.accountIndexSubject.subscribe(index => {
      this.accountSelectedIndex = index;
    });
  }

  onAccountEdit() {
    this.router.navigate(['personalBanker/account/edit/', this.accountSelectedIndex]);
  }

  onTransactionAdd() {
    this.router.navigate(['personalBanker/accounts/transaction/add', this.accountSelectedIndex]);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.accountIndexSubject.unsubscribe();
  }
}
