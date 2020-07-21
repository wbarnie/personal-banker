import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account, AccountTypes} from '../../shared/account.model';
import {AccountsService} from '../../accounts.service';
import {DatePipe} from '@angular/common';
import {DataStorageService} from '../../shared/data-storage.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit {
  accountForm: FormGroup;
  accountTypes = ['Brokerage', 'Checking', 'Saving'];
  today = new Date();
  userId: string;
  dateCreated = new DatePipe('en-US').transform(this.today, 'yyyy-dd-MM');

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dataStorageService: DataStorageService,
              private authService: AuthService,
              private accountsService: AccountsService) {
  }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    this.accountForm = new FormGroup({
      'id': new FormControl(currentTimeInSeconds, ),
      'bankName': new FormControl(null, [Validators.required, this.bankNameValidate.bind(this)]),
      'accountName': new FormControl(null, [Validators.required, this.accountNameValidate.bind(this)]),
      'accountNumber': new FormControl(null, [Validators.required]),
      'balance': new FormControl(null, [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$'), Validators.minLength(1)]),
      'accountType': new FormControl(null, [Validators.required]),
      'checkNumber': new FormControl(null),
      'dateCreated': new FormControl(this.dateCreated),
      'userId': new FormControl(this.userId)
    });
  }

  onSubmit() {
    this.accountsService.addAccount(this.accountForm.value);
    this.dataStorageService.saveAccounts();
    this.accountForm.reset();
    this.router.navigate(['/personalBanker/accounts']);
  }

  accountNameValidate(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null && control.value.length > 0) {
      return null;     // valid
    } else {
      return {'accountName': true};
    }
  }

  bankNameValidate(control: FormControl): { [s: string]: boolean } {
    if (control.value !== null && control.value.length > 0) {
      return null;     // valid
    } else {
      return {'bankName': true};
    }
  }

  onCancel() {
    this.router.navigate(['/personalBanker/accounts']);
  }
}
