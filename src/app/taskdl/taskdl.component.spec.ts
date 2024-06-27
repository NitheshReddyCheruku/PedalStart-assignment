import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskdlComponent } from './taskdl.component';

describe('TaskdlComponent', () => {
  let component: TaskdlComponent;
  let fixture: ComponentFixture<TaskdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskdlComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
