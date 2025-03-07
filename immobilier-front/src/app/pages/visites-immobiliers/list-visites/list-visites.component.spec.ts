import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVisitesComponent } from './list-visites.component';

describe('ListVisitesComponent', () => {
  let component: ListVisitesComponent;
  let fixture: ComponentFixture<ListVisitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListVisitesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVisitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
