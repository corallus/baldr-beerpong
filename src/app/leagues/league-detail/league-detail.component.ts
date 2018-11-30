import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { League } from '../shared/league'
import { LeagueService } from '../shared/league.service'
import { MatchService } from '../../matches/shared/match.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { PlayerService } from '../../players/shared/player.service';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss'],
  providers: [MatchService, PlayerService]
})
export class LeagueDetailComponent implements OnInit, OnDestroy {
  league: Observable<League>;

  constructor(private route: ActivatedRoute, private service: LeagueService) { }

  ngOnInit() {
    this.league = this.service.get(this.route.snapshot.params['id']);
  }

  ngOnDestroy() {
    this.service.document = null;
    console.log('leagueDetailComponent destroyed');
  }
}
