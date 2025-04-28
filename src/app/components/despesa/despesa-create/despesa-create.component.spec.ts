import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespesaCreateComponent } from './despesa-create.component';

describe('DespesaCreateComponent', () => {
  let component: DespesaCreateComponent;
  let fixture: ComponentFixture<DespesaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DespesaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DespesaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
