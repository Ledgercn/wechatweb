/**
 * Created by jojopoper on 2017/01/03.
 */

var BCTransaction = {
    uiViews:{},
    curHash: '',
    queryInput: null,
    TransInfoTable: null,
    transRefreshBtn: null,
    TransactionInfo: null,

    initController : function () {
        setStellarNetwork("LIVE");
        mLanguage = getUrlParam('l');
        this.curHash = getUrlParam('hash');

        this.initStrings();
        this.initView();
        this.refreshClick();
    },

    initStrings : function(){
        if(mLanguage == 'cn') {
            this.uiViews.id_trans_input_addr_head_cap = '输入HASH';
            this.uiViews.id_trans_input_addr_cap = '输入查询的HASH';
            this.uiViews.id_trans_input_addr_memo = '输入需要查询的正确HASH';
            this.uiViews.id_trans_info_head_cap = '详细内容';
        } else {
            this.uiViews.id_trans_input_addr_head_cap = 'Input Transaction HASH';
            this.uiViews.id_trans_input_addr_cap = 'Enter Transaction HASH for query';
            this.uiViews.id_trans_input_addr_memo = 'Enter the correct Transaction HASH that requires a query';
            this.uiViews.id_trans_info_head_cap = 'Information';
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","业务历史 - LumenStar");
        } else {
            $(document).attr("title","Transaction - LumenStar");
            mLanguage = 'en';
        }
        this.queryInput = $('#id_trans_input_addr_text')[0];
        if(this.curHash == '' || this.curHash == null || this.curHash == undefined){
            this.queryInput.value = '';
        } else {
            this.queryInput.value = this.curHash;
        }
        this.TransInfoTable = $('#id_trans_info_table_tbody')[0];
        this.TransInfoTable.innerHTML = '';
        this.transRefreshBtn = $('#id_trans_info_head_refresh')[0];
        $("#id_trans_input_addr_head_cap")[0].innerText = this.uiViews.id_trans_input_addr_head_cap;
        $("#id_trans_input_addr_cap")[0].innerText = this.uiViews.id_trans_input_addr_cap;
        $("#id_trans_input_addr_memo")[0].innerText = this.uiViews.id_trans_input_addr_memo;
        $("#id_trans_info_head_cap")[0].innerText = this.uiViews.id_trans_info_head_cap;
    },

    reload : function() {
        if (this.queryInput.value == undefined || this.queryInput.value == '') {
            return;
        }
        parent.location = 'transaction.html?l=' + mLanguage + '&hash=' + this.queryInput.value + '&' + randomParam();
    },

    refreshClick : function() {
        if (BCTransaction.queryInput.value == undefined || BCTransaction.queryInput.value == '') {
            return
        }
        if(BCTransaction.transRefreshBtn.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        BCTransaction.transRefreshBtn.setAttribute('class','fa fa-refresh fa-2x fa-spin');

        BCTransaction.TransInfoTable.innerHTML = '';
        $.ajax({
            url: StellarCurrentNetworkUrl + StellarTransactions + '/' + BCTransaction.queryInput.value,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                BCTransaction.TransactionInfo = new BaseTransactionDef(data.source_account);
                BCTransaction.TransactionInfo.DecodeBody(data);
                BCTransaction.updateTransTable();
            },
            complete : function() {
                BCTransaction.transRefreshBtn.setAttribute('class','fa fa-refresh fa-2x');
            }
        })
    },

    decodeOperation : function (o) {
        switch (o.Type){
            case PAYMENT_TYPE:
                formatPaymentOperationEx(o,mLanguage);
                break;
            case PATHPAYMENT_TYPE:
                formatPathPaymentOperationEx(o,mLanguage);
                break;
            case CREATE_TYPE:
                formatCreateOperationEx(o,mLanguage);
                break;
            case MERGE_TYPE:
                formatMergeOperationEx(o,mLanguage);
                break;
            case CHANGE_TRUST_TYPE:
                formatChangeTrustOperationEx(o,mLanguage);
                break;
            case MANAGE_OFFER_TYPE:
                formatManageOfferOperationEx(o,mLanguage);
                break;
            case SET_OPTIONS_TYPE:
                formatSetOptionsOperationEx(o,mLanguage);
                break;
            case ALLOW_TRUST_TYPE:
                formatAllowTrustOperationEx(o,mLanguage);
                break;
            case CREATE_PASSIVE_OFFER_TYPE:
                formatCreatePassiveOfferOperationEx(o,mLanguage);
                break;
            default :
                console.log(o.Type);
        }
    },

     updateTransTable : function() {
         this.TransInfoTable.innerHTML = '';
         rTime = randomParam();
         operations = this.TransactionInfo.DecodeOperation();
         c = '<tr><td colspan="3"><p style="word-wrap: break-word; word-break: break-all"><strong>ID :</strong> ' + this.TransactionInfo.id + '</p></td></tr>';
         c = c + '<tr><td colspan="3"><strong>Paging Token :</strong> ' + this.TransactionInfo.paging_token + '</td></tr>';
         c = c + '<tr><td colspan="3"><strong>Ledger :</strong> <a href="ledger.html?ledger=' + this.TransactionInfo.ledger + '&l=' + mLanguage + '&' + rTime + '">' + this.TransactionInfo.ledger + '</a></td></tr>';
         c = c + '<tr><td colspan="3"><p style="word-wrap: break-word; word-break: break-all"><strong>Hash :</strong> ' + this.TransactionInfo.hash + '</p></td></tr>';
         c = c + '<tr><td colspan="3"><strong>Sequence :</strong> ' + this.TransactionInfo.source_account_sequence + '</td></tr>';
         c = c + '<tr><td colspan="3"><strong>Operation Count :</strong> ' + this.TransactionInfo.operation_count + '</td></tr>';
         c = c + '<tr><td colspan="3"><p style="word-wrap: break-word; word-break: break-all"><strong>Create Time :</strong> ' + this.TransactionInfo.created_at + '</p></td></tr>';
         c = c + '<tr><td colspan="3"><strong>Fee Paid :</strong> ' + this.TransactionInfo.fee_paid + '</td></tr>';
         this.TransInfoTable.innerHTML = this.TransInfoTable.innerHTML + c;
         olen = operations.length;
         for(var idx = 0 ; idx < olen ; idx++){
             var op = operations[idx];
             this.decodeOperation(op);
             randomid = 'id_' + randomWord(true,5,10);
             c = '<tr>';
             c = c + '<td class="text-center" style="min-width: 90px;vertical-align: middle;background-color: #EFFFFF;word-wrap: break-word; word-break: break-all;" onclick="setDetailVisible(\'' + randomid + '\')">';
             c = c + op.Title;
             c = c + '</td>';
             c = c + '<td style="word-wrap: break-word; word-break: break-all;background-color: #EFFFFF;" rowspan="2" onclick="setDetailVisible(\'' + randomid + '\')">';
             c = c + '<label style="word-wrap: break-word; word-break: break-all;">' + op.addrTitle + '</label><br>';
             c = c + '<label>' + op.memodef.memo_type + ':' + op.memodef.memo + '</label>';
             c = c + '</td>';
             c = c + '<td class="text-right" style="min-width: 90px;vertical-align: middle; word-wrap: break-word; word-break: break-all;background-color: #EFFFFF; color:#bbb;" rowspan="2" onclick="setDetailVisible(\'' + randomid + '\')">';
             c = c + getLocalDateTimeString(op.created_datetime,false,mLanguage);
             c = c + '</td>';
             c = c + '</tr>';
             c = c + '<tr>';
             c = c + '<td class="text-center" style="min-width: 90px;vertical-align: middle; word-wrap: break-word; word-break: break-all;background-color: #FFFFFF;" onclick="setDetailVisible(\'' + randomid + '\')">';
             c = c + op.subTitle;
             c = c + '</td>';
             c = c + '</tr>';
             c = c + '<tr>';
             c = c + '<td colspan="3">';
             c = c + '<p style="display: none; width:100%; background-color: transparent; padding: 0; border: none;word-wrap: break-word; word-break: break-all;" id="' + randomid + '">';
             c = c + op.Details;
             c = c + '</p>';
             c = c + '</td>';
             c = c + '</tr>';
             this.TransInfoTable.innerHTML = this.TransInfoTable.innerHTML + c;
         }
     }
};