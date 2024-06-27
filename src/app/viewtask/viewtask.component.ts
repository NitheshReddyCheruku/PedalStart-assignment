import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrl: './viewtask.component.css'
})
export class ViewtaskComponent {
  stud:any;
  desc:any;
  studentId:any;
  constructor(private route:ActivatedRoute,private http:HttpClient){}
  ngOnInit(){
    this.studentId=this.route.snapshot.paramMap.get('taskid');
    this.http.get(`https://localhost:44319/api/Task/Getbyid?taskid=${this.studentId}`).subscribe((data)=>{
      this.stud=data;
      this.desc=this.stud.description;
      console.log(this.desc);
    }

    )
  }
}
