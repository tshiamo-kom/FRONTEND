import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TaskServiceService } from '../task-service.service'; // Make sure the path is correct

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent {

  constructor(public taskService: TaskServiceService) { }

  onaddtask(taskform: NgForm) {
    if (taskform.invalid) {
      alert('Invalid input');
      return;
    }
    alert(taskform.value.task + '\n' + taskform.value.description + '\n' + taskform.value.status);
    
    // Pass three arguments to the addtask_service function
    this.taskService.addtask_service(taskform.value.task, taskform.value.description, taskform.value.status);
  }
}
