import { TestBed } from "@angular/core/testing";

import { CaseService } from "./case.service";

describe("CaseService", () => {
  let service: CaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaseService);
  });

  // it('should be created', () => {
  //   expect(service).toBeTruthy();
  // });

  // it("should convert time", () => {
  //   let date = service.timeConverter(1640118081);
  //   expect(date).toMatch("21 Dec 2021 21:21:21");
  // });

});
