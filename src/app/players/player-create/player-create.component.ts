import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PlayerService } from '../shared/player.service';
import { Player } from '../shared/player';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.scss'],
})
export class PlayerCreateComponent implements OnInit {

  initialFormValues: Player;

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
    this.initialFormValues = this.form.value;
  }

  stateChange(state: string) {
    console.log(state);
  }

  onSubmit() {
    this.service.create(this.form.value)
    this.form.reset();
    this.form.patchValue(this.initialFormValues);
  }
}
