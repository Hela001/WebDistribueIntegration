import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeEquipeComponent } from './home-equipe.component';

describe('HomeEquipeComponent', () => {
  let component: HomeEquipeComponent;
  let fixture: ComponentFixture<HomeEquipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeEquipeComponent]
    });
    fixture = TestBed.createComponent(HomeEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
