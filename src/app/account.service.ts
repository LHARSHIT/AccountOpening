import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Account } from './Account';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AccountService {

  account:Account[]=[];
  // url:string="http://localhost:8080"
  constructor(private h:HttpClient) { }
  addAccount(account:Account):Observable<any>
  {
   return this.h.post("http://localhost:8080/account/new-account",account);
  }
  getReferenceNo(referenceNo:string) {
    return this.h.get(`http://localhost:8080/process-instance/${referenceNo}`);
  }

  private taskChanged = new Subject<void>();

  taskChanged$ = this.taskChanged.asObservable();

  notifyTaskChanged() {
    this.taskChanged.next();
  }
}
