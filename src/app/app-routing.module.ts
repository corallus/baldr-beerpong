import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeaguesListComponent } from './leagues/leagues-list/leagues-list.component';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { LeagueFormComponent } from './leagues/league-form/league-form.component';

const routes: Routes = [
  {
    path: '',
    component: LeaguesListComponent,
    data: { title: 'Leagues' },
    pathMatch: 'full'
  },
  {
    path: 'league/add',
    component: LeagueFormComponent,
    data: { title: 'Add League' }
  },
  {
    path: 'league/:id',
    component: LeagueDetailComponent,
    data: { title: 'League Details' }
  },
  {
    path: 'league/:id/edit',
    component: LeagueFormComponent,
    data: { title: 'Edit League' }
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
