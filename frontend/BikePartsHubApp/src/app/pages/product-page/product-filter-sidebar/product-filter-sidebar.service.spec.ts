import { TestBed } from '@angular/core/testing';

import { ProductFilterSidebarService } from './product-filter-sidebar.service';

describe('ProductFilterSidebarService', () => {
  let service: ProductFilterSidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductFilterSidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
