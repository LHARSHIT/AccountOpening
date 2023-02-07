import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UTask } from '../taskdetails/UTask';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  utask: UTask;
  
  constructor(private router:Router,
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {action: "", taskId: "", taskName: ""}) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }


  approveTask(taskId: string, taskName: string) {
    this.utask ={...this.utask, taskStatus:"Approved", taskId: taskId, taskName: taskName};
    this.update(this.utask).subscribe((data)=>{
        console.log(data);
    });
}

rejectTask(taskId: string, taskName: string) {
    this.utask ={...this.utask, taskStatus:"Rejected" , taskId: taskId, taskName: taskName};
    this.update(this.utask).subscribe((data)=>{
        console.log(data);
    });
}

update(utask : UTask | undefined) {
    return this.http.put("http://localhost:8080/account/updateTaskStatus", utask,{responseType:'text'});
}

confirmAction(taskId: string, taskName: string, action: string) {
    if (action === "Approve") {
        this.approveTask(taskId, taskName);
    } else if (action === "Reject") {
        this.rejectTask(taskId, taskName);
    }

    this.dialogRef.close(true);
    
}

}
