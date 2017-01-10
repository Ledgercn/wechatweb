/**
 * Created by jojopoper on 2017/01/02.
 */

function TransationLiteDecode(data) {
    var TransactionLite = {
        id : '',
        paging_token: '',
        hash : '',
        ledger: '',
        create_time: '',
        src_account: '',
        memo_type: '',
        memo: '',
        operationLength : 0,
        firstOperationType: ''
    };

    if(data == null) { return null;}

    TransactionLite.id = data.id;
    TransactionLite.paging_token = data.paging_token;
    TransactionLite.hash = data.hash;
    TransactionLite.ledger = data.ledger;
    TransactionLite.create_time = data.created_at;
    TransactionLite.src_account = data.source_account;
    TransactionLite.memo_type = data.memo_type;
    TransactionLite.memo = data.memo;

    if(TransactionLite.memo_type == 'hash' || TransactionLite.memo_type == 'return') {
        TransactionLite.memo = CryptoJS.enc.Hex.stringify(CryptoJS.enc.Base64.parse(TransactionLite.memo));
    }

    jsonObj = StellarSdk.xdr.TransactionEnvelope.fromXDR(data.envelope_xdr, 'base64');
    TransactionLite.operationLength = jsonObj._attributes.tx._attributes.operations.length;
    if(TransactionLite.operationLength >= 1) {
        TransactionLite.firstOperationType = jsonObj._attributes.tx._attributes.operations[0]._attributes.body._arm;
    }

    //console.log(TransactionLite);

    return TransactionLite;
}