import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialog } from '@angular/material';
import { WavesService } from '../services/waves.service';

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

  readonly pluginLink = 'https://chrome.google.com/webstore/detail/waves-keeper/lpilbniiabackdjcionkobglmddfbcjo?hl=en-GB';

  get signUp() {
    return this.loginForm.get('signUp');
  }

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public readonly waves: WavesService,
    public cdr: ChangeDetectorRef
  ) {
  }

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
      auth && this.router.navigateByUrl('/').then(() => this.cdr.detectChanges());
    })
  }

  ngAfterViewInit() {
    setTimeout(() => this.cdr.detectChanges(), 1000);
  }

  onLogin() {
    this.auth.signIn().then(() => {
      setTimeout(() => {
        this.cdr.detectChanges();
      });
    });
  }

}
