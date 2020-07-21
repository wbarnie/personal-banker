import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AccountsService} from '../../../accounts.service';
import {Account} from '../../../shared/account.model';
import {DataStorageService} from '../../../shared/data-storage.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
  transactionForm: FormGroup;
  transactionTypes = ['Check', 'Withdrawal', 'Void'];
  accountIndex: number;
  returned = false;
  processed = false;
  account: Account;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountsService: AccountsService,
              private dataStorageService: DataStorageService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.accountIndex = params['id'];
      this.account = this.accountsService.getAccount(this.accountIndex);
      this.transactionForm = new FormGroup({
        'transactionDate': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern('(?=.*?\\d)^\\$?(([1-9]\\d{0,2}(,\\d{3})*)|\\d+)?(\\.\\d{1,2})?$'), Validators.minLength(1)]),
        'checkNumber': new FormControl(null, [Validators.required]),
        'memo': new FormControl(null),
        'returned': new FormControl(this.returned),
        'processed': new FormControl(this.processed),
        'transactionType': new FormControl(null, [Validators.required])
      });
    });
  }

  onSubmit() {
    this.accountsService.addTransaction(this.transactionForm.value, this.accountIndex);
    this.dataStorageService.saveAccounts();
    this.transactionForm.reset();
    this.router.navigate(['personalBanker/accounts']);
  }

  onCancel() {
    this.router.navigate(['/personalBanker/accounts']);
  }
}
