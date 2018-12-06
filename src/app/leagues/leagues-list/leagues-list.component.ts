import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../shared/league';
import { LeagueService } from '../shared/league.service';

@Component({
  selector: 'app-leagues-list',
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.scss']
})
export class LeaguesListComponent implements OnInit {

  leagues: Observable<League[]>;

  constructor(private service: LeagueService) { }

  ngOnInit() {
    this.leagues = this.service.list();
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.service.delete(id);
    }
  }
}
