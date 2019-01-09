import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LeaguesListComponent } from './leagues-list.component'
import { RouterTestingModule } from '@angular/router/testing'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment'
import { MatCardModule, MatIconModule } from '@angular/material'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { AuthService } from 'src/app/core/auth.service'

describe('LeaguesListComponent', () => {
  let component: LeaguesListComponent
  let fixture: ComponentFixture<LeaguesListComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
        MatCardModule,
        MatIconModule,
      ],
      declarations: [ LeaguesListComponent ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
