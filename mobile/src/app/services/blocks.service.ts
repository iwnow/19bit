import { Injectable } from '@angular/core';
import {core} from '../core';

export interface BlockModel {
  difficulty: number;
  hash: string;
  height: number;
  id: string;
  parentId: string;
  stateRoot: string;
  timestamp: number;
  txRoot: string;
}

export interface TxModel {
      directives: {
        typeId: number,
        verboseType: string,
        height: string,
        idx: number
      }[],
      timestamp: number,
      signature: string
      id: string,
      unlockers: {
        boxId: string,
        proof: string
      }[],
      proposition: string,
      fee: number
}

@Injectable()
export class BlocksService {
  clickedBlock: BlockModel;

  constructor(
  ) { }

  async getBlocks(n: number) {
    const res = await core.getNTransactions(n);
    return res.data as BlockModel[];
  }

  async getTransactions(blockId) {
    const res = await core.getTransactionHistoryByBlockId(blockId);
    return res.data as TxModel[];
  }

}
