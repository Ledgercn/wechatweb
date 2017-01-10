/**
 * Created by jojopper on 2017/01/02.
 */

function LedgerDecode(data) {
    var ledgerInfo = {
        id : 0,
        paging_token: '',
        hash: '',
        prev_hash: '',
        sequence : 0,
        trans_count : 0,
        opera_count : 0,
        close_time : '',
        total_coins : '',
        fee_pool : '',
        base_fee : '',
        max_tx_set_size : ''
    };

    if (data == null) {
        return null;
    }
    ledgerInfo.id = data.id;
    ledgerInfo.paging_token = data.paging_token;
    ledgerInfo.hash = data.hash;
    ledgerInfo.prev_hash = data.prev_hash;
    ledgerInfo.sequence = data.sequence;
    ledgerInfo.trans_count = data.transaction_count;
    ledgerInfo.opera_count = data.operation_count;
    ledgerInfo.close_time = data.closed_at;
    ledgerInfo.total_coins = data.total_coins;
    ledgerInfo.fee_pool = data.fee_pool;
    ledgerInfo.base_fee = data.base_fee;
    ledgerInfo.max_tx_set_size = data.max_tx_set_size;

    //console.log(ledgerInfo);

    return ledgerInfo;
}