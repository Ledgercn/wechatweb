/**
 * Created by jojopoper on 2017/01/03.
 */

var BCLedger = {
    uiViews:{},
    curLedgerNum: '',
    ledgerTable: null,
    queryInput: null,
    LedgerInfo: null,
    ledgerRefresh : null,

    initController : function () {
        setStellarNetwork("LIVE");
        mLanguage = getUrlParam('l');
        this.curLedgerNum = getUrlParam('ledger');

        this.initStrings();
        this.initView();
        this.refreshClick();
    },

    initStrings : function(){
        if(mLanguage == 'cn') {
            this.uiViews.id_ledger_input_addr_head_cap = '输入账本编号';
            this.uiViews.id_ledger_input_addr_cap = '输入查询的账本编号';
            this.uiViews.id_ledger_input_addr_memo = '输入需要查询的正确账本编号';
            this.uiViews.id_ledger_head_cap = '账本详细内容';
            this.uiViews.id_ledger_footer_prev_btn = " << 前一项";
            this.uiViews.id_ledger_footer_next_btn = "下一项 >> ";
        } else {
            this.uiViews.id_ledger_input_addr_head_cap = 'Input Ledger number';
            this.uiViews.id_ledger_input_addr_cap = 'Enter Ledger ID';
            this.uiViews.id_ledger_input_addr_memo = 'Enter the correct ledger id that requires a query';
            this.uiViews.id_ledger_head_cap = 'Ledger details';
            this.uiViews.id_ledger_footer_prev_btn = " << Prev";
            this.uiViews.id_ledger_footer_next_btn = "Next >> ";
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","账本历史 - LumenStar");
        } else {
            $(document).attr("title","Ledger - LumenStar");
            mLanguage = 'en';
        }
        this.queryInput = $('#id_ledger_input_addr_text')[0];
        if(this.curLedgerNum == '' || this.curLedgerNum == null || this.curLedgerNum == undefined){
            this.queryInput.value = '';
        } else {
            this.queryInput.value = this.curLedgerNum;
        }
        this.ledgerTable = $('#id_ledger_table_tbody')[0];
        this.ledgerTable.innerHTML = '';
        this.ledgerRefresh = $("#id_ledger_head_refresh")[0];
        $("#id_ledger_input_addr_head_cap")[0].innerText = this.uiViews.id_ledger_input_addr_head_cap;
        $("#id_ledger_input_addr_cap")[0].innerText = this.uiViews.id_ledger_input_addr_cap;
        $("#id_ledger_input_addr_memo")[0].innerText = this.uiViews.id_ledger_input_addr_memo;
        $("#id_ledger_head_cap")[0].innerText = this.uiViews.id_ledger_head_cap;
        $("#id_ledger_footer_prev_btn")[0].innerText = this.uiViews.id_ledger_footer_prev_btn;
        $("#id_ledger_footer_next_btn")[0].innerText = this.uiViews.id_ledger_footer_next_btn;
    },

    refreshClick : function() {
        if (BCLedger.queryInput.value == undefined || BCLedger.queryInput.value == '') {
            return
        }
        if(BCLedger.ledgerRefresh.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        BCLedger.ledgerRefresh.setAttribute('class','fa fa-refresh fa-2x fa-spin');

        this.ledgerTable.innerHTML = '';
        $.ajax({
            url: StellarCurrentNetworkUrl + StellarLedgers + '/' + BCLedger.queryInput.value,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                BCLedger.LedgerInfo = LedgerDecode(data);
                BCLedger.updateLedgerTable();
            },
            complete : function() {
                BCLedger.ledgerRefresh.setAttribute('class','fa fa-refresh fa-2x');
            }
        })
    },

    updateLedgerTable : function() {
        context = '<tr><td><p style="word-wrap: break-word; word-break: break-all"><strong>ID :</strong> ' + this.LedgerInfo.id + '</p></td></tr>';
        context = context + '<tr><td><strong>Paging Token :</strong> ' + this.LedgerInfo.paging_token + '</td></tr>';
        context = context + '<tr><td><p style="word-wrap: break-word; word-break: break-all"><strong>Hash :</strong> ' + this.LedgerInfo.hash + '</p></td></tr>';
        context = context + '<tr><td><p style="word-wrap: break-word; word-break: break-all"><strong>Prev Hash :</strong> ' + this.LedgerInfo.prev_hash + '</p></td></tr>';
        context = context + '<tr><td><strong>Sequence :</strong> ' + this.LedgerInfo.sequence + '</td></tr>';
        context = context + '<tr><td><strong>Transaction Count :</strong> ' + this.LedgerInfo.trans_count + '</td></tr>';
        context = context + '<tr><td><strong>Operation Count :</strong> ' + this.LedgerInfo.opera_count + '</td></tr>';
        context = context + '<tr><td><p style="word-wrap: break-word; word-break: break-all"><strong>Close Time :</strong> ' + this.LedgerInfo.close_time + '</p></td></tr>';
        context = context + '<tr><td><strong>Total Coins :</strong> ' + this.LedgerInfo.total_coins + '</td></tr>';
        context = context + '<tr><td><strong>Fee Pool :</strong> ' + this.LedgerInfo.fee_pool + '</td></tr>';
        context = context + '<tr><td><strong>Base Fee :</strong> ' + this.LedgerInfo.base_fee + '</td></tr>';
        context = context + '<tr><td><strong>Max Tx Set Size :</strong> ' + this.LedgerInfo.max_tx_set_size + '</td></tr>';
        this.ledgerTable.innerHTML = context;
    },

    reload : function() {
        if (BCLedger.queryInput.value == undefined || BCLedger.queryInput.value == '') {
            return
        }
        parent.location = 'ledger.html?l=' + mLanguage + '&ledger=' + BCLedger.queryInput.value + '&' + randomParam();
    },

    next_prevClick : function(flag) {
        if (BCLedger.queryInput.value == undefined || BCLedger.queryInput.value == '') {
            return
        }
        var newLedger = 0;
        if(flag == 'next') {
            newLedger = parseInt(BCLedger.queryInput.value) + 1;
        } else {
            newLedger = parseInt(BCLedger.queryInput.value) - 1;
        }
        parent.location = 'ledger.html?l=' + mLanguage + '&ledger=' + newLedger + '&' + randomParam();
    }
};