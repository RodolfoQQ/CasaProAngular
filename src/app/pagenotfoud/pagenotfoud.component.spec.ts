import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagenotfoudComponent } from './pagenotfoud.component';

describe('PagenotfoudComponent', () => {
  let component: PagenotfoudComponent;
  let fixture: ComponentFixture<PagenotfoudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PagenotfoudComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagenotfoudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
