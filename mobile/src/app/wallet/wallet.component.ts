import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { XkeyService } from '../services/xkey.service';
import { WalletService } from './wallet.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WalletService]
})
export class WalletComponent implements OnInit {
  info = null;
  transferForm: FormGroup;

  constructor(
    public cdr: ChangeDetectorRef,
    public walletSrv: WalletService,
    private fb: FormBuilder,
  ) { }

  async ngOnInit() {
    this.transferForm = this.fb.group({
      address: ['', Validators.required],
      amount: [0, Validators.required],
      fee: [1, Validators.required],
    });
    try {
      this.info = await this.walletSrv.getInfo();
      console.log(this.info);
      this.cdr.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }

  send() {

  }

}
