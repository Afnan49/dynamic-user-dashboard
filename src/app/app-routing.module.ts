import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserlistComponent } from './components/userlist/userlist.component';
import { UserdetailsComponent } from './components/userdetails/userdetails.component';

const routes: Routes = [
  { path: '', component: UserlistComponent, title: 'users' },
  { path: 'user', component: UserlistComponent, title: 'users' },
  { path: 'userdetails/:id', component: UserdetailsComponent, title: 'user' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
