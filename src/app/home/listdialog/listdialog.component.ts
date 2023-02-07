import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Taskdetails } from '../taskdetails/Taskdetails';
import { Tasks } from '../tasklist/Tasks';
import { User } from './User';

@Component({
  selector: 'app-listdialog',
  templateUrl: './listdialog.component.html',
  styleUrls: ['./listdialog.component.css']
})
export class ListdialogComponent {

users:any=[];
selectedUser : any;
msg:string; 
tasks:Tasks
taskId: string;
constructor(
  public dialogRef: MatDialogRef<ListdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,private activatedRoute: ActivatedRoute){
      this.taskId = data.taskId;
}
ngOnInit(): void {
   
    console.log(this.taskId)
  
  this.loadusersbygroupid();
}


closeDialog():void{
  this.dialogRef.close();
}


loadusersbygroupid(){
this.getUsersById('Mangerlist').subscribe((data)=>{
console.log('load Users By groups');
console.log(data);
this.users=data;
console.log(this.users);
this.users.forEach(user => {
  console.log(user.id);
  console.log(user.email);
  console.log(user.firstName);
});

});
}


getUsersById(groupId:string){
  return this.http.get("http://localhost:8080/account/users/"+groupId);
}

onUserSelectionChange(event) {
  this.selectedUser = event.target.value;
  console.log(this.selectedUser);
}

selectedUserEmail:string;
  assignTask() { 
          this.assign(this.taskId,this.selectedUserEmail).subscribe(
          (resp)=>{
            console.log(this.selectedUserEmail)
            console.log('Task assigned successfully to:', this.selectedUserEmail);
            this.dialogRef.close();
          }
        )
  }
  assigneeObj : any ={};
  assign(id:string,assignee:string): Observable<any>{
     this.assigneeObj.userId=assignee;
     console.log(this.assigneeObj);
    return this.http.post("http://localhost:8080/engine-rest/task/"+id+"/assignee",this.assigneeObj);
  }
}
