import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageFlashComponent } from './message-flash.component';

describe('MessageFlashComponent', () => {
  let component: MessageFlashComponent;
  let fixture: ComponentFixture<MessageFlashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFlashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFlashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
