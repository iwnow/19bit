import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import * as ptjs from 'particles.js';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  ph: string;
  label: string;

  get signUp() {
    return this.loginForm.get('signUp');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      privateKey: ['', Validators.required],
      signUp: false
    });
    this.signUp.valueChanges
      .pipe(startWith(false))
      .subscribe(v => {
        this.ph = v ? 'Set password to protect your key 🔒' : 'Set password and we generate keys for you 🔒';
        this.label = v ? 'SignUp' : 'SignIn';
      })
    this.auth.isAuth.subscribe(auth => {
      auth && this.router.navigateByUrl('/');
    })
  }

  ngAfterViewInit() {
  }

  async onLogin() {
    if (!this.signUp.value && this.loginForm.controls.password.valid) {
      await this.auth.signUp(this.loginForm.controls.password.value);
    } else if (this.signUp.value && this.loginForm.valid) {
      await this.auth.signIn(
        this.loginForm.controls.password.value,
        this.loginForm.controls.privateKey.value
      );
    }
  }

}
