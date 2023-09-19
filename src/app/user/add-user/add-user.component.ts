import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {
  userForm:FormGroup;
  constructor(private _fb:FormBuilder,private _userService:UserService,private router:Router,private route: ActivatedRoute,private _coreService:CoreService){

      // firstName:'',
      // lastName:'',
      // code:'',
      // designation:'',
      // email:'',
      // manager:''
      this.userForm = this._fb.group({
        firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],        lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
        code: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
        designation: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9 ]*$/)]],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]],
        manager: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      });

  }
  navigateToView():void{
    this.router.navigate(['']);
  }
  onFormSubmit():void{
    if(this.userForm.valid){
      this._userService.addUser(this.userForm.value).subscribe({next:(val:any)=>{
        this._coreService.openSnackBar('Employee added successfully','done');
        this.navigateToView();
      },
      error:(err:any)=>{
        console.error(err)
      }
    });
    }
  }
  onlyAlphabet(event: any) {
    if (
      (event.charCode >= 65 && event.charCode <= 90) || // Capital letters (A-Z)
      (event.charCode >= 97 && event.charCode <= 122) || (event.charCode===32)
    ) {
      // Small letters (a-z)
      return true;
    }
    return false;
  }

}
