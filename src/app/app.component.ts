import { Component, OnInit,ViewChild } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserService } from './services/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent  {

  // constructor(private _userService:UserService){}
  // ngOnInit(): void {
  //     this.getUserList();
  // }
  // getUserList(){
  //   this._userService.getUserList().subscribe({
  //     next:(resp)=>{
  //       console.log(resp);
  //     },
  //     error:(err)=>{console.log(err)}
  //   })
  // }
}
