import {Component, OnInit} from '@angular/core';
import {Account} from '../shared/account.model';
import {AccountsService} from '../accounts.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  accountNumber = '';
  account: Account;
  constructor(private accountsService: AccountsService, private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
  }

  onAccountSelected(element) {
    this.accountNumber = element.target.value;
    if (this.accountNumber !== '') {
      this.account = this.accounts.find(account => account.accountNumber === this.accountNumber);
      this.accountsService.accountSelected.next(this.account);
    } else {
      this.accountsService.accountSelected.next(undefined);
      this.account = undefined;
    }
  }

  onEditAccount() {
    if (this.account !== undefined) {
      this.router.navigate(['.', 'edit', this.accountNumber], {relativeTo: this.route});
    }
  }
}
