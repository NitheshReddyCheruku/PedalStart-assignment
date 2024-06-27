import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { EdittaskComponent } from './edittask/edittask.component';
import { TaskdlComponent } from './taskdl/taskdl.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [
  {path:'addtask',component:AddtaskComponent},
  {path:'taskdl',component:TaskdlComponent},
  {path:'edittask/:taskid',component:EdittaskComponent},
  {path:'viewtask/:taskid',component:ViewtaskComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
