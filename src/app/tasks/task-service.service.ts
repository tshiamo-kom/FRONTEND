import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServiceService {

  private taskdisplay: { task: string, description: string, status: string }[] = [];
  private updatedtaskdisplay = new Subject<{ task: string, description: string, status: string }[]>();
  
  constructor(private http: HttpClient) { }

  addtask_service(pid: string, pname: string, pstatus: string) {
    this.http.post<{ message: string, task: any }>('https://localhost:3000/api/tasks', { id: pid, name: pname, status: pstatus })
    .subscribe((thetask) => {
      this.taskdisplay.push(thetask.task);
      this.updatedtaskdisplay.next([...this.taskdisplay]);
    })
  }

  gettask_service() {
    this.http.get<{ message: string, task: any }>('https://localhost:3000/api/tasks')
    .subscribe((thetask) => {
      this.taskdisplay = thetask.task
      this.updatedtaskdisplay.next([...this.taskdisplay]);
    })
  }

  deletetask_service(task: string) {
    this.http.delete('https:/localhost:3000/api/tasks/' + task)
    .subscribe(() => {
      const updatedtaskdeleted = this.taskdisplay.filter(taskItem => taskItem.task !== task);
      this.taskdisplay = updatedtaskdeleted;
      this.updatedtaskdisplay.next([...this.taskdisplay]);
    })
  }
  

  getUpdateListener() {
    return this.updatedtaskdisplay.asObservable();
  }
}
