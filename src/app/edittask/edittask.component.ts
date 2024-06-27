import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrl: './edittask.component.css'
})
export class EdittaskComponent {
  stud:any;
  
  studentId:any;
  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(){
    this.studentId=this.route.snapshot.paramMap.get('taskid');
    this.http.get(`https://localhost:44319/api/Task/Getbyid?taskid=${this.studentId}`).subscribe((data)=>{
      this.stud=data;
      this.stud.due_date = new Date(this.stud.due_date).toISOString().split('T')[0];
      console.log(this.stud.due_date);
    }

    )
  }
  convertDateToIsoFormat(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
  }
  Editstud(){
    const header = new HttpHeaders({
      contentType: 'application/json'
    });
    var val = {
      taskid:this.stud.taskid,
      title: this.stud.title,
      description: this.stud.description,
      due_date: this.stud.due_date
    }
    console.log(val);
    this.http.put(`https://localhost:44319/api/Task`,val).subscribe(data => {
      console.log(data);
    });
  }
}
