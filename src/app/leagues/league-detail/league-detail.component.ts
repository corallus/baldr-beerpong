import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { League, Match, Player } from '../shared/league'
import { LeagueService } from '../shared/league.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {
  public leagueObs: Observable<League>;
  public leagues: Observable<League[]>;
  public matches: Observable<Match[]>;
  public players: Observable<Player[]>;

  path: string = 'leagues';

  matchPath: string;

  matchForm = new FormGroup({
    winner: new FormControl('', [
      Validators.required
    ]),
    loser: new FormControl('', [
      Validators.required
    ]),
  });

  playerPath: string;

  playerForm = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private route: ActivatedRoute, private service: LeagueService, private router: Router) { }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    this.matchPath = this.path + '/' + id + '/matches';
    this.playerPath = this.path + '/' + id + '/players';
    this.leagueObs = this.service.get(this.route.snapshot.params['id']);
    this.matches = this.service.get_matches();
    this.players = this.service.get_players();
  }

  stateChange(state: string) {
    console.log(state);
  }

}
