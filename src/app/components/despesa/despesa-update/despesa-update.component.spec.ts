import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaUpdateComponent } from './despesa-update.component';

describe('DespesaUpdateComponent', () => {
  let component: DespesaUpdateComponent;
  let fixture: ComponentFixture<DespesaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespesaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespesaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
