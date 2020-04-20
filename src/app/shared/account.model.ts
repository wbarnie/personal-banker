export class Account {

  constructor(
      public accountNumber: string,
      public balance: number,
      public bankName: string,
      public checkNumber: string,
      public createdTimeStamp: string,
      public createdUserId: string,
      public dateLastReconciled: string,
      public modifiedTimeStamp: string,
      public modifiedUserId: string) {
    }
}
