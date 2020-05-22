export enum AccountTypes{
  Savings = 'Savings',
  Checking = 'Checking',
  Brokerage = 'Brokerage'
}

export class Account {

  constructor(
    public bankName: string,
    public accountName: string,
    public accountNumber: string,
    public balance: number,
    public accountType: AccountTypes,
    public checkNumber: string) {
  }
}
