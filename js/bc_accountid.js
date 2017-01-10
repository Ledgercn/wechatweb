/**
 * Created by jojopoper on 2017/01/03.
 */

var BCAccountId = {
    uiViews:{},
    curAddress: '',
    queryInput: null,
    accInfoTable: null,
    accHistoryTable: null,
    accInfoRefresh: null,
    accTransRefresh: null,
    userInfo: null,
    transactionUrl: '',
    currParameter: '',
    prevParameter: '',
    nextParameter: '',
    userTransations:  new ArrayList(),

    initController : function () {
        setStellarNetwork("LIVE");
        mLanguage = getUrlParam('l');
        this.curAddress = getUrlParam('addr');

        this.initStrings();
        this.initView();
        this.refreshUserInfo();
        this.refreshHistory('current');
    },

    initStrings : function(){
        if(mLanguage == 'cn') {
            this.uiViews.id_accid_input_addr_head_cap = '输入用户地址';
            this.uiViews.id_accid_input_addr_cap = '输入查询的用户地址';
            this.uiViews.id_accid_input_addr_memo = '输入需要查询的正确地址';
            this.uiViews.id_accid_info_head_cap = '用户信息';
            this.uiViews.id_accid_trans_head_cap = '账户历史';
            this.uiViews.id_accid_trans_prev_btn = ' << 前一页';
            this.uiViews.id_accid_trans_next_btn = '下一页 >> ';
        } else {
            this.uiViews.id_accid_input_addr_head_cap = 'Input Account ID';
            this.uiViews.id_accid_input_addr_cap = 'Enter Account ID for query';
            this.uiViews.id_accid_input_addr_memo = 'Enter the correct account id that requires a query';
            this.uiViews.id_accid_info_head_cap = 'User Information';
            this.uiViews.id_accid_trans_head_cap = 'History';
            this.uiViews.id_accid_trans_prev_btn = ' << Prev';
            this.uiViews.id_accid_trans_next_btn = 'Next >> ';
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","账户历史 - LumenStar");
        } else {
            $(document).attr("title","History - LumenStar");
            mLanguage = 'en';
        }
        this.queryInput = $('#id_accid_input_addr_text')[0];
        if(this.curAddress == '' || this.curAddress == null || this.curAddress == undefined){
            this.queryInput.value = '';
        } else {
            this.queryInput.value = this.curAddress;
        }
        this.accInfoTable = $('#id_accid_info_table_tbody')[0];
        this.accInfoTable.innerHTML = '';
        this.accHistoryTable = $('#id_accid_trans_table_tbody')[0];
        this.accHistoryTable.innerHTML = '';
        this.accInfoRefresh = $("#id_accid_info_head_refresh")[0];
        this.accTransRefresh = $('#id_accid_trans_head_refresh')[0];
        this.transactionUrl = StellarCurrentNetworkUrl + StellarAccounts + '/' + BCAccountId.curAddress + StellarTransactions;
        this.currParameter = BCAccountId.transactionUrl + '?limit=10&order=desc';

        $("#id_accid_input_addr_head_cap")[0].innerText = this.uiViews.id_accid_input_addr_head_cap;
        $("#id_accid_input_addr_cap")[0].innerText = this.uiViews.id_accid_input_addr_cap;
        $("#id_accid_input_addr_memo")[0].innerText = this.uiViews.id_accid_input_addr_memo;
        $("#id_accid_info_head_cap")[0].innerText = this.uiViews.id_accid_info_head_cap;
        $("#id_accid_trans_head_cap")[0].innerText = this.uiViews.id_accid_trans_head_cap;
        $("#id_accid_trans_prev_btn")[0].innerText = this.uiViews.id_accid_trans_prev_btn;
        $("#id_accid_trans_next_btn")[0].innerText = this.uiViews.id_accid_trans_next_btn;
    },

    refreshUserInfo : function() {
        if (BCAccountId.curAddress == undefined || BCAccountId.curAddress == '') {
            return
        }
        if(BCAccountId.accInfoRefresh.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        BCAccountId.accInfoRefresh.setAttribute('class','fa fa-refresh fa-2x fa-spin');

        this.accInfoTable.innerHTML = '';
        $.ajax({
            url: StellarCurrentNetworkUrl + StellarAccounts + '/' + BCAccountId.curAddress,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                BCAccountId.userInfo = AccountInfoDecode(data);
                BCAccountId.updateUserInfoTable();
            },
            complete : function() {
                BCAccountId.accInfoRefresh.setAttribute('class','fa fa-refresh fa-2x');
            }
        })
    },

    updateUserInfoTable : function() {
        rtimer = randomParam();
        c = '<tr><td colspan="2"><p style="word-wrap: break-word; word-break: break-all"><strong>Balance(XLM) :</strong> ' + this.userInfo.LumensBalance + '</p></td></tr>';
        c = c + '<tr><td colspan="2"><strong>Sequence :</strong> ' + this.userInfo.Sequence + '</td></tr>';
        c = c + '<tr><td colspan="2"><strong>Home Domain :</strong> ' + this.userInfo.HomeDomain + '</td></tr>';
        c = c + '<tr><td colspan="2"><strong>Inflation :</strong> ' + this.userInfo.InflationDest + '</td></tr>';
        c = c + '<tr><td colspan="2"><strong>Flags :</strong> required(' + this.userInfo.Flags.Auth_required + ') revocable(' + this.userInfo.Flags.Auth_revocable + ')</td></tr>';
        c = c + '<tr><td colspan="2"><strong>Thresholds :</strong> high(' + this.userInfo.Thresholds.high + ') med(' + this.userInfo.Thresholds.med + ') low(' + this.userInfo.Thresholds.low + ')</td></tr>';
        for(var idx = 1 ; idx < this.userInfo.Credits.length; idx++) {
            c = c + '<tr><td rowspan="2"><strong>' + this.userInfo.Credits[idx].asset_code + '</strong></td><td><strong>Balance:</strong> ' + this.userInfo.Credits[idx].balance + '</td></tr>';
            c = c + '<tr><td><p style="word-wrap: break-word; word-break: break-all"><strong>Issuer:</strong> <a href="accountid.html?addr=' + this.userInfo.Credits[idx].issuer + '&l=' + mLanguage + '&' + rtimer + '">' + this.userInfo.Credits[idx].issuer + '</a></p></td></tr>';
        }
        for(var idx = 0 ; idx < this.userInfo.Signers.length ; idx++) {
            c = c + '<tr><td rowspan="2"><p style="word-wrap: break-word; word-break: break-all">SIGNER' + (idx+1) + '</p></td><td><strong>Weight :</strong> ' + this.userInfo.Signers[idx].weight + '</td></tr>';
            c = c + '<tr><td><p style="word-wrap: break-word; word-break: break-all"><strong>Key :</strong> <a href="accountid.html?addr=' + this.userInfo.Signers[idx].public_key + '&l=' + mLanguage + '&' + rtimer + '">' + this.userInfo.Signers[idx].public_key + '</a></p></td></tr>';
        }

        this.accInfoTable.innerHTML = c;
    },

    refreshHistory : function(flag) {
        if (BCAccountId.curAddress == undefined || BCAccountId.curAddress == '') {
            return
        }
        if(BCAccountId.accTransRefresh.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        BCAccountId.accTransRefresh.setAttribute('class','fa fa-refresh fa-2x fa-spin');

        BCAccountId.accHistoryTable.innerHTML = '';

        var hisUrl = "";
        if(flag == 'current') {
            hisUrl = BCAccountId.currParameter;
        } else if (flag == 'next') {
            hisUrl = BCAccountId.nextParameter;
        } else {
            hisUrl = BCAccountId.prevParameter;
        }

        $.ajax({
            url: hisUrl,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                //console.log(data);
                if(flag == 'prev') {
                    BCAccountId.prevParameter = data._links.next.href;
                    BCAccountId.nextParameter = data._links.prev.href;
                } else {
                    BCAccountId.nextParameter = data._links.next.href;
                    BCAccountId.prevParameter = data._links.prev.href;
                }
                datalen  = data._embedded.records.length;
                BCAccountId.userTransations.clear();
                var startIndex = 0;
                var stepIndex = 1;
                if(flag == 'prev') {
                    startIndex = datalen - 1;
                    stepIndex = -1;
                }
                for(var idx = startIndex ; (idx >= 0 && idx < datalen) ; ) {
                    var trans = new BaseTransactionDef(BCAccountId.curAddress);
                    trans.DecodeBody(data._embedded.records[idx]);
                    ops = trans.DecodeOperation();
                    //console.log('=========== ' + idx);
                    //console.log(trans);
                    //console.log(ops);
                    BCAccountId.userTransations.add(ops);
                    idx = idx + stepIndex;
                }
                //console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
                //console.log(BCAccountId.userTransations);
                BCAccountId.updateHistoryTable();
            },
            complete : function() {
                BCAccountId.accTransRefresh.setAttribute('class','fa fa-refresh fa-2x');
            }
        })
    },

    updateHistoryTable : function() {
        this.accHistoryTable.innerHTML = '';
        for(var idx = 0; idx < this.userTransations.size() ; idx++) {
            var operas = this.userTransations.get(idx);
            for(var i=0; i< operas.length; i++){
                var op = operas[i];
                if (op == null) {
                    console.log('Waring .... Operation is null!!!');
                    continue;
                }
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
                this.accHistoryTable.innerHTML = this.accHistoryTable.innerHTML + c;
            }
        }
        //console.log(this.userTransations);
    },

    reload : function() {
        if (this.queryInput.value == undefined || this.queryInput.value == '') {
            return
        }
        parent.location = 'accountid.html?l=' + mLanguage + '&addr=' + this.queryInput.value + '&' + randomParam();
    },

    decodeOperation : function (o) {
        //console.log(o);
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

    NextPrevClick : function(flag) {
        if (this.curAddress == undefined || this.curAddress == '') {
            return
        }
        if(this.accTransRefresh.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin') {
            return
        }
        if(flag == 'next') {
            this.currParameter = this.nextParameter;
        } else if(flag == 'prev') {
            this.currParameter = this.prevParameter;
        }

        this.refreshHistory(flag);
    }

};