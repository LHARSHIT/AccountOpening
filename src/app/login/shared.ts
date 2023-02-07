import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class SharedDataService {
    private sharedData = new Subject<string>();
  
    setData(data: string) {
      this.sharedData.next(data);
    }
  
    getData() {
      return this.sharedData.asObservable();
    }
  }