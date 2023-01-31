import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailsComponent } from './components/contact-details/contact-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeopleComponent } from './components/people/people.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent},
  { path: 'contact/:id', component: ContactDetailsComponent},
  { path: 'contacts', component: PeopleComponent},
  { path: '**', redirectTo: '/dashboard'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
