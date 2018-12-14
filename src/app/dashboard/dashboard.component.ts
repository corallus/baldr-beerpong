import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

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
