import {Transaction} from './transaction.model';

export enum AccountTypes {
  Savings = 'Savings',
  Checking = 'Checking',
  Brokerage = 'Brokerage'
}

export class Account {
  public bankName: string;
  public accountName: string;
  public accountNumber: string;
  public balance: number;
  public accountType: AccountTypes;
  public checkNumber: string;
  public dateCreated: Date;
  public id: number;
  public transactions: Transaction[];
  public userId: string;

  // tslint:disable-next-line:max-line-length
  constructor(bankName: string, accountName: string, accountNumber: string, balance: number, accountType: AccountTypes, checkNumber: string, dateCreated: Date, id: number, transactions: Transaction[], userId: string) {
    this.bankName = bankName;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.balance = balance;
    this.accountType = accountType;
    this.checkNumber = checkNumber;
    this.dateCreated = dateCreated;
    this.id = id;
    this.transactions = transactions;
    this.userId = userId;
  }
}

