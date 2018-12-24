import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatchService } from '../shared/match.service';
import { Player } from '../../players/shared/player';
import { PlayerService } from '../../players/shared/player.service';
import { startWith, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.scss']
})
export class MatchCreateComponent implements OnInit {
  players: Observable<Player[]>
  whiteFilteredPlayers: Observable<Player[]>
  blackFilteredPlayers: Observable<Player[]>

  form = this.fb.group({
    'white': ['', Validators.required],
    'black': ['', Validators.required],
  })

  constructor(private fb: FormBuilder, private service: MatchService, private playerService: PlayerService) { }

  ngOnInit() {
    this.players = this.playerService.list()
    this.whiteFilteredPlayers = this.form.controls.white.valueChanges
    .pipe(
      startWith<string | Player>(''),
      map(value => typeof value === 'string' ? value : value.name),
      switchMap(name => name ? this.playerService.filterByName(name) : this.players)
    )
    this.blackFilteredPlayers = this.form.controls.black.valueChanges
    .pipe(
      startWith<string | Player>(''),
      map(value => typeof value === 'string' ? value : value.name),
      switchMap(name => name ? this.playerService.filterByName(name) : this.players)
    )
  }

  displayName(player?: Player): string | undefined {
    return player ? player.name : undefined;
  }

  onPlayerSelect(evt: any) {
  }

  onSubmit() {
    if (this.form.valid) {
      this.service.create(this.form.value)
      this.whiteFilteredPlayers = this.players
      this.blackFilteredPlayers = this.players
      this.form.setValue({black: '', white: ''})
      console.log(this.form.value)
    }
  }

}
