import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramItemsComponent } from './program-items.component';

describe('ProgramItemsComponent', () => {
  let component: ProgramItemsComponent;
  let fixture: ComponentFixture<ProgramItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramItemsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
