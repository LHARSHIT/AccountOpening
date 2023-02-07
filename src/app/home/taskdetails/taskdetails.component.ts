import { getLocaleTimeFormat } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component,  OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account.service';

import { DialogComponent } from '../dialog/dialog.component';
import { ListdialogComponent } from '../listdialog/listdialog.component';
import { Tasks } from '../tasklist/Tasks';
import { comment } from './comment';
import { Task } from './Task';
import { Taskdetails } from './Taskdetails';
import { UTask } from './UTask';



@Component({
  selector: 'app-taskdetails',
  templateUrl: './taskdetails.component.html',
  styleUrls: ['./taskdetails.component.css']
})
export class TaskdetailsComponent implements OnInit {
  constructor(
    private s:AccountService,
    private http: HttpClient,
    public router: Router,
    public activatedRoute:ActivatedRoute,
    public dialog: MatDialog
  ) { }

    comments:comment[]=[];
     tasks:Taskdetails;
     task:Task;
     msg:string;
     commentMessage:string;
     utask: UTask;
      taskss:Tasks[]=[];

    ngOnInit(): void {
     this.activatedRoute.params.subscribe(({taskid}) => { 
        this.getTaskbyId(taskid).subscribe((data)=>{this.tasks=data}),
        this.getAllVariables(taskid).subscribe(
          (data)=>{this.task=data;console.log(JSON.stringify(data))
          console.log(this.task) }
        )
      });
    }
    getAllVariables(id:string): Observable<any>{
         return this.http.get("http://localhost:8080/engine-rest/task/"+id+"/variables",);
    }

    getClaim(){
      this.activatedRoute.params.subscribe(
        ({taskid})=>{this.claim(taskid,"demo").subscribe(
          (data)=>{
            console.log(data)
            this.msg="Successfully Claimed"
            window.alert(this.msg)
          }
        )}
      )
    }
  

   claim(id:string,userId:string): Observable<any>{
    return this.http.post("http://localhost:8080/engine-rest/task/"+id+"/claim",{userId});

   }
 
   getTaskbyId(id:string): Observable<any>{
    return this.http.get("http://localhost:8080/engine-rest/task/"+id);

   }

   sendComment(){
    this.activatedRoute.params.subscribe(
      ({taskid})=>{this.comment(taskid,this.commentMessage).subscribe(
        (data)=>{
          console.log(data)
        }
      )}
    )
   }
   comment(id:string,message:string) :Observable<any>{
     return this.http.post('http://localhost:8080/engine-rest/task/'+id+'/comment/create',{message});
   }
  
getcomments(){
  this.activatedRoute.params.subscribe(({taskid})=>{
      console.log(taskid); 
      this.getComment(taskid).subscribe((data)=>{this.comments=data})
    });
    var x = document.getElementById('SectionName');
    if (x.style.display == 'none') {
        x.style.display = 'block';
    } 
}

   getComment(id:string) :Observable<any>{
      return this.http.get("http://localhost:8080/engine-rest/task/"+id+"/comment");
    }

     openTaskDialog(taskId: string, taskName: string, action: string) {
      const dialogRef = this.dialog.open(DialogComponent, {
          width: '350px',
          data: { taskId: taskId, taskName: taskName, action: action }
      });
  
      dialogRef.afterClosed().subscribe(result =>
        {
          this.s.notifyTaskChanged();
        })
  }

     openDialog(taskId: string){
      const dialogRef = this.dialog.open(ListdialogComponent, {
        width: '40%',
        height:'40%',
        data:{taskId: taskId}
      });
      dialogRef.afterClosed().subscribe(result =>
        {
          this.s.notifyTaskChanged();
        })
    }
}
  
  