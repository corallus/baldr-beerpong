import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCreateComponent } from './match-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatAutocompleteModule } from '@angular/material';
import { MatchService } from '../shared/match.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerService } from 'src/app/players/shared/player.service';

describe('MatchCreateComponent', () => {
  let component: MatchCreateComponent;
  let fixture: ComponentFixture<MatchCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
        ReactiveFormsModule,
        MatInputModule,
        MatAutocompleteModule
      ],
      declarations: [ MatchCreateComponent ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService, MatchService, PlayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
