import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  userForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private router: Router,
    public route: ActivatedRoute,
    private _coreService: CoreService
  ) {
    this.userForm = this._fb.group({
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
      designation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)],],
      email: [ '', [ Validators.required,Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),]],
      manager: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
    });

    this.route.params.subscribe((params) => {
      const userId = params['id'];
      if (userId) {
        this.loadUserData(userId);
      }
    });
  }
  loadUserData(userId: number) {
    this._userService.getUserById(userId).subscribe({
      next: (userData: any) => {
        this.userForm.patchValue(userData);
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }
  navigateToView(): void {
    this.router.navigate(['']);
  }
  onFormSubmit() {
    if (this.userForm.valid) {
      const userId = this.route.snapshot.params['id'];
      if (userId) {
        this._userService.updateUser(userId, this.userForm.value).subscribe({
          next: (resp: any) => {
            this._coreService.openSnackBar('Employee updated successfully', 'done');
            this.navigateToView();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      } else {

        this._userService.addUser(this.userForm.value).subscribe({
          next: (resp: any) => {
            this._coreService.openSnackBar('Employee added successfully', 'Done');
            this.navigateToView();
          },
          error: (err: any) => {
            console.error(err);
          },
        });
      }
    }
  }

  onlyAlphabet(event: any) {
    if (
      (event.charCode >= 65 && event.charCode <= 90) ||
      (event.charCode >= 97 && event.charCode <= 122) ||
      event.charCode === 32
    ) {
      return true;
    }
    return false;
  }
}
