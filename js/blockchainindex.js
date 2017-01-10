/**
 * Created by jojopoper on 2017/01/02.
 */

var BlockChainIndex = {
    uiViews:{},
    queryInput:null,
    ledgerTable: null,
    transTable: null,
    ledgerRefresh : null,
    transRefresh : null,
    LedgerNextUrl : '',
    curLedger : new ArrayList(),
    curTrans : new ArrayList(),
    ledgerSecondLeft : 0,
    ledgerSecondMemo : null,
    transSecondLeft : 0,
    transSecondMemo : null,

    initController : function () {
        setStellarNetwork("LIVE");
        mLanguage = getUrlParam('l');
        this.ledgerSecondLeft = -1;
        this.transSecondLeft = -1;
        this.initStrings();
        this.initView();
        this.getLedger();
        this.getTransaction();
        //this.ledgerThread();
        setInterval(this.ledgerThread,1000);
        setInterval(this.transThread,1000);
    },

    initStrings : function(){
        if(mLanguage == 'cn') {
            this.uiViews.id_blockchain_input_addr_head_cap = '输入 查询';
            this.uiViews.id_blockchain_input_addr_cap = '输入查询的内容';
            this.uiViews.id_blockchain_input_addr_memo = '输入需要查询的正确地址或需要查询的哈希';
            this.uiViews.id_blockchain_ledger_head_cap = '账本';
            this.uiViews.id_blockchain_trans_head_cap = '业务';
        } else {
            this.uiViews.id_blockchain_input_addr_head_cap = 'Input Query';
            this.uiViews.id_blockchain_input_addr_cap = 'Enter query information';
            this.uiViews.id_blockchain_input_addr_memo = 'Enter the correct account id or the hash that requires a query';
            this.uiViews.id_blockchain_ledger_head_cap = 'Ledger';
            this.uiViews.id_blockchain_trans_head_cap = 'Transaction';
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","区块浏览 - LumenStar");
        } else {
            $(document).attr("title","BlockChain - LumenStar");
        }
        this.queryInput = $('#id_blockchain_input_addr_text')[0];
        this.queryInput.value = '';
        this.ledgerTable = $('#id_blockchain_ledger_table_tbody')[0];
        this.ledgerTable.innerHTML = '';
        this.transTable = $('#id_blockchain_trans_table_tbody')[0];
        this.transTable.innerHTML = '';
        this.ledgerRefresh = $("#id_blockchain_ledger_head_refresh")[0];
        this.transRefresh = $("#id_blockchain_trans_head_refresh")[0];
        this.ledgerSecondMemo = $('#id_bc_ledger_head_btn')[0];
        this.transSecondMemo = $('#id_bc_trans_head_btn')[0];
        $("#id_blockchain_input_addr_head_cap")[0].innerText = this.uiViews.id_blockchain_input_addr_head_cap;
        $("#id_blockchain_input_addr_cap")[0].innerText = this.uiViews.id_blockchain_input_addr_cap;
        $("#id_blockchain_input_addr_memo")[0].innerText = this.uiViews.id_blockchain_input_addr_memo;
        $("#id_blockchain_ledger_head_cap")[0].innerText = this.uiViews.id_blockchain_ledger_head_cap;
        $("#id_blockchain_trans_head_cap")[0].innerText = this.uiViews.id_blockchain_trans_head_cap;
    },

    ledgerThread : function () {
        //console.log(this.ledgerSecondMemo);
        BlockChainIndex.ledgerSecondLeft--;
        if(BlockChainIndex.ledgerSecondLeft < 0) {
            return;
        }
        if(BlockChainIndex.ledgerSecondLeft > 0) {
            if(mLanguage == 'cn') {
                BlockChainIndex.ledgerSecondMemo.innerText = BlockChainIndex.ledgerSecondLeft + ' 秒';
            } else {
                BlockChainIndex.ledgerSecondMemo.innerText = BlockChainIndex.ledgerSecondLeft + ' s';
            }
        } else {
            if(mLanguage == 'cn') {
                BlockChainIndex.ledgerSecondMemo.innerText = '正在读取...';
            } else {
                BlockChainIndex.ledgerSecondMemo.innerText = 'Reading...';
            }
            BlockChainIndex.getLedger();
        }
    },

    getLedger : function () {
        if(BlockChainIndex.ledgerRefresh.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        BlockChainIndex.ledgerRefresh.setAttribute('class','fa fa-refresh fa-2x fa-spin');
        $.ajax({
            url: StellarCurrentNetworkUrl + StellarLedgers + '?order=desc&limit=10',
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                len  = data._embedded.records.length;
                BlockChainIndex.curLedger.clear();
                for(var idx = 0 ; idx < len ; idx++) {
                    BlockChainIndex.curLedger.add(LedgerDecode(data._embedded.records[idx]));
                }

                BlockChainIndex.updateLedgerTable();
            },
            complete : function() {
                BlockChainIndex.ledgerRefresh.setAttribute('class','fa fa-refresh fa-2x');
                BlockChainIndex.ledgerSecondLeft = 30;
            }
        })
    },

    getLedgerClick : function() {
        this.ledgerSecondLeft = 1;
        this.getLedger();
    },

    updateLedgerTable : function() {
        this.ledgerTable.innerHTML = '';
        rtimer = randomParam();
        for(var idx = 0 ; idx < this.curLedger.size(); idx++){
            led = this.curLedger.get(idx);
            context = '<tr><td><a href="ledger.html?ledger='+ led.sequence + '&l=' + mLanguage + '&' + rtimer + '">'+ led.sequence +'</a></td>';
            context = context + '<td>'+ led.close_time +'</td>';
            context = context + '<td>'+ led.trans_count +'</td> <td>'+ led.opera_count +'</td></tr>';
            this.ledgerTable.innerHTML = this.ledgerTable.innerHTML + context;
        }
    },

    transThread : function () {
        //console.log(this.ledgerSecondMemo);
        BlockChainIndex.transSecondLeft--;
        if(BlockChainIndex.transSecondLeft < 0) {
            return;
        }
        if(BlockChainIndex.transSecondLeft > 0) {
            if(mLanguage == 'cn') {
                BlockChainIndex.transSecondMemo.innerText = BlockChainIndex.transSecondLeft + ' 秒';
            } else {
                BlockChainIndex.transSecondMemo.innerText = BlockChainIndex.transSecondLeft + ' s';
            }
        } else {
            if(mLanguage == 'cn') {
                BlockChainIndex.transSecondMemo.innerText = '正在读取...';
            } else {
                BlockChainIndex.transSecondMemo.innerText = 'Reading...';
            }
            BlockChainIndex.getTransaction();
        }
    },

    getTransClick : function() {
        this.transSecondLeft = 1;
        this.getTransaction();
    },

    getTransaction : function() {
        if(BlockChainIndex.transRefresh.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        BlockChainIndex.transRefresh.setAttribute('class','fa fa-refresh fa-2x fa-spin');
        $.ajax({
            url: StellarCurrentNetworkUrl + StellarTransactions + '?order=desc&limit=10',
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                len  = data._embedded.records.length;
                BlockChainIndex.curTrans.clear();
                for(var idx = 0 ; idx < len ; idx++) {
                    BlockChainIndex.curTrans.add(TransationLiteDecode(data._embedded.records[idx]));
                }

                BlockChainIndex.updateTransTable();
            },
            complete : function() {
                BlockChainIndex.transRefresh.setAttribute('class','fa fa-refresh fa-2x');
                BlockChainIndex.transSecondLeft = 15;
            }
        })
    },

    updateTransTable : function() {
        this.transTable.innerHTML = '';
        rtimer = randomParam();
        for(var idx = 0 ; idx < this.curTrans.size(); idx++) {
            trans = this.curTrans.get(idx);
            context = '<tr><td><a href="transaction.html?hash=' + trans.hash + '&l=' + mLanguage + '&' + rtimer + '">' + SubString(trans.hash,6,6) + '</a></td>';
            context = context + '<td><a href="accountid.html?addr=' + trans.src_account + '&l=' + mLanguage + '&' + rtimer + '">' + SubString(trans.src_account,8,8) + '</a></td></tr>';
            context = context + '<tr><td colspan="2"><p style="word-wrap: break-word; word-break: break-all">';
            context = context + '<strong>OperationSize:</strong> ' + trans.operationLength + '<br>';
            context = context + '<strong>Operation[0]->Type:</strong>  ' + trans.firstOperationType + '<br>';
            context = context + '<strong>MemoType:</strong> ' + trans.memo_type + '<br>';
            if(trans.memo_type != 'none') {
                context = context + '<strong>Memo:</strong>  ' + trans.memo + '</p></td></tr>';
            }
            this.transTable.innerHTML = this.transTable.innerHTML + context;
        }
    },

    queryClick : function() {
        inputVal = this.queryInput.value;
        if(inputVal == '' || inputVal == undefined || inputVal == null) {
            return
        }
        if(inputVal.indexOf('G') == 0) {
            parent.location = 'accountid.html?addr=' + inputVal + '&l=' + mLanguage + '&' + randomParam();
        } else {
            parent.location = 'transaction.html?hash=' + inputVal + '&l=' + mLanguage + '&' + randomParam();
        }
    }
};