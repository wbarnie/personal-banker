import { TestBed } from '@angular/core/testing';

import { AccountsResolverService } from './accounts-resolver.service';

describe('AccountsResolverService', () => {
  let service: AccountsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
