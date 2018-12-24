import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchDetailComponent } from './match-detail.component';
import { MatBadgeModule, MatIconModule } from '@angular/material';
import { MatchService } from '../../shared/match.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from 'src/app/core/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { PlayerService } from 'src/app/players/shared/player.service';

describe('MatchDetailComponent', () => {
  let component: MatchDetailComponent;
  let fixture: ComponentFixture<MatchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
        MatBadgeModule,
        MatIconModule,
      ],
      declarations: [ MatchDetailComponent ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService, MatchService, PlayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
