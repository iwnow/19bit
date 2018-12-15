import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WalletComponent implements OnInit {
  @ViewChild('errorTmpl')
  seedTmpl: TemplateRef<any>;

  info = null;
  transferForm: FormGroup;

  constructor(
    public cdr: ChangeDetectorRef,
    private fb: FormBuilder,
    public snackBar: MatSnackBar,
  ) { }

  async ngOnInit() {
    this.transferForm = this.fb.group({
      address: ['', Validators.required],
      amount: [0, Validators.required],
      fee: [1, Validators.required],
    });
    await this.refresh();
  }

  async refresh() {
    try {
      console.log(this.info);
      this.cdr.detectChanges();
    } catch (e) {
      console.error(e);
    }
  }

  async send() {
    // try {
    //   const transferData: TransferData = {
    //     accPubKey: 'Ac7jFxBokKyJtdnZFb41QoYEW3g99EN4s9TDHpwbjmHk',
    //     fee: 1,
    //     change: 1,
    //     timestamp: Date.now(),
    //     recipient: '42bkLVene8CusBXo2S28fvjUruLUNEeEwfLCeXu65dEXE1snKm',
    //     amount: 3,
    //     useBoxes: []
    //   };
    //   transferData.recipient = this.transferForm.get('address').value;
    //   transferData.accPubKey = this.xkeys.getPublicKey();
    //   transferData.amount = this.transferForm.get('amount').value;
    //   transferData.fee = this.transferForm.get('fee').value;

    //   const pk = await this.xkeys.getPrivateKeyBySecret('1901');
    //   await this.walletSrv.transfer(transferData, pk);
    //   await this.refresh();
    // } catch (e) {
    //   this.snackBar.open(`Error: ${e || 'error :( '}`, 'OK', {
    //     duration: 3000
    //   });
    // }
  }

}
