import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { EdittaskComponent } from './edittask/edittask.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskdlComponent } from './taskdl/taskdl.component';
@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    EdittaskComponent,
    ViewtaskComponent,
    TaskdlComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
