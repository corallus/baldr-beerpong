import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../shared/player.service';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss'],
})
export class PlayerCreateComponent implements OnInit {
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required
    ]),
    score: new FormControl(1500, [
      Validators.min(0)
    ]),
  });

  constructor(private service: PlayerService) { }

  ngOnInit() {
  }

  stateChange(state: string) {
    console.log(state);
  }

  onSubmit() {
    this.service.create(this.form.value)
    this.form.reset();
  }
}
