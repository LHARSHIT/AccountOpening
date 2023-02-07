import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  
  referenceNo: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.referenceNo = this.route.snapshot.paramMap.get('referenceNo');
   }
}

// constructor(private router: ActivatedRoute) { }
  // referenceNumber: number;
  // ngOnInit(): void {
  //   this.router.queryParams.subscribe(params => {
  //     this.referenceNumber = params['referenceNumber'];
  // });
  // }