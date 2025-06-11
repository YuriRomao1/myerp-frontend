import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChamadoEmpresaListComponent } from './chamado-empresa-list.component';

describe('ChamadoEmpresaListComponent', () => {
  let component: ChamadoEmpresaListComponent;
  let fixture: ComponentFixture<ChamadoEmpresaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChamadoEmpresaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChamadoEmpresaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
