import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelerikReportComponent } from './telerik-report.component';

describe('TelerikReportComponent', () => {
  let component: TelerikReportComponent;
  let fixture: ComponentFixture<TelerikReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelerikReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelerikReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
