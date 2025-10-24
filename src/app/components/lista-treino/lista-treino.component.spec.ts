import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaTreinoComponent } from './lista-treino.component';

describe('ListaTreinoComponent', () => {
  let component: ListaTreinoComponent;
  let fixture: ComponentFixture<ListaTreinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaTreinoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaTreinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
