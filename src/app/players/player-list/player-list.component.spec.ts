import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { PlayerListComponent } from './player-list.component'
import { MatTableModule, MatIconModule } from '@angular/material'
import { RouterTestingModule } from '@angular/router/testing'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from 'src/app/core/auth.service'
import { PlayerService } from '../shared/player.service'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment'

describe('PlayerListComponent', () => {
  let component: PlayerListComponent
  let fixture: ComponentFixture<PlayerListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
        MatTableModule,
        MatIconModule,
      ],
      declarations: [ PlayerListComponent ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService, PlayerService
      ]
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
