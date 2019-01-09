import { Component, OnInit, Input } from '@angular/core'
import { Validators, FormBuilder } from '@angular/forms'
import { League } from '../shared/league'
import { LeagueService } from '../shared/league.service'
import { tap, take } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss']
})
export class LeagueFormComponent implements OnInit {
  @Input() league$?: Observable<League>

  form = this.fb.group({
    'name': [null, Validators.required],
    'kfactor': [32, Validators.compose([Validators.min(10), Validators.max(32)])],
  })

  constructor(private fb: FormBuilder, private service: LeagueService) { }

  ngOnInit() {
    if (this.league$) {
      this.league$.pipe(
        tap(league => {
          if (league) {
            this.form.patchValue(league)
          }
        }),
        take(1)
      )
        .subscribe()
    }
  }

  onSubmit() {
    if (this.league$) {
      this.service.update(this.form.value)
    } else {
      this.service.add(this.form.value)
      this.form.reset()
    }
  }

}
