import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Account } from './shared/account.model';
import { DataStorageService } from './shared/data-storage.service';
import {AccountsService} from './accounts.service';

@Injectable({ providedIn: 'root' })
export class AccountsResolverService implements Resolve<Account[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private accountService: AccountsService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const accounts = this.accountService.getAccounts();

    if (accounts.length === 0) {
      return this.dataStorageService.getAccounts();
    } else {
      return accounts;
    }
  }
}
