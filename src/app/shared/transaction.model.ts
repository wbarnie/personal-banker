export enum TransactionTypes{
  Check = 'Check',
  Withdrawal = 'Withdrawal',
  Void = 'Void'
}

import {AccountTypes} from './account.model';

export class Transaction {

  constructor(
    public accountId: string,
    public transactionDate: Date,
    public amount: number,
    public checkNumber: string,
    public memo: string,
    public transactionType: TransactionTypes,
    public returned: boolean,
    public processed: boolean) {
  }
}

