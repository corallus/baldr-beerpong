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
  MatGridListModule,
  MatCardModule,
  MatFormFieldModule, 
  MatMenuModule,
  MatBadgeModule} from "@angular/material";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaguesListComponent } from './leagues/leagues-list/leagues-list.component';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { LeagueFormComponent } from './leagues/league-form/league-form.component';
import { MatchListComponent } from './matches/match-list/match-list.component';
import { MatchCreateComponent } from './matches/match-create/match-create.component';
import { PlayerCreateComponent } from './players/player-create/player-create.component';
import { PlayerListComponent } from './players/player-list/player-list.component';
import { AuthService } from './core/auth.service';
import { MatchDetailComponent } from './matches/match-list/match-detail/match-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';

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
    DashboardComponent,
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
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    FlexLayoutModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
  }
}
