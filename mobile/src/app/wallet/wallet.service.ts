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

    /*
		USAGE:
		________________

		const payload = {
			accPubKey: 'Ac7jFxBokKyJtdnZFb41QoYEW3g99EN4s9TDHpwbjmHk',
			fee: 1,
			change: 1,
			timestamp: Date.now(),
			recipient: '42bkLVene8CusBXo2S28fvjUruLUNEeEwfLCeXu65dEXE1snKm',
			amount: 3,
			useBoxes: []
		}

		payload.sig = computeSignature(genKeyPair().private, payload)
		________________

	*/
    async transfer(data: TransferData, privateKey?) {
        data.sig = core.computeSignature(privateKey, data);
        return core.transfer(data);
    }
}

export interface TransferData {
    accPubKey: string
    fee: number,
    change: number,
    timestamp: number,
    recipient: string,
    amount: number,
    useBoxes: any[]
    sig?: any;
}