
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { comment } from './comments/comment';
// import { CommentsComponent } from './comments/comments.component';
// import { ConfirmComponent } from './confirm/confirm.component';
// import { DialogComponent } from './dialog/dialog.component';
// import { FrontdeskComponent } from './frontdesk/frontdesk.component';
//  import { HomeComponent } from './home/home.component';
// import { ListdialogComponent } from './listdialog/listdialog.component';
import { LoginComponent } from './login/login.component';
// import { NewformComponent } from './newform/newform.component';
// import { TaskdetailsComponent } from './taskdetails/taskdetails.component';
// import { TasklistComponent } from './tasklist/tasklist.component';
// import { UpdateComponent } from './update/update.component';

const routes: Routes = [
{path:'',component:LoginComponent},
{ path: 'home',
 loadChildren: () => import('./home/home.module').then(m => m.HomeModule) }
// {path:'home',component:HomeComponent},
// {path:'newform',component:NewformComponent},
// {path:'confirm/:referenceNo',component:ConfirmComponent},
// {path:'tasklist',component:TasklistComponent},     
// {path:'taskdetails/:taskid',component:TaskdetailsComponent},
// {path:'comments/:taskid',component:CommentsComponent},
// {path:'update/:taskid',component:UpdateComponent},
// {path:'frontdesk/:taskid',component:FrontdeskComponent},
// {path:'dialog',component:DialogComponent},
// {path:'listdialog/:taskid',component:ListdialogComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
