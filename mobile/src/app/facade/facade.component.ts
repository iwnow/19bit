import { Component, OnInit, ChangeDetectorRef, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material';
import { AuthService } from '../services/auth.service';

import { Router } from '@angular/router';

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
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
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
