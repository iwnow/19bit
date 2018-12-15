import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(readonly auth: AuthService) { }

  get pubKey() {
    return this.auth.getUserInfo().publicKey;
  }

  get address() {
    return this.auth.getUserInfo().address;
  }

  ngOnInit() {
  }

}
