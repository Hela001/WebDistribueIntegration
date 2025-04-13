import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactureAddComponent } from './facture-add.component';

describe('FactureAddComponent', () => {
  let component: FactureAddComponent;
  let fixture: ComponentFixture<FactureAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactureAddComponent]
    });
    fixture = TestBed.createComponent(FactureAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
