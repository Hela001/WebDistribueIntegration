import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureEditComponent } from './facture-edit.component';

describe('FactureEditComponent', () => {
  let component: FactureEditComponent;
  let fixture: ComponentFixture<FactureEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactureEditComponent]
    });
    fixture = TestBed.createComponent(FactureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
