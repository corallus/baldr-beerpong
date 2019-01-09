import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { Player } from '../shared/player'
import { PlayerService } from '../shared/player.service'
import { League } from '../../leagues/shared/league'
import { AuthService, User } from 'src/app/core/auth.service'

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  players: Observable<Player[]>
  displayedColumns = ['index', 'score', 'name']
  @Input() ownLeague: boolean

  constructor(public auth: AuthService, private service: PlayerService) { }

  ngOnInit() {
    this.players = this.service.list()
    if (this.ownLeague) {
      this.displayedColumns.push('actions')
    }
  }

  delete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.delete(id)
    }
  }

}
