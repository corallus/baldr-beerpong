import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { League } from '../shared/league'
import { LeagueService } from '../shared/league.service'
import { MatchService } from '../../matches/shared/match.service';
import { PlayerService } from '../../players/shared/player.service';
import { AuthService, User } from 'src/app/core/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss'],
  providers: [MatchService, PlayerService]
})
export class LeagueDetailComponent implements OnInit, OnDestroy {
  league$: Observable<League>
  user: User

  constructor(public auth: AuthService, private route: ActivatedRoute, private service: LeagueService) { }

  ngOnInit() {
    this.league$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.set(params.get('id')))
    )
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  ngOnDestroy() {
    this.service.document = null;
    console.log('leagueDetailComponent destroyed');
  }
}
