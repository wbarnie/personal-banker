import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Account} from '../shared/account.model';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  @Output() selectedAccount = new EventEmitter<Account>();
  accountNumber = '';
  account: Account;

  constructor(private accountService: AccountsService) {
  }

  ngOnInit(): void {
    this.accounts = this.accountService.getAccounts();
  }

  onAccountSelected(element) {
    const value = element.target.value;
    this.accountNumber = element.target.value;
    this.account = this.accounts.find(account => account.accountNumber === this.accountNumber);
    this.selectedAccount.emit(this.account);
  }


}
