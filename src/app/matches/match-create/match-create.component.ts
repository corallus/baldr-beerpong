import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatchService } from '../shared/match.service';
import { Player } from '../../players/shared/player';
import { PlayerService } from '../../players/shared/player.service';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.scss']
})
export class MatchCreateComponent implements OnInit {
  players: Observable<Player[]>;

  form = new FormGroup({
    white: new FormControl('', [
      Validators.required
    ]),
    black: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private service: MatchService, private playerService: PlayerService) { }

  ngOnInit() {
    this.players = this.playerService.list();
  }

  displayName(player?: Player): string | undefined {
    return player ? player.name : undefined;
  }

  onSubmit() {
    console.log(this.form.value);
    this.service.create(this.form.value);
    this.form.reset();
  }

}
