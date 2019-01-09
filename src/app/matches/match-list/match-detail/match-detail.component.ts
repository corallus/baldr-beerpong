import { Component, Input } from '@angular/core'
import { Match } from '../../shared/match'
import { MatchService } from '../../shared/match.service'
import { Result } from '../../shared/elo'

@Component({
  selector: 'app-match-detail',
  templateUrl: './match-detail.component.html',
  styleUrls: ['./match-detail.component.scss']
})
export class MatchDetailComponent {
  @Input() match: Match
  @Input() ownMatch: boolean

  constructor(private service: MatchService) { }

  delete(match: Match) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.delete(match)
    }
  }

  setResult(result: Result) {
    this.service.updateResult(this.match, result)
  }

}
