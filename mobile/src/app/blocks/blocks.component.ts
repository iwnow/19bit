import { Component, OnInit, OnDestroy } from '@angular/core';
import { BlocksService, BlockModel } from '../services/blocks.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blocks',
  templateUrl: './blocks.component.html',
  styleUrls: ['./blocks.component.scss']
})
export class BlocksComponent implements OnInit, OnDestroy {
  dataBlocks: BlockModel[] = [];
  error = '';
  interval;

  constructor(
    public blocks: BlocksService,
    public router: Router
  ) { }

  async ngOnInit() {
    await this.refresh(10);
    this.interval = setInterval(async _ => {
      await this.refresh(10);
    }, 60000)
  }

  async refresh(n: number) {
    this.error = '';
    try {
      this.dataBlocks = await this.blocks.getBlocks(n);
      this.dataBlocks = this.dataBlocks.sort((a, b) => b.height - a.height);
      console.log(this.dataBlocks);
    } catch (e) {
      console.error(e);
      this.error = e && e.message || e && e.ToString() || ' network error';
    }
  }

  clickBlock(block) {
    this.blocks.clickedBlock = block;
    this.router.navigateByUrl(`/blocks/${block.id}`);
  }

  getDate(ts) {
    return new Date(ts);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}
