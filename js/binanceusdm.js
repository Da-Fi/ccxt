'use strict';

//  ---------------------------------------------------------------------------

const binance = require ('./binance.js');
const { BadRequest } = require ('./base/errors');

//  ---------------------------------------------------------------------------

module.exports = class binanceusdm extends binance {
    describe () {
        return this.deepExtend (super.describe (), {
            'id': 'binanceusdm',
            'name': 'Binance USDⓈ-M',
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/117738721-668c8d80-b205-11eb-8c49-3fad84c4a07f.jpg',
            },
            'has': {
                'fetchPositions': true,
                'fetchIsolatedPositions': true,
                'fetchFundingRate': true,
                'fetchFundingHistory': true,
                'setLeverage': true,
                'setMarginMode': true,
            },
            'options': {
                'defaultType': 'future',
                // https://www.binance.com/en/support/faq/360033162192
                // tier amount, maintenance margin, initial margin
                'leverageBrackets': undefined,
                'marginTypes': {},
            },
        });
    }

    async transferIn (code, amount, params = {}) {
        // transfer from spot wallet to usdm futures wallet
        return await this.futuresTransfer (code, amount, 1, params);
    }

    async transferOut (code, amount, params = {}) {
        // transfer from usdm futures wallet to spot wallet
        return await this.futuresTransfer (code, amount, 2, params);
    }
};
