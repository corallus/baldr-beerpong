import { Component } from '@angular/core'
import { AuthService } from './core/auth.service'
import { AngularFireAuth } from '@angular/fire/auth'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AngularFireAuth, AuthService]
})
export class AppComponent {
  title = 'Elo Ranking'
}
