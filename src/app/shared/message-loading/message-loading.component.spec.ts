import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageLoadingComponent } from './message-loading.component';

describe('MessageLoadingComponent', () => {
  let component: MessageLoadingComponent;
  let fixture: ComponentFixture<MessageLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
