import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMaterielComponent } from './home-materiel.component';

describe('HomeMaterielComponent', () => {
  let component: HomeMaterielComponent;
  let fixture: ComponentFixture<HomeMaterielComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeMaterielComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeMaterielComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
