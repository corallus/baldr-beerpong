import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaguesListComponent } from './leagues/leagues-list/leagues-list.component';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';

const routes: Routes = [
  {
    path: '',
    component: LeaguesListComponent,
    data: { title: 'Leagues' },
    pathMatch: 'full'
  },
  {
    path: 'league/:id',
    component: LeagueDetailComponent,
    data: { title: 'League Details' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
