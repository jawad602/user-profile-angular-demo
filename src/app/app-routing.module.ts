import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './components/profile/profile.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { AddUserComponent } from './components/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user/all'
},
{
    path: 'user/all',
    component: AllUsersComponent
},
{
    path: 'profile/:id',
    component: ProfileComponent
},
{
    path: 'user/add',
    component: AddUserComponent
},
{
    path: 'user/edit/:id',
    component: AddUserComponent
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
