import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from './taskdetails/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskserviceService {

  constructor(private http: HttpClient) { }
  

} 
