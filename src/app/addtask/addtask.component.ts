import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { title } from 'process';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css'
})
export class AddtaskComponent {
  constructor(private http:HttpClient) { }
  @Input() stud: any;
  taskid:any;
   title:any;
   description:any ;
   due_date:any;
 
   ngOnInit(){
 
   }
   poststud(){
    const header = new HttpHeaders({
      contentType: 'application/json'
    });
     var val={
       taskid:this.taskid,
       title:this.title,
       description:this.description,
       due_date:this.due_date
     }
     this.http.post('https://localhost:44319/api/Task',val,{headers:header}).subscribe(data=>{
       alert(data+" "+val.taskid)
     })
   }

   
 
}
