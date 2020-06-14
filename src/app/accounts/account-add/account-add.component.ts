import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Account, AccountTypes} from '../../shared/account.model';
import {AccountsService} from '../../accounts.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-account-add',
  templateUrl: './account-add.component.html',
  styleUrls: ['./account-add.component.css']
})
export class AccountAddComponent implements OnInit{
  accountForm: FormGroup;
  accountTypes = ['Brokerage', 'Checking', 'Saving'];
  today = new Date();
  dateCreated = new DatePipe('en-US').transform(this.today, 'yyyy-dd-MM');
  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountsService: AccountsService) {
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
        'bankName': new FormControl(null, [Validators.required, this.bankNameValidate.bind(this)]),
        'accountName': new FormControl(null, [Validators.required, this.accountNameValidate.bind(this)]),
        'accountNumber': new FormControl(null, [Validators.required]),
        'balance': new FormControl(null, [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$'), Validators.minLength(1)]),
        'accountType': new FormControl(null, [Validators.required]),
        'checkNumber': new FormControl(null),
        'dateCreated': new FormControl(this.dateCreated)
    });
  }

  onSubmit() {
    this.accountsService.addAccount(this.accountForm.value);
    this.accountForm.reset();
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
