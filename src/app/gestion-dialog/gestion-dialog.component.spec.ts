import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDialogComponent } from './gestion-dialog.component';

describe('GestionDialogComponent', () => {
  let component: GestionDialogComponent;
  let fixture: ComponentFixture<GestionDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionDialogComponent]
    });
    fixture = TestBed.createComponent(GestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
