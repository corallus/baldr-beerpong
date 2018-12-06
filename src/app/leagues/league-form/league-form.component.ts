import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { League } from '../shared/league';
import { LeagueService } from '../shared/league.service';
import { AngularFirestoreDocument } from '@angular/fire/firestore';
import { tap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss']
})
export class LeagueFormComponent implements OnInit {
  league: Observable<League> = null;

  form = this.fb.group({
    'name': [null, Validators.required],
    'kfactor': [32, Validators.compose([Validators.min(10), Validators.max(32)])],
  });

  constructor(private fb: FormBuilder, private service: LeagueService) { }

  ngOnInit() {
    if (this.service.document) {
      this.service.getLeague().pipe(
        tap(doc => {
          if (doc) {
            this.form.patchValue(doc)
          }
        }),
        take(1)
      )
        .subscribe();
    }
  }

  onSubmit() {
    if (this.service.document) {
      this.service.update(this.form.value)
    } else {
      this.service.add(this.form.value)
      this.form.reset();
    }
  }

}
