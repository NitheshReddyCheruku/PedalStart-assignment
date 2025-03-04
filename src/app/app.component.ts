import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private router:Router){} 
  navigateTo(route: string){
    if(this.router.url==='/'+route){
      this.router.navigate(['/']);
    } else{
      this.router.navigate([route]);
    }
  }

}
