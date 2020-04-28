import {Component, OnInit} from '@angular/core';
import {Account} from '../shared/account.model';
import {AccountsService} from '../accounts.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  accountNumber = '';
  account: Account;

  constructor(private accountsService: AccountsService) {
  }

  ngOnInit(): void {
    this.accounts = this.accountsService.getAccounts();
  }

  onAccountSelected(element) {
    this.accountNumber = element.target.value;
    if (this.accountNumber !== '') {
      this.account = this.accounts.find(account => account.accountNumber === this.accountNumber);
      console.log('About To Emit, account', this.account.accountNumber);
      this.accountsService.accountSelected.emit(this.account);
      console.log('Emit Complete');
    } else {
      this.accountsService.accountSelected.emit(undefined);
    }
  }
}
