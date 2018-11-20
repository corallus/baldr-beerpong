import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LeagueService } from '../shared/league.service';

@Component({
  selector: 'app-league-form',
  templateUrl: './league-form.component.html',
  styleUrls: ['./league-form.component.scss']
})
export class LeagueFormComponent implements OnInit {
  path: string = 'leagues';
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    kfactor: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    const id: string = this.route.snapshot.params['id'];
    if (id) {
      this.path += '/';
      this.path += id;
    }
  }

  stateChange(state: string) {
    console.log(state);
  }

  onSubmit() {
    this.form.reset();
  }

}
