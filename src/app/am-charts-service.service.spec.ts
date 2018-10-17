import { TestBed, inject } from '@angular/core/testing';

import { AmChartsServiceService } from './am-charts-service.service';

describe('AmChartsServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AmChartsServiceService]
    });
  });

  it('should be created', inject([AmChartsServiceService], (service: AmChartsServiceService) => {
    expect(service).toBeTruthy();
  }));
});
