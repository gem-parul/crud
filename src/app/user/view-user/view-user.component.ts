import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'code',
    'designation',
    'email',
    'manager',
    'action',
  ];
  isEditing=false;
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private _userService: UserService,private router:Router, private _coreService:CoreService) {}

  ngOnInit(): void {
    this.getUserList();
  }
  navigateToAddUser(pageName: string): void {
    this.router.navigate([`${pageName}`]);
  }
  getUserList() {
    this._userService.getUserList().subscribe({
      next: (resp) => {
        this.dataSource = new MatTableDataSource(resp);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleteUser(id:number){
    this._userService.deleteUser(id).subscribe({
      next:(resp)=>{
        this._coreService.openSnackBar('Employee deleted successfully','done');
        this.getUserList();
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
  editUser(id: number) {
    this.router.navigate(['/add-user/', id]);
  }

}
