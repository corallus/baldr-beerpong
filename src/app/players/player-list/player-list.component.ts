import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../shared/player';
import { PlayerService } from '../shared/player.service';
import { LeagueService } from '../../leagues/shared/league.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
  players: Observable<Player[]>;
  displayedColumns = ['index', 'score', 'name', 'actions'];

  constructor(private service: PlayerService) { }

  ngOnInit() {
    this.players = this.service.list();
  }

  delete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.delete(id);
    }
  }

}
