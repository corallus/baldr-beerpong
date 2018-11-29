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
export class LeagueDetailComponent implements OnInit {
  leagueObs: Observable<League>;
  document: AngularFirestoreDocument<League>;

  constructor(
    private route: ActivatedRoute, 
    private playerService: PlayerService, 
    private matchService: MatchService, 
    private service: LeagueService) { }

  ngOnInit() {
    this.document = this.service.get(this.route.snapshot.params['id']);
    this.matchService.init(this.document);
    this.playerService.init(this.document);
    this.leagueObs = this.document.valueChanges();
  }
}
