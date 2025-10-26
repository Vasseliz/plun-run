import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoTreinoComponent } from './resultado-treino.component';

describe('ResultadoTreinoComponent', () => {
  let component: ResultadoTreinoComponent;
  let fixture: ComponentFixture<ResultadoTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultadoTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadoTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
