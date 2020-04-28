export class Transaction {

  constructor(
      public transactionKey: number,
      public accountNumber: string,
      public transactionDate: Date,
      public amount: number,
      public checkNumber: string,
      public memo: string,
      public returned: boolean,
      public processed: boolean,
      public createdUserId: string,
      public createdTimeStamp: string,
      public modifiedUserId: string,
      public modifiedTimeStamp: string) {
    }
}

