import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBasketComponent } from './page-basket.component';

describe('PageBasketComponent', () => {
  let component: PageBasketComponent;
  let fixture: ComponentFixture<PageBasketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBasketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
