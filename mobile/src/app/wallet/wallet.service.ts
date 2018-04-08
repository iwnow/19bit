import {Injectable} from '@angular/core'
import { XkeyService } from '../services/xkey.service';

import {core} from '../core'

@Injectable()
export class WalletService {
    constructor(
        public xkeys: XkeyService
    ) {}

    async getInfo() {
        const res = await core.getWalletInfo(this.xkeys.getAddress());
        return res.data as {
            address: string;
            balance: number;
        };
    }
}