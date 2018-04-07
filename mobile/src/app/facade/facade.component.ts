import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { XkeyService } from '../services/xkey.service';
import { AuthService } from '../services/auth.service';

import {core} from '../core';

@Component({
  selector: 'app-facade',
  templateUrl: './facade.component.html',
  styleUrls: ['./facade.component.scss']
})
export class FacadeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('snav')
  sideNav: MatSidenav;

  private _mobileQueryListener: () => void;

  mobileQuery: MediaQueryList;
  
  constructor(
    public cdr: ChangeDetectorRef,
    public media: MediaMatcher,
    public xkey: XkeyService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    window['__facade'] = this;
    window['__core'] = core;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (!this.mobileQuery.matches)
        this.sideNav.open();
      
    });
  }

}
