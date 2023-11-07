import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { TaskServiceService } from "../task-service.service";

@Component({
  selector: 'app-task-display',
  templateUrl: './task-display.component.html',
  styleUrls: ['./task-display.component.css']
})
export class TaskDisplayComponent implements OnInit{

  tasks:{task:string, description:string, status:string }[] = [];

  constructor(public taskservice: TaskServiceService) { }

  private tasksubscription!: Subscription;

  ngOnInit() {
    this.taskservice.gettask_service();
    this.tasksubscription = this.taskservice.getUpdateListener()
  .subscribe((tasks:{task:string,description:string,status:string}[])=>
    {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(){
    this.tasksubscription.unsubscribe();
  }

  ondelete(task: string){
    this.taskservice.deletetask_service(task)
  }
}