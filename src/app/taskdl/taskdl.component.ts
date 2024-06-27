import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskdl',
  templateUrl: './taskdl.component.html',
  styleUrl: './taskdl.component.css'
})
export class TaskdlComponent {
  public senddata: any=[];
  ngOnInit(): void {
    this.getmethod();
  }
  constructor (private http:HttpClient,private router:Router){}
  getmethod(){
    this.http.get('https://localhost:44319/api/Task').subscribe((data) => {
    console.log(data);
    this.senddata = data;
  });
  }
 
  public deleteMethod(id: any) {
    const url = `https://localhost:44319/api/Task?taskid=${id}`;
    this.http.delete(url).subscribe(
      (data) => {
        console.log('Deleted Successfully:', data);
      },
      (error) => {
        console.error('Failed to Delete:', error);
      }
    );
    window.location.reload();
  }
  
  navigateTo(route: string){
    if(this.router.url==='/'+route){
      this.router.navigate(['/']);
    } else{
      this.router.navigate([route]);
    }
  }
}
