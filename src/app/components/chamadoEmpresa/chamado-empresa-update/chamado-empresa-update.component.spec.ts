import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoEmpresaUpdateComponent } from './chamado-empresa-update.component';

describe('ChamadoEmpresaUpdateComponent', () => {
  let component: ChamadoEmpresaUpdateComponent;
  let fixture: ComponentFixture<ChamadoEmpresaUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoEmpresaUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoEmpresaUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
