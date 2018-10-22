import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoursfeedComponent } from './yoursfeed.component';

describe('YoursfeedComponent', () => {
  let component: YoursfeedComponent;
  let fixture: ComponentFixture<YoursfeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoursfeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoursfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
