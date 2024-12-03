import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtGuesserComponent } from './art-guesser.component';

describe('ArtGuesserComponent', () => {
  let component: ArtGuesserComponent;
  let fixture: ComponentFixture<ArtGuesserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtGuesserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtGuesserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
