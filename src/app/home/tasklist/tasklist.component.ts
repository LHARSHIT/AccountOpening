import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Tasks } from './Tasks';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ListdialogComponent } from '../listdialog/listdialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { User } from '../listdialog/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AccountService } from 'src/app/account.service';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
  
})
export class TasklistComponent implements OnInit {

  
  constructor(private s:AccountService,private h:HttpClient,public activatedRoute:ActivatedRoute,public dialog: MatDialog) { 
}

tasks:Tasks[]=[]; 
msg:string;
displayedColumns: string[] = ['id', 'name', 'created','dueDate','action'];
dataSource : any=[];
assignedDisplayedColumns:string[]=['id','name','created','assigned']
assignedDataSource:any=[];
completedDisplayedColumns:string[]=['id','name','created','assigned']
completedDataSource:any=[];

@ViewChild(MatPaginator) paginator: MatPaginator;


ngOnInit(): void {
  this.s.taskChanged$.subscribe(() => {
    this.getTasks();
  });
  this.getTasks();
}


onTabChange(event: MatTabChangeEvent) {
  switch (event.tab.textLabel) {
    case 'Unassigned':
      this.getTasks();
      break;
    case 'Assigned':
      this.getTasks();
      break;
    case 'Completed':
      this.getcompletedtasks();
      break;
  }
}

isPresent:boolean = false; 

getTasks():void{
this.tasks=[];
 let assignedTask:any[]=[];
 let unAssignedTask:any[]=[];
  this.getAllTasks().subscribe(
    (data)=>{
      data.forEach(element=>{
      if (element.assignee!=null){
      assignedTask.push(element);
      console.log(JSON.stringify(data))
      this.assignedDataSource=new MatTableDataSource<Tasks>(assignedTask);
      this.assignedDataSource.paginator=this.paginator;
      this.isPresent = true;
      }else{
       unAssignedTask.push(element);
       console.log(JSON.stringify(data))
       this.dataSource=new MatTableDataSource<Tasks>(unAssignedTask);
      this.dataSource.paginator=this.paginator;
      this.isPresent = true;
      }
    });
   
    }
  )
}
getAllTasks():Observable<any>
{
  //using camunda api
    return this.h.get("http://localhost:8080/engine-rest/task");
  //using java api
  //  return this.h.get("http://localhost:8080/account/tasks");
  }
  
  openDialog(taskId: string){
    const dialogRef = this.dialog.open(ListdialogComponent, {
      width: '40%',
      height:'40%',
      data:{taskId: taskId}
    });
    dialogRef.afterClosed().subscribe(result =>
      {
        this.getTasks();
      })
  }

  finishedTaskList:any;
  getcompletedtasks(){
    this.getFinishedTasks().subscribe(data => {
      console.log(data);
      this.finishedTaskList=data;
      if(this.finishedTaskList.length==0){
        console.log("No Data Found");
      }
      this.completedDataSource=new MatTableDataSource<Tasks>(this.finishedTaskList);
      this.completedDataSource.paginator=this.paginator;
      this.isPresent = true;
  });

  }
  getFinishedTasks() {
    return this.h.get('http://localhost:8080/engine-rest/history/task?finished=true');
}

// dueDate: Date = new Date('2023-02-06T11:01:13');
// [ngClass]="{'past-due': isPastDue(dueDate)}"
//   isPastDue(dueDate: Date): boolean {
//     return dueDate.getTime() < new Date().getTime();
//   }
     
}




