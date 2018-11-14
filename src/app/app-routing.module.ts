import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'leagues',
    component: LeaguesListComponent,
    data: { title: 'Leagues' }
  },
  {
    path: 'league-details/:id',
    component: LeagueDetailComponent,
    data: { title: 'League Details' }
  },
  {
    path: 'league-form/:id',
    component: LeagueFormComponent,
    data: { title: 'Edit League' }
  },
  { path: '',
    redirectTo: '/leagues',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
