import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlocksService, BlockModel, TxModel } from '../services/blocks.service';


@Component({
  selector: 'app-block-detail',
  templateUrl: './block-detail.component.html',
  styleUrls: ['./block-detail.component.scss']
})
export class BlockDetailComponent implements OnInit, OnDestroy {
  blockId = 0;
  transactions: TxModel[] = [];
  error = '';
  block//: BlockModel;

  constructor(
    public router: ActivatedRoute, 
    public blocks: BlocksService
  ) { }

  async ngOnInit() {
    this.blockId = this.router.snapshot.params['id'];
    this.block = this.blocks.clickedBlock;
    await this.refresh(this.blockId)
  }

  async refresh(blockId) {
    try {
      this.transactions = await this.blocks.getTransactions(blockId);
      console.log(this.transactions);
    } catch (e) {
      console.error(e);
      this.error = e && e.message || e;
    }
  }

  ngOnDestroy() {
    this.blocks.clickedBlock = null;
  }

  clickTx(tx) {

  }

  getDate(ts) {
    return new Date(ts);
  }

}
