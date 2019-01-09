import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LeagueDetailComponent } from './league-detail.component'
import { LeagueFormComponent } from '../league-form/league-form.component'
import { MatchCreateComponent } from 'src/app/matches/match-create/match-create.component'
import { PlayerCreateComponent } from 'src/app/players/player-create/player-create.component'
import { MatchListComponent } from 'src/app/matches/match-list/match-list.component'
import { PlayerListComponent } from 'src/app/players/player-list/player-list.component'
import { MatAutocompleteModule, MatInputModule, MatListModule, MatIconModule, MatTableModule, MatBadgeModule } from '@angular/material'
import { ReactiveFormsModule } from '@angular/forms'
import { MatchDetailComponent } from 'src/app/matches/match-list/match-detail/match-detail.component'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from 'src/app/core/auth.service'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment'
import { RouterTestingModule } from '@angular/router/testing'

describe('LeagueDetailComponent', () => {
  let component: LeagueDetailComponent
  let fixture: ComponentFixture<LeagueDetailComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        ReactiveFormsModule,
        RouterTestingModule,
        MatInputModule,
        MatAutocompleteModule,
        MatListModule,
        MatIconModule,
        MatTableModule,
        MatBadgeModule,
      ],
      declarations: [
        LeagueDetailComponent,
        LeagueFormComponent,
        MatchCreateComponent,
        PlayerCreateComponent,
        MatchListComponent,
        PlayerListComponent,
        MatchDetailComponent
      ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueDetailComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
