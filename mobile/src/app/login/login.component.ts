import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import * as ptjs from 'particles.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  ph: string;
  label: string;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      key: ['', Validators.required],
      signUp: false
    });
    this.loginForm.get('signUp').valueChanges
    .pipe(
      startWith(false)
    )
    .subscribe(v => {
      this.ph = v ? 'Set password and we generate key for you 🙂' : 'Set you private key 🔑';
      this.label = v ? 'SignUp' : 'SignIn';
    })
  }

  ngAfterViewInit() {
  }

  onLogin() {
  }

}
