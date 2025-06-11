import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoEmpresaCreateComponent } from './chamado-empresa-create.component';

describe('ChamadoEmpresaCreateComponent', () => {
  let component: ChamadoEmpresaCreateComponent;
  let fixture: ComponentFixture<ChamadoEmpresaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoEmpresaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoEmpresaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
