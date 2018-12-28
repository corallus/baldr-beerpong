import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeagueDetailComponent } from './leagues/league-detail/league-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { title: 'Dashboard' },
    pathMatch: 'full'
  },
  {
    path: 'league/:id',
    component: LeagueDetailComponent,
    data: { title: 'League Details' }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
