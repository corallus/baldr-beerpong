import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerCreateComponent } from './player-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { PlayerService } from '../shared/player.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/core/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';

describe('PlayerCreateComponent', () => {
  let component: PlayerCreateComponent;
  let fixture: ComponentFixture<PlayerCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
        RouterTestingModule,
        ReactiveFormsModule,
        MatInputModule,
      ],
      declarations: [ PlayerCreateComponent ],
      providers: [
        AngularFirestore, AngularFireAuth, AuthService, PlayerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
