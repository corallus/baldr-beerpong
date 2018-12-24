import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../shared/match';
import { MatchService } from '../shared/match.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss'],
})
export class MatchListComponent implements OnInit {
  matches: Observable<Match[]>;
  @Input() ownLeague: boolean;

  constructor(private service: MatchService) { }

  ngOnInit() {
    this.matches = this.service.list();
  }

}
