import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdialogComponent } from './listdialog.component';

describe('ListdialogComponent', () => {
  let component: ListdialogComponent;
  let fixture: ComponentFixture<ListdialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListdialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
