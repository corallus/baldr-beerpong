import { TestBed } from '@angular/core/testing'

import { AuthService } from './auth.service'
import { AngularFireModule } from '@angular/fire'
import { environment } from 'src/environments/environment'
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth'
import { RouterTestingModule } from '@angular/router/testing'

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule
      ],
      providers: [
        AngularFirestore,
        AngularFireAuth,
        AuthService
      ]
  }))

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService)
    expect(service).toBeTruthy()
  })
})
