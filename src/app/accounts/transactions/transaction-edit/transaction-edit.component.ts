import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AccountsService} from '../../../accounts.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.css']
})
export class TransactionEditComponent implements OnInit, OnDestroy {
  errorSub: Subscription;
  error: string;
  accountId: string;
  transactionIndex: number;
  transactionForm: FormGroup;
  transactionTypes = ['Check', 'Withdrawal', 'Void', 'Deposit'];
  id: string;
  returned = false;
  processed = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountsService: AccountsService
  ) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.transactionIndex = params.id;
          this.initForm();
        }
      );
    this.errorSub = this.accountsService.error.subscribe(errorMessage => {
      this.error = errorMessage;
    });
  }

  private initForm() {
    let accountId = '';
    let transactionDate = new Date();
    let amount = 0.00;
    let checkNumber = '';
    let memo = '';
    let returned = false;
    let processed = false;
    let transactionType = '';

    const transaction = this.accountsService.getTransactionByIndex(this.transactionIndex);
    accountId = transaction.accountId;
    this.accountId = transaction.accountId;
    transactionDate = transaction.transactionDate;
    amount = transaction.amount;
    checkNumber = transaction.checkNumber;
    memo = transaction.memo;
    returned = transaction.returned;
    processed = transaction.processed;
    transactionType = transaction.transactionType;

    // this.transactionIndex = this.transactionService.getIndexByKey(transaction.id);
    this.transactionForm = new FormGroup({
      'accountId': new FormControl(accountId),
      'transactionDate': new FormControl(transactionDate, [Validators.required]),
      'amount': new FormControl(amount, [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$'), Validators.minLength(1)]),
      'checkNumber': new FormControl(checkNumber, [Validators.required]),
      'memo': new FormControl(memo),
      'returned': new FormControl(returned),
      'processed': new FormControl(processed),
      'transactionType': new FormControl(transactionType, [Validators.required])
    });
  }

  ngOnDestroy() {
    this.errorSub.unsubscribe();
  }

  onCancel() {
    this.router.navigate(['/personalBanker/accounts']);
  }

  onSubmit() {
    this.accountsService.updateTransaction(this.transactionIndex, this.transactionForm.value);
    this.onCancel();
  }

  onDeleteTransaction() {
    this.accountsService.deleteTransaction(this.transactionIndex);
    this.onCancel();
  }
}
