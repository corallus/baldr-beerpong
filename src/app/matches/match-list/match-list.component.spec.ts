import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListComponent } from './match-list.component';
import { MatchDetailComponent } from './match-detail/match-detail.component';
import { MatListModule, MatBadgeModule, MatIconModule } from '@angular/material';
import { MatchService } from '../shared/match.service';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { PlayerService } from 'src/app/players/shared/player.service';

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
        MatListModule,
        MatBadgeModule,
        MatIconModule
      ],
      declarations: [ MatchListComponent, MatchDetailComponent ],      
      providers: [
        AngularFirestore, AngularFireAuth, AuthService, MatchService, PlayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
