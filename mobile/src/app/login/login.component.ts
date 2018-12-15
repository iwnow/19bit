import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('seedTmpl')
  seedTmpl: TemplateRef<any>;

  loginForm: FormGroup;
  ph: string;
  label: string;
  error = null;

  get signUp() {
    return this.loginForm.get('signUp');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
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
        this.label = v ? 'SignIn' : 'SignUp';
      });
    this.auth.isAuth.subscribe(auth => {
      auth && this.router.navigateByUrl('/');
    })
  }

  ngAfterViewInit() {
  }

  onLogin() {
    // this.error = null;
    // try {
    //   if (!this.signUp.value && this.loginForm.controls.password.valid) {
    //     const seed = await this.auth.signUp(this.loginForm.controls.password.value);
    //     this.dialog.open(this.seedTmpl, {
    //       data: seed,
    //     })
    //   } else if (this.signUp.value && this.loginForm.valid) {
    //     await this.auth.signIn(
    //       this.loginForm.controls.password.value,
    //       this.loginForm.controls.privateKey.value
    //     );
    //   }
    // } catch (e) {
    //   this.error = e;
    //   this.snackBar.open(`Error: ${e || 'seed is not valid '}`, 'OK', {
    //     duration: 3000
    //   });
    // }
    return this.auth.signIn();
  }

}
