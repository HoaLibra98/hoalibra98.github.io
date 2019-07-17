import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenServiceService } from '../Core/Services/authen-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  msg = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticateService: AuthenServiceService
  ) { }

  ngOnInit() {
    this.initialLoginForm();
    // logout current user

    this.authenticateService.LogOut();
  }

  initialLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  // sự kiện khi onSubmit
  onLogin() {
    this.submitted = true;
    this.authenticateService.login(
      this.f.username.value, this.f.password.value);

    this.authenticateService.CurrentUser.subscribe(
      (value) => {
        if (value) {
          this.router.navigate(['dashboard']);
        } else {
          this.msg = 'login fail';
        }
      }
    );
  }



}
