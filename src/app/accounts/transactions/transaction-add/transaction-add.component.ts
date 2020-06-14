import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AccountsService} from '../../../accounts.service';
import {TransactionsService} from '../../transactions.service';

@Component({
  selector: 'app-transaction-add',
  templateUrl: './transaction-add.component.html',
  styleUrls: ['./transaction-add.component.css']
})
export class TransactionAddComponent implements OnInit {
  transactionForm: FormGroup;
  transactionTypes = ['Check', 'Withdrawal', 'Void'];
  id: string;
  returned  = false;
  processed = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private accountsService: AccountsService,
              private transactionService: TransactionsService
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.transactionForm = new FormGroup({
        'accountId': new FormControl(this.id),
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
    this.transactionService.addTransaction(this.transactionForm.value);
    console.log(this.transactionForm.value);
    this.transactionForm.reset();
    this.router.navigate(['personalBanker/accounts']);
  }

  onCancel() {
    this.router.navigate(['/personalBanker/accounts']);
  }
}
