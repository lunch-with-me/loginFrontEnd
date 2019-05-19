import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  myForm: FormGroup;
  successMessage: String = '';
  constructor(private _myservice: MyserviceService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute) {
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      oldpassword: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      cnfpass: new FormControl(null, this.passValidator)
    });

  }


  ngOnInit() {
  }

  isValid(controlName) {
    return this.myForm.get(controlName).invalid && this.myForm.get(controlName).touched;
  }



  login() {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._myservice.login(this.myForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            this._router.navigate(['/dash']);
          },
          error => this.successMessage = 'Email and Password does not match'
        );
    }
  }

  passValidator(control: AbstractControl) {
    if (control && (control.value !== null || control.value !== undefined)) {
      const cnfpassValue = control.value;

      const passControl = control.root.get('password');
      if (passControl) {
        const passValue = passControl.value;
        if (passValue !== cnfpassValue || passValue === '') {
          return {
            isError: true
          };
        }
      }
    }

    return null;
  }

  abc() {
    console.log(this.myForm.value);

    if (this.myForm.valid) {
      this._myservice.login(this.myForm.value)
        .subscribe(
          data => {
            console.log(data);
            localStorage.setItem('token', data.toString());
            this._router.navigate(['/dash']);
          },
          error => this.successMessage = 'Email and Password does not match'
        );
    }
  }


}
