import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/Services/auth.service';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2'

declare let alertify: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();

  loginForm = new FormGroup({
    userName: new FormControl("", [Validators.required, Validators.maxLength(20)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(20)])
  });

  constructor(private userService: UserService, private router: Router, private authService: AuthService) { 

  }

  ngOnInit(): void {

  }

  logInn(){

    if(this.loginForm.touched && this.loginForm.valid){

      this.user.UserName = this.loginForm.get("userName")?.value;
      this.user.Password = this.loginForm.get("password")?.value;

      this.authService.validateUser(this.user).subscribe((response:any) =>{
        if(response.status == 1){
          this.authService.generateToken(this.user).subscribe((tokenResponse:any)=>{
            if(tokenResponse.status == 1){
              localStorage.setItem("token", tokenResponse.data);
              alertify.success("Welcome!");
              this.router.navigate(['/menu']);
            }
          });
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'User name or password is not valid.',
            footer: ''
          });
        }
      });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'User name or password is not valid.',
        footer: ''
      });
    }

  }
}
