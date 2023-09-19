import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './user/add-user/add-user.component';
import { ViewUserComponent } from './user/view-user/view-user.component';

const routes: Routes = [
  {
    path: '',
    component: ViewUserComponent,
  },
  {
    path: 'add-user',
    component: AddUserComponent,
  },
  {
    path: 'add-user/:id',
    component: AddUserComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
