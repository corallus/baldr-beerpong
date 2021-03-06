import { Injectable, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { auth } from 'firebase/app'
import { AngularFireAuth } from '@angular/fire/auth'
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import { Observable, of } from 'rxjs'
import { switchMap, tap } from 'rxjs/operators'

export interface User {
  uid: string
  email?: string | null
  photoURL?: string
  displayName?: string
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  user: Observable<User | null>

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
  ) {
    console.log('authService instance created')
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      }),
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      // startWith(JSON.parse(localStorage.getItem('user')))
    )
  }

  ngOnDestroy() {
    console.log('authService instance destroyed')
  }

  ////// OAuth Methods /////

  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider)
  }

  githubLogin() {
    const provider = new auth.GithubAuthProvider()
    return this.oAuthLogin(provider)
  }

  facebookLogin() {
    const provider = new auth.FacebookAuthProvider()
    return this.oAuthLogin(provider)
  }

  twitterLogin() {
    const provider = new auth.TwitterAuthProvider()
    return this.oAuthLogin(provider)
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => {
        return this.updateUserData(credential.user)
      })
      .catch(error => this.handleError(error))
  }

  //// Anonymous Auth ////

  anonymousLogin() {
    return this.afAuth.auth
      .signInAnonymously()
      .then(credential => {
        return this.updateUserData(credential.user) // if using firestore
      })
      .catch(error => {
        this.handleError(error)
      })
  }

  //// Email/Password Auth ////

  emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => {
        return this.updateUserData(credential.user) // if using firestore
      })
      .catch(error => this.handleError(error))
  }

  emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.handleError(error))
  }

  // Sends email allowing user to reset password
  resetPassword(email: string) {
    const fbAuth = auth()

    return fbAuth
      .sendPasswordResetEmail(email)
      .catch(error => this.handleError(error))
  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/'])
    })
  }

  // If error, console log and notify user
  private handleError(error: Error) {
    console.error(error)
    console.log('in authService')
  }

  // Sets user data to firestore after succesful login
  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    )

    const data: User = {
      uid: user.uid,
      email: user.email || null,
      displayName: user.displayName || 'nameless user',
      photoURL: user.photoURL || 'https://goo.gl/Fz9nrQ'
    }
    return userRef.set(data)
  }
}
