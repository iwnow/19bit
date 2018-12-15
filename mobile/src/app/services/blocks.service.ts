import { Injectable } from '@angular/core';

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
    return [];
  }

  async getTransactions(blockId) {
    return [];
  }

}
