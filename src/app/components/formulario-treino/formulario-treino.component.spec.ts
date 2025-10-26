import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioTreinoComponent } from './formulario-treino.component';

describe('FormularioTreinoComponent', () => {
  let component: FormularioTreinoComponent;
  let fixture: ComponentFixture<FormularioTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormularioTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
