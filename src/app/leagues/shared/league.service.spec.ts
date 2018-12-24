import { TestBed } from '@angular/core/testing';

import { LeagueService } from './league.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('LeagueService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
      ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService
      ],
  }));

  it('should be created', () => {
    const service: LeagueService = TestBed.get(LeagueService);
    expect(service).toBeTruthy();
  });
});
