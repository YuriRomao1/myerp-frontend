import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoEmpresaReadComponent } from './chamado-empresa-read.component';

describe('ChamadoEmpresaReadComponent', () => {
  let component: ChamadoEmpresaReadComponent;
  let fixture: ComponentFixture<ChamadoEmpresaReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoEmpresaReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoEmpresaReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
