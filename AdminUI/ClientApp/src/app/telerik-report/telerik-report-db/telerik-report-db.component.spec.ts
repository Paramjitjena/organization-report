import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelerikReportDBComponent } from './telerik-report-db.component';

describe('TelerikReportDBComponent', () => {
  let component: TelerikReportDBComponent;
  let fixture: ComponentFixture<TelerikReportDBComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelerikReportDBComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelerikReportDBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
