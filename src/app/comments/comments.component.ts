import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(
     private http: HttpClient,
     public router: Router,
    public activatedRoute:ActivatedRoute
    ) { }
    // comments:comment[]=[];
  ngOnInit(): void {
  //   this.activatedRoute.params.subscribe(({ taskid }) => {
  //     this.getComment(taskid).subscribe((data) => {
  //         this.comments = data;
  //       // console.log(JSON.stringify(this.datas));

  //     });

  // });
    // this.activatedRoute.params.subscribe(({taskid})=>{
    //   console.log(taskid); 
    //   this.getComment(taskid).subscribe((data)=>{this.comments=data})
    // });
  }

  // getComment(id:string) :Observable<any>{
  //   return this.http.get("http://localhost:8080/engine-rest/task/"+id+"/comment");
  // }
  
}     



