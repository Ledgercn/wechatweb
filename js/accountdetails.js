/**
 * Created by jojopoper on 2016/12/20.
 */

var AccountDetails = {
    uiViews:{},
    showSeed: false,
    refreshBtn1 : null,
    refreshBtn2 : null,
    accInfoTable : null,

    initController : function () {
        this.initStrings();
        //this.test();
        this.initView();
        this.clearError();
        this.refreshBtnClick();
        this.threadCheck();
        setInterval(this.threadCheck,40000);
    },

    test : function () {
        //mAddress = 'GBZWSGL57V6J33JNXOE2NSNQWZ2UEBVGESXSCADXAFUED6MT3LNTLK3B';
        //mUnique = 'WALKER';
        //mKey0 = '56a92be4ca340992997eaf7aff4acb30854f1335d2bd6cd50681ca1d9a5659ae98acfe8490debfd2fe9abe0b30b8158261341e573eeef39f4ca068229e4ac0a6';
        //mKey1 = '5935a19c6cbc132eb6f5eb036bca10adce7c96b51c2a363011c204d8e3c48b0b1e193914c7d05341b104cc52f2093034683f122dba92417e';
    },

    initStrings : function() {
        this.uiViews.id_unique_text = mUnique;
        if(mLanguage == "cn"){
            this.uiViews.id_userinfo_lumensbalance_text = "流明币 余额";
            this.uiViews.id_usrifo_tabel_head_coinname_cap = "资产";
            this.uiViews.id_usrifo_tabel_head_balance_cap = "余额";
            this.uiViews.id_userinfo_details_text = "账户详细信息";
            this.uiViews.id_userinfo_details_body_domain_cap = "域名";
            this.uiViews.id_userinfo_details_body_inflation_cap = "通胀";
            this.uiViews.id_userinfo_details_body_flag_cap = "标示";
            this.uiViews.id_userinfo_details_body_threshold_cap = "门限";
            this.uiViews.id_userinfo_details_body_signer_cap = "权重";

            this.uiViews.err_server_data_invalid = "你的网络连接出现问题或者你所使用的连接已经超时，请从公众号重新发起请求。";
        } else {
            this.uiViews.id_userinfo_lumensbalance_text = "Lumens Balance";
            this.uiViews.id_usrifo_tabel_head_coinname_cap = "Asset";
            this.uiViews.id_usrifo_tabel_head_balance_cap = "Balance";
            this.uiViews.id_userinfo_details_text = "Account information";
            this.uiViews.id_userinfo_details_body_domain_cap = "Domain";
            this.uiViews.id_userinfo_details_body_inflation_cap = "Inflation";
            this.uiViews.id_userinfo_details_body_flag_cap = "Flags";
            this.uiViews.id_userinfo_details_body_threshold_cap = "Threshold";
            this.uiViews.id_userinfo_details_body_signer_cap = "Signer";

            this.uiViews.err_server_data_invalid = "Your network connection has problems or your connection has timed out, please restart the request from the subscription.";
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","账户信息 - LumenStar");
        } else {
            $(document).attr("title","Details - LumenStar");
        }
        this.refreshBtn1 = $('#id_userinfo_refresh_btn1')[0];
        this.refreshBtn2 = $('#id_userinfo_refresh_btn2')[0];
        this.accInfoTable = $('#id_usrifo_table_tbody');

        $("#id_unique_text")[0].innerText = this.uiViews.id_unique_text;
        $("#id_userinfo_lumensbalance_text")[0].innerText = this.uiViews.id_userinfo_lumensbalance_text;
        $("#id_usrifo_tabel_head_coinname_cap")[0].innerText = this.uiViews.id_usrifo_tabel_head_coinname_cap;
        $("#id_usrifo_tabel_head_balance_cap")[0].innerText = this.uiViews.id_usrifo_tabel_head_balance_cap;
        $("#id_userinfo_details_text")[0].innerText = this.uiViews.id_userinfo_details_text;
        $("#id_userinfo_details_body_pubaddr_cap")[0].innerText = this.uiViews.id_unique_text;
        $("#id_userinfo_details_body_domain_cap")[0].innerText = this.uiViews.id_userinfo_details_body_domain_cap;
        $("#id_userinfo_details_body_inflation_cap")[0].innerText = this.uiViews.id_userinfo_details_body_inflation_cap;
        $("#id_userinfo_details_body_flag_cap")[0].innerText = this.uiViews.id_userinfo_details_body_flag_cap;
        $("#id_userinfo_details_body_threshold_cap")[0].innerText = this.uiViews.id_userinfo_details_body_threshold_cap;
        $("#id_userinfo_details_body_signer_cap")[0].innerText = this.uiViews.id_userinfo_details_body_signer_cap;

        $('#id_userinfo_details_body_pubaddr_text')[0].innerText = mAddress;
        $('#id_userinfo_details_body_secret_text')[0].value = mKey1;
    },

    showSeedAddr : function (inputid,btnid) {
        this.showSeed = !this.showSeed;
        inputObj = $("#"+inputid)[0];
        if(this.showSeed){
            inputObj.setAttribute("type","text");
            inputObj.value = TransDecrypt(mKey0.substr(0,16), mKey1, true);
            $("#"+btnid)[0].setAttribute("class","fa fa-eye-slash");
        } else {
            inputObj.setAttribute("type","password");
            inputObj.value = mKey1;
            $("#"+btnid)[0].setAttribute("class","fa fa-eye");
        }
    },

    getAccountInfo : function(accountid) {
        this.clearError();
        setStellarNetwork("LIVE");
        getUrl = StellarCurrentNetworkUrl + StellarAccounts + '/' + accountid;
        $.ajax({
            url: getUrl,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                //console.log(data);
                accInfo = AccountInfoDecode(data);
                AccountDetails.accInfoTable.empty('');
                for(var idx = 0 ; idx < accInfo.Credits.length ; idx++){
                    AccountDetails.addBalanceInfo(1+idx, accInfo.Credits[idx].asset_code, accInfo.Credits[idx].balance, accInfo.Credits[idx].issuer);
                }
                $('#id_userinfo_details_body_domain_text')[0].innerText = accInfo.HomeDomain;
                $('#id_userinfo_details_body_inflation_text')[0].innerText = accInfo.InflationDest;
                $('#id_userinfo_details_body_flag_text')[0].innerText = 'Auth_required(' + accInfo.Flags.Auth_required + ')\r\nAuth_revocable(' + accInfo.Flags.Auth_revocable + ')';
                $('#id_userinfo_details_body_threshold_text')[0].innerText = 'High:' + accInfo.Thresholds.high + ' med:' + accInfo.Thresholds.med + ' low:' + accInfo.Thresholds.low;
                signerText = "";
                for(var idx = 0; idx < accInfo.Signers.length ; idx++){
                    if(idx > 0){
                        signerText += '\r\n';
                    }
                    signerText += '' + accInfo.Signers[idx].public_key + '(weight:' + accInfo.Signers[idx].weight + ')';
                }
                $('#id_userinfo_details_body_signer_text')[0].innerText = signerText;
            },
            error: function(xhr, status, e) {
                AccountDetails.setError(e);
            },
            complete: function () {
                AccountDetails.refreshBtn1.setAttribute('class','fa fa-refresh fa-2x');
                AccountDetails.refreshBtn2.setAttribute('class','fa fa-refresh fa-2x');
            }
        });
    },

    setError : function(msg) {
        $('#id_error_div')[0].setAttribute('style','display: inherit;');
        $('#id_error_msg')[0].innerText = msg;
    },

    clearError : function() {
        $('#id_error_div')[0].setAttribute('style','display: none;');
        $('#id_error_msg')[0].innerText = '';
    },

    threadCheck : function() {

        if (mUserID == null || mUserID == undefined) {
            if (mLanguage == "cn"){
                parent.location = '../error.html?details='+ encodeURIComponent("用户信息获取失败或者失去和服务器连接！");
            } else {
                parent.location = '../error.html?details='+ encodeURIComponent("Can not read user informations or lost connection with server!");
            }
            return;
        }

        $.ajax({
            url: CurrentServer + '/validation',
            type: 'POST',
            data: 't=refuserinfo&userid=' + encodeURIComponent(mUserID) + '&l=' + mLanguage,
            async : true,
            cache :false,
            success: function(data, status,xhr){
                checkSuccess(data,status,xhr, "../error.html", AccountDetails.uiViews.err_server_data_invalid);
                saveKeyDatas();
            },
            error: function (xhr, status, e) {
                errorResponse(xhr, status, e, "../error.html", "Lost connection with server");
            }
        })
    },

    addBalanceInfo: function (index, asset, balance, issuer) {
        info = '<tr class="info"><td>' + index + '</td><td>' + asset + '</td><td style="word-wrap: break-word; word-break: break-all">' + balance + '</td></tr>';
        if(issuer != null && issuer != undefined && issuer != '' ) {
            info += '<tr class="success" style="word-wrap: break-word; word-break: break-all"><td></td><td colspan="2">' + issuer + '</td></tr>';//.substr(0,12) + '...' + issuer.substr(issuer.length-12,12) + '</td></tr>';
        }
        this.accInfoTable.append(info);
    },

    refreshBtnClick : function () {
        if(this.refreshBtn1.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin'|| this.refreshBtn2.getAttribute('class') == 'fa fa-refresh fa-2x fa-spin'){
            return;
        }
        this.refreshBtn1.setAttribute('class','fa fa-refresh fa-2x fa-spin');
        this.refreshBtn2.setAttribute('class','fa fa-refresh fa-2x fa-spin');
        this.getAccountInfo(mAddress);
    }
};