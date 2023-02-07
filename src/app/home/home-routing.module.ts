import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NewformComponent } from './newform/newform.component';
import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
import { TasklistComponent } from './tasklist/tasklist.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { DialogComponent } from './dialog/dialog.component';
import { HomeComponent } from './home.component';
import { ListdialogComponent } from './listdialog/listdialog.component';
import { WorkListComponent } from './work-list/work-list.component';

const childRoutes: Routes = [
  {path:'home',component:HomeComponent,
  children:[
    { path: 'newform', component: NewformComponent },
    { path: 'confirm/:referenceNo', component: ConfirmComponent },
    { path: 'tasklist', component: TasklistComponent },
    { path: 'taskdetails/:taskid', component: TaskdetailsComponent },
    {path:'dialog',component:DialogComponent},
    {path:'listdialog/:taskid',component:ListdialogComponent},
    {path:'work-list',component:WorkListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
