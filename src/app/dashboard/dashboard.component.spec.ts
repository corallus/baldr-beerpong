import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { LeagueFormComponent } from '../leagues/league-form/league-form.component';
import { LeaguesListComponent } from '../leagues/leagues-list/leagues-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardTitle, MatLabel, MatFormField, MatCard, MatCardContent, MatCardActions, MatIcon, MatInputModule, MatFormFieldModule } from '@angular/material';
import { RouterModule, Router } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../core/auth.service';

describe('DashboardComponent', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      declarations: [ 
        DashboardComponent, 
        LeagueFormComponent, 
        LeaguesListComponent, 
        MatCardTitle, 
        MatCard,
        MatCardContent,
        MatCardActions,
        MatIcon
      ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        ReactiveFormsModule,
        RouterModule,
        MatInputModule,
      ],
      providers: [ 
        {
          provide: Router, 
          useClass: class { navigate = jasmine.createSpy("navigate") }
        }, 
        AngularFirestore, AngularFireAuth, AuthService
      ],
    })
    const fixture = TestBed.createComponent(DashboardComponent);
    const component = fixture.componentInstance;
    expect(component).toBeDefined();
  });
});
