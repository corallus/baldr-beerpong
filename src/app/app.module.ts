import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatAutocompleteModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatFormFieldModule, 
  MatMenuModule,
  MatBadgeModule} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaguesListComponent } from './leagues/leagues-list/leagues-list.component';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { LeagueFormComponent } from './leagues/league-form/league-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faTrash, faUndo } from '@fortawesome/free-solid-svg-icons';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { MatchCreateComponent } from './matches/match-create/match-create.component';
import { PlayerCreateComponent } from './players/player-create/player-create.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { AuthService } from './core/auth.service';
import { MatchDetailComponent } from './matches/match-list/match-detail/match-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaguesListComponent,
    LeagueDetailComponent,
    LeagueFormComponent,
    MatchListComponent,
    MatchCreateComponent,
    PlayerCreateComponent,
    PlayerListComponent,
    MatchDetailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // imports firebase/app needed for everything
    AngularFirestoreModule.enablePersistence(),
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatBadgeModule,
    MatAutocompleteModule, 
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faPencilAlt, faTrash, faUndo);
  }
}
