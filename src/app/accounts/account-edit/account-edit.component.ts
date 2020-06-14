import {Component, OnDestroy, OnInit} from '@angular/core';
import {AccountsService} from '../../accounts.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.css']
})
export class AccountEditComponent implements OnInit, OnDestroy {
  id: string;
  accountIndex: number;
  accountEditForm: FormGroup;
  accountTypes = ['Brokerage', 'Checking', 'Saving'];
  errorSub: Subscription;
  error: string;

  constructor(private accountsService: AccountsService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // this.id = params.id;
          this.accountIndex = +params.id;
          this.initForm();
          // this.id = +params['id']; // use for number
          // this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
    this.errorSub = this.accountsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  onCancel() {
    this.router.navigate(['/personalBanker/accounts']);
  }

  onSubmit() {
    console.log(this.accountEditForm.value);
    this.accountsService.updateAccount(this.accountIndex, this.accountEditForm.value);
    this.onCancel();
  }

  onDeleteAccount() {
    this.accountsService.deleteAccount(this.accountIndex);
    this.accountsService.getAccounts();
    this.onCancel();
  }

  private initForm() {
    let balance = 0.00;
    let bankName = '';
    let accountName = '';
    let checkNumber = '';
    let accountNumber = '';
    let accountType = '';
    let dateCreated;

    const account = this.accountsService.getAccount(this.accountIndex);
    balance = account.balance;
    bankName = account.bankName;
    accountName = account.accountName;
    checkNumber = account.checkNumber;
    accountNumber = account.accountNumber;
    accountType = account.accountType;
    dateCreated = account.dateCreated;
    this.accountEditForm = new FormGroup({
      'bankName': new FormControl(bankName, [Validators.required, this.bankNameValidate.bind(this)]),
      'accountName': new FormControl(accountName, [Validators.required, this.accountNameValidate.bind(this)]),
      'accountNumber': new FormControl(accountNumber, [Validators.required]),
      'balance': new FormControl(balance, [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$'), Validators.minLength(1)]),
      'accountType': new FormControl(accountType, [Validators.required]),
      'checkNumber': new FormControl(checkNumber),
      'dateCreated': new FormControl(dateCreated)
    });
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

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }
}
