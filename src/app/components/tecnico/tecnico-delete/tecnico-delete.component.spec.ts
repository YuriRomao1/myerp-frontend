import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TecnicoDeleteComponent } from './tecnico-delete.component';

describe('TecnicoDeleteComponent', () => {
  let component: TecnicoDeleteComponent;
  let fixture: ComponentFixture<TecnicoDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TecnicoDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TecnicoDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
