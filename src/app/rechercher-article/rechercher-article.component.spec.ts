import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RechercherArticleComponent } from './rechercher-article.component';

describe('RechercherArticleComponent', () => {
  let component: RechercherArticleComponent;
  let fixture: ComponentFixture<RechercherArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RechercherArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RechercherArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
