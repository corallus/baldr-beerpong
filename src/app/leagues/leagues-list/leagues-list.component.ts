import { Component, OnInit, Input } from '@angular/core'
import { Observable } from 'rxjs'
import { League } from '../shared/league'
import { LeagueService } from '../shared/league.service'
import { AuthService } from 'src/app/core/auth.service'

@Component({
  selector: 'app-leagues-list',
  templateUrl: './leagues-list.component.html',
  styleUrls: ['./leagues-list.component.scss']
})
export class LeaguesListComponent implements OnInit {
  @Input() uid?: string
  leagues: Observable<League[]>

  constructor(public auth: AuthService, public service: LeagueService) { }

  ngOnInit() {
    if (this.uid) {
      this.leagues = this.service.listOwnedLeagues(this.uid)
    } else {
      this.leagues = this.service.list()
    }
  }

  onDelete(id: string) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.delete(id)
    }
  }
}
