export class Account {

  constructor(
    public accountKey: number,
    public accountNumber: string,
    public balance: number,
    public bankName: string,
    public accountName: string,
    public checkNumber: string,
    public createdTimeStamp: string,
    public createdUserId: string,
    public dateLastReconciled: string,
    public modifiedTimeStamp: string,
    public modifiedUserId: string) {
  }
}
