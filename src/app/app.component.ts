import { Component } from '@angular/core';
import { AuthService } from './core/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AngularFireAuth, AuthService]
})
export class AppComponent {
  title = 'Elo Ranking';

  form = new FormGroup({
    email: new FormControl(null, [
      Validators.email
    ]),
    password: new FormControl(null, [
    ]),
  });

  constructor(public auth: AuthService, private router: Router) { }

  login() {
    this.auth.anonymousLogin()
      .then(() => this.afterSignIn());
  }

  emailLogin() {
    this.auth.emailLogin(this.form.controls['email'].value, this.form.controls['password'].value);
  }

  private afterSignIn(): void {
    // Do after login stuff here, such router redirects, toast messages, etc.
    this.router.navigate(['/']);
  }
}
