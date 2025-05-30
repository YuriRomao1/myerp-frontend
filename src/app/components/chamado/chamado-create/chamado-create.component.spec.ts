import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoCreateComponent } from './chamado-create.component';

describe('ChamadoCreateComponent', () => {
  let component: ChamadoCreateComponent;
  let fixture: ComponentFixture<ChamadoCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
