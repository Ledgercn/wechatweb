/**
 * Created by jojopoper on 2016/12/21.
 */

var AccountPayment = {
    uiViews:{},
    assetVisible: false,
    assetListView: null,
    accInfo: null,
    refreshBtn1:null,
    refreshBtn2:null,
    assetObj: null,
    amountObj: null,
    errorMsgObj: null,
    isCustomAsset: false,

    initController : function () {
        //this.test();
        this.initStrings();
        this.initView();
        this.refreshBtnClick();
        this.threadCheck();
        setInterval(this.threadCheck,40000);
    },

    test : function(){
        mLanguage = 'cn';
        mUnique = 'WALKER';
        //mAddress = 'GBZWSGL57V6J33JNXOE2NSNQWZ2UEBVGESXSCADXAFUED6MT3LNTLK3B';
        //mKey0 = '56a92be4ca340992997eaf7aff4acb30854f1335d2bd6cd50681ca1d9a5659ae98acfe8490debfd2fe9abe0b30b8158261341e573eeef39f4ca068229e4ac0a6';
        //mKey1 = '5935a19c6cbc132eb6f5eb036bca10adce7c96b51c2a363011c204d8e3c48b0b1e193914c7d05341b104cc52f2093034683f122dba92417e';
        mAddress = 'GC4BKCKTTHQYG4FYE6VBS6WZ2TYFRGHRNYRYT7SEH3ALAIAB7Z6CBIP6';
    },

    initStrings : function() {
        this.uiViews.id_pay_header_cap = mUnique;
        if(mLanguage == "cn"){
            this.uiViews.id_pay_toaddress_cap = "收款地址";
            this.uiViews.id_pay_toaddress_input_placeholder = "[必填]恒星地址或对方唯一ID";
            this.uiViews.id_pay_toaddress_memo = "可以填写对方唯一ID或正确的恒星地址，点击照相机图标可以扫描对方二维码。";
            this.uiViews.id_pay_asset_cap = "支付资产";
            this.uiViews.id_pay_asset_input_placeholder = "[选填]资产";
            this.uiViews.id_pay_asset_memo = "不填写默认为Lumens，可以选择需要发送的资产。如果列表中未找到需要发送的资产，请点击刷新。";
            this.uiViews.id_pay_amount_cap = "支付数量";
            this.uiViews.id_pay_amount_input_placeholder = "[必填]请填写数字（支持小数)";
            this.uiViews.id_pay_amount_memo = "填写需要发送的资产数量。点击前面的刷新按键，可以获知当前选择资产余额。";
            this.uiViews.id_pay_memo_cap = "备注信息";
            this.uiViews.id_pay_memo_input_placeholder = "[选填]备注信息";
            this.uiViews.id_pay_memo_memo = "MemoText最多可以输入28个英文字符；MemoID只允许输入数字；MemoHash是一个Hash字符串（16进制显示）；MemoReturn是编码之后的字符串";
            this.uiViews.id_confirmbtn = "发送";
            this.uiViews.custom_asset_cap = '其他资产';

            this.uiViews.err_server_data_invalid = "你的网络连接出现问题或者你所使用的连接已经超时，请从公众号重新发起请求。";
            this.uiViews.err_Account_not_exist = "当前恒星用户账户未被激活！";
            this.uiViews.err_DestAccount_not_exist = "目标恒星用户账户未被激活！";
        } else {
            this.uiViews.id_pay_toaddress_cap = "Payment Address";
            this.uiViews.id_pay_toaddress_input_placeholder = "[Required] Stellar address or user unique id";
            this.uiViews.id_pay_toaddress_memo = "You can fill in user unique ID or the correct stellar address, click the camera icon to scan user QR code.";
            this.uiViews.id_pay_asset_cap = "Payment asset";
            this.uiViews.id_pay_asset_input_placeholder = "[Optional] Asset content";
            this.uiViews.id_pay_asset_memo = "Do not fill in the default Lumens, you can choose to send the assets.If no assets need to be sent in the list, click Refresh.";
            this.uiViews.id_pay_amount_cap = "Payment amount";
            this.uiViews.id_pay_amount_input_placeholder = "[Required] Please fill in the number (support decimal)";
            this.uiViews.id_pay_amount_memo = "Fill in the number of assets to be sent. Click the Refresh button on the front to see the balance of the currently selected asset.";
            this.uiViews.id_pay_memo_cap = "Information Memo";
            this.uiViews.id_pay_memo_input_placeholder = "[Optional] Memo";
            this.uiViews.id_pay_memo_memo = "Memo Text can enter up to 28 English characters; MemoID only allowed to enter numbers; MemoHash is a Hash string (hexadecimal display); MemoReturn string after encoding";
            this.uiViews.id_confirmbtn = "SEND";
            this.uiViews.custom_asset_cap = 'Other asset';

            this.uiViews.err_server_data_invalid = "Your network connection has problems or your connection has timed out, please restart the request from the subscription.";
            this.uiViews.err_Account_not_exist = "The stellar account is not activation!";
            this.uiViews.err_DestAccount_not_exist = "The destination stellar account is not activation!";
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","支付 - LumenStar");
        } else {
            $(document).attr("title","Payment - LumenStar");
        }
        $("#id_pay_header_cap")[0].innerText = this.uiViews.id_pay_header_cap;

        $("#id_pay_toaddress_cap")[0].innerText = this.uiViews.id_pay_toaddress_cap;
        $("#id_pay_toaddress_input")[0].setAttribute('placeholder',this.uiViews.id_pay_toaddress_input_placeholder);
        $("#id_pay_toaddress_memo")[0].innerText = this.uiViews.id_pay_toaddress_memo;

        this.assetObj = $('#id_pay_asset_input');
        $("#id_pay_asset_cap")[0].innerText = this.uiViews.id_pay_asset_cap;
        this.assetObj.attr('placeholder',this.uiViews.id_pay_asset_input_placeholder);
        $("#id_pay_asset_memo")[0].innerText = this.uiViews.id_pay_asset_memo;

        this.amountObj = $('#id_pay_amount_input')[0];
        $("#id_pay_amount_cap")[0].innerText = this.uiViews.id_pay_amount_cap;
        this.amountObj.setAttribute('placeholder',this.uiViews.id_pay_amount_input_placeholder);
        $("#id_pay_amount_memo")[0].innerText = this.uiViews.id_pay_amount_memo;

        $("#id_pay_memo_cap")[0].innerText = this.uiViews.id_pay_memo_cap;
        $("#id_pay_memo_input")[0].setAttribute('placeholder',this.uiViews.id_pay_memo_input_placeholder);
        $("#id_pay_memo_memo")[0].innerText = this.uiViews.id_pay_memo_memo;
        $("#id_confirmbtn")[0].innerText = this.uiViews.id_confirmbtn;

        this.assetListView = $("#id_pay_asset_select_dd")[0];
        this.assetListView.innerHTML = '';
        this.refreshBtn1 = $("#id_pay_header_refresh_btn")[0];
        this.refreshBtn2 = $("#id_pay_amount_refresh_btn")[0];
        this.errorMsgObj = $('#id_error_msg')[0];
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
                checkSuccess(data,status,xhr, "../error.html", AccountPayment.uiViews.err_server_data_invalid);
                saveKeyDatas();
            },
            error: function (xhr, status, e) {
                errorResponse(xhr, status, e, "../error.html", "Lost connection with server");
            }
        })
    },

    scanQRcode : function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
                $("#id_pay_toaddress_input").val(result);
            }
        });
    },

    setError : function(msg) {
        $('#id_error_div')[0].setAttribute('style','display: inherit;');
        this.errorMsgObj.innerText = msg;
    },

    appendError : function(msg) {
        $('#id_error_div')[0].setAttribute('style','display: inherit;');
        this.errorMsgObj.innerText = this.errorMsgObj.innerText + '\r\n' +msg;
    },

    clearError : function() {
        $('#id_error_div')[0].setAttribute('style','display: none;');
        this.errorMsgObj.innerText = '';
    },

    showAssetList : function() {
        this.assetVisible = !this.assetVisible;
        if(this.assetVisible) {
            $('#id_pay_asset_select_dd')[0].setAttribute('style','display: inherit;');
            $('#id_pay_asset_btn_icon')[0].setAttribute('class','fa fa-chevron-circle-down');
        } else {
            $('#id_pay_asset_select_dd')[0].setAttribute('style','display: none;');
            $('#id_pay_asset_btn_icon')[0].setAttribute('class','fa fa-chevron-circle-right');
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
                if(data.balances != null && data.sequence != null) {
                    AccountPayment.accInfo = AccountInfoDecode(data);
                } else {
                    AccountPayment.setError(this.uiViews.err_Account_not_exist);
                }
            },
            error: function(xhr, status, e) {
                if(xhr.status == 404 && xhr.statusText == 'Not Found') {
                    AccountPayment.setError(AccountPayment.uiViews.err_Account_not_exist);
                } else {
                    AccountPayment.setError(e);
                }
            },
            complete: function () {
                AccountPayment.refreshBtn1.setAttribute('class','fa fa-refresh');
                AccountPayment.refreshBtn2.setAttribute('class','fa fa-refresh');
                AccountPayment.assetObj.val('');
                AccountPayment.amountObj.value = '';
                AccountPayment.setAssetListContext();
            }
        });
    },

    refreshBtnClick : function() {
        if(this.refreshBtn1.getAttribute('class') == 'fa fa-refresh fa-spin'|| this.refreshBtn2.getAttribute('class') == 'fa fa-refresh fa-spin'){
            return;
        }
        this.refreshBtn1.setAttribute('class','fa fa-refresh fa-spin');
        this.refreshBtn2.setAttribute('class','fa fa-refresh fa-spin');
        this.getAccountInfo(mAddress);
    },

    setAssetListContext : function() {
        AccountPayment.assetListView.innerHTML = '';
        AccountPayment.appendAsset('Lumens');
        if(AccountPayment.accInfo == null || AccountPayment.accInfo.Credits.length <= 1) {
            AccountPayment.appendAsset(AccountPayment.uiViews.custom_asset_cap);
            return;
        }
        for(var idx = 1 ; idx < AccountPayment.accInfo.Credits.length ; idx++){
            AccountPayment.appendAsset(AccountPayment.accInfo.Credits[idx].asset_code + ':' + AccountPayment.accInfo.Credits[idx].issuer);
        }
        AccountPayment.appendAsset(AccountPayment.uiViews.custom_asset_cap);
    },

    setAmountContext : function() {
        val = this.assetObj.val();
        if(val == '' || val == null || val == undefined) {
            this.amountObj.setAttribute('placeholder',this.uiViews.id_pay_amount_input_placeholder);
            return;
        }
        palceholdertext = 'Balance:';
        if(mLanguage == 'cn'){
            palceholdertext = '余额:';
        }
        if(val == 'Lumens') {
            this.amountObj.setAttribute('placeholder',palceholdertext + this.accInfo.LumensBalance);
            return;
        }
        notFind = true;
        for(var idx = 1 ; idx < this.accInfo.Credits.length ; idx++){
            indexFlag = val.indexOf(':');
            if(indexFlag == -1){
                continue;
            }
            assetcode = val.substr(0,indexFlag);
            issuer = val.substr(indexFlag+1, val.length - 1 - indexFlag);
            if(assetcode == this.accInfo.Credits[idx].asset_code) {
                this.amountObj.setAttribute('placeholder',palceholdertext + this.accInfo.Credits[idx].balance);
                notFind = false;
                break;
            }
        }
        if(notFind) {
            this.amountObj.setAttribute('placeholder',this.uiViews.id_pay_amount_input_placeholder);
        }
    },

    appendAsset: function(assetname) {
        appInfo = '<div class="radio"><label><input type="radio" name="optionsRadios" onclick="AccountPayment.changeAssetNameClick(\''+ assetname +'\')">' + assetname + '</label></div>';
        this.assetListView.innerHTML = this.assetListView.innerHTML + appInfo;
    },

    changeAssetNameClick : function(assetname) {
        if(assetname == this.uiViews.custom_asset_cap) {
            this.assetObj.removeAttr('readonly');
            this.assetObj.val('');
            this.isCustomAsset = true;
        } else {
            this.assetObj.attr('readonly','readonly');
            this.assetObj.val(assetname);
            this.isCustomAsset = false;
        }
        this.setAmountContext();
    },

    Confirm : function() {
        console.log('confirm click');
        this.clearError();
        comfirmBtnIcon = $('#id_confirmbtnIcon')[0];
        if(comfirmBtnIcon.getAttribute('class') == 'fa fa-spinner fa-pulse'){
            return;
        }
        comfirmBtnIcon.setAttribute('class','fa fa-spinner fa-pulse');

        payInfo = this.checkDataValid();
        if(payInfo == null) {
            this.resetConfirmBtnIcon();
            return;
        }

        $('#id_pay_heading_div')[0].setAttribute('style','display: none;');
        $('#id_pay_body_div')[0].setAttribute('style','display: none;');

        paymentExecute.initPaymentExe(payInfo);
        paymentExecute.ExecutePayment();
    },

    resetConfirmBtnIcon : function() {
        $('#id_confirmbtnIcon')[0].setAttribute('class','fa fa-send-o');
        $('#id_pay_heading_div')[0].setAttribute('style','display: inherit;');
        $('#id_pay_body_div')[0].setAttribute('style','display: inherit;');
    },

    checkDataValid : function () {
        payInfo = {
            srcAddr : mAddress,
            skey : mKey1
        };
        payInfo = this.checkPayAddress(payInfo);
        if(payInfo == null){
            errMsg = '"Payment address" is incorrect, please check again.';
            if(mLanguage == 'cn'){
                errMsg = '"收款地址"有误请检查确认正确后再重新尝试！';
            }
            this.appendError(errMsg);
            return null;
        }

        payInfo = this.checkAssetandIssuer(payInfo);
        if(payInfo == null) {
            errMsg = '"Payment asset" is incorrect, please check again.';
            if(mLanguage == 'cn'){
                errMsg = '"支付资产"有误请检查确认正确后再重新尝试！';
            }
            this.appendError(errMsg);
            return null;
        }

        payInfo = this.checkAmount(payInfo);
        if(payInfo == null) {
            errMsg = '"Payment amount" is incorrect, please check again.';
            if(mLanguage == 'cn'){
                errMsg = '"支付数量"有误请检查确认正确后再重新尝试！';
            }
            this.appendError(errMsg);
            return null;
        }

        payInfo = this.checkMemo(payInfo);
        if(payInfo == null) {
            errMsg = '"Payment memo" is incorrect, please check again.';
            if(mLanguage == 'cn'){
                errMsg = '"支付备注"有误请检查确认正确后再重新尝试！';
            }
            this.appendError(errMsg);
        }
        return payInfo;
    },

    checkPayAddress : function(p) {
        payAddress = $('#id_pay_toaddress_input')[0].value;
        if(payAddress == null || payAddress == "" || payAddress == undefined) {
            return null;
        }
        if(StellarSdk.Keypair.isValidPublicKey(payAddress)){
            p.destAddr = payAddress;
            return p;
        }
        starIndex = payAddress.indexOf("*");
        if(starIndex == -1) {
            payAddress += '*wechat*ledgercn.com';
        }
        return this.getAddrFormFederation(payAddress, p);
    },

    getSuffixDomain : function (str) {
        lastIndex = str.lastIndexOf('*');
        if(lastIndex == -1) {
            return null;
        }
        return str.substr(lastIndex+1)
    },

    getTomlContext : function (addr) {
        domainStr = this.getSuffixDomain(addr);
        if(domainStr == null) {
            return null;
        }
        var returnVals = null;
        geturl = "http://www."+domainStr+"/.well-known/stellar.toml";
        $.ajax({
            url: geturl,
            type: 'GET',
            cache :false,
            async : false,
            success: function(data, status, xhr) {
                matchExp = /[a-zA-z]+:\/\/[^s]*\/federation/i;
                if(matchExp.test(data)){
                    geturl = matchExp.exec(data).toString();
                    returnVals = geturl + '?q=' + addr + '&type=name';
                }
            }
        });
        return returnVals;
    },

    getAddrFormFederation : function (addr, p) {
        var requestUrl = this.getTomlContext(addr);
        $.ajax({
            url: requestUrl,
            type: 'GET',
            dataType: 'json',
            cache :false,
            async : false,
            success: function(data, status, xhr) {
                p.destAddr = data.account_id;
            },
            error: function(){
                p.destAddr = null;
            }
        });
        if(p.destAddr == null || p.destAddr == undefined || p.destAddr == ''){
            return null;
        }
        return p
    },

    checkAssetandIssuer : function(p) {
        val = this.assetObj.val();
        if(val == '' || val == null || val == undefined || val == 'Lumens') {
            p.assetCode = 'Lumens';
            return p;
        }
        if(this.isCustomAsset == true && val != '' && val !=null && val != undefined) {
            p.assetCode = val;
            p.issuer = mAddress;
            return p;
        }
        indexFlag = val.indexOf(':');
        if(indexFlag == -1){
            return null;
        }
        p.assetCode = val.substr(0,indexFlag);
        p.issuer = val.substr(indexFlag+1, val.length - 1 - indexFlag);
        return p;
    },

    checkAmount : function (p) {
        val = this.amountObj.value;
        if( val == null || val == "" || val == undefined) {
            return null;
        }
        p.amount = parseFloat(val);
        return p;
    },

    checkMemo : function(p) {
        p.memoType = $('#id_pay_memo_select_text')[0].innerText;
        memoVal = $('#id_pay_memo_input')[0].value;
        if(memoVal == "" || memoVal == null || memoVal == undefined) {
            p.memoType = 'NONE';
        } else {
            switch (p.memoType) {
                case "ID":
                    p.memoID = parseInt(memoVal);
                    if(isNaN(p.memoID)){
                        return null;
                    }
                    break;
                case "TEXT":
                    if(memoVal.length > 28) {
                        return null;
                    }
                    p.memoText = memoVal;
                    break;
                case "HASH":
                case "RETURN":
                    if(memoVal == null || memoVal == undefined || memoVal == '' || memoVal.length != 64){
                        return null;
                    }
                    matchVal = memoVal.match(/^[0-9a-fA-F]+$/);
                    if(matchVal == null || matchVal[0].length != memoVal.length){
                        return null;
                    }
                    p.memoHash = memoVal;
                    break;
                default :
                    return null;
            }
        }
        return p;
    }
};

var paymentExecute = {
    contextMsgDiv : null,
    contextMsgObj : null,
    payInfo : null,

    initPaymentExe : function(p){
        this.contextMsgDiv = $('#id_execute_msg_div')[0];
        this.contextMsgObj = $('#id_execute_msg_context')[0];
        this.payInfo = p;
    },

    getPaymentstep1Msg : function (flag,args){
        switch (flag){
            case "CHECK_ACCOUNT":
                if (mLanguage == 'cn')
                    return "正在检查["+args[0]+"]有效性...";
                return "Reading ["+args[0]+"] information...";
            case "ADDR_NOT_PAIR_SCR":
                if (mLanguage == 'cn')
                    return "签名Key与发送账户地址不匹配!";
                return "Signature Key does not match the sending account address!";
            case "ACCOUNT_VALID":
                if (mLanguage == 'cn')
                    return "账户余额["+args[0]+"]";
                return "Account balance["+args[0]+"]";
            case "BALANCE_NOT_VALID":
                if (mLanguage == 'cn')
                    return "账户余额["+args[0]+"]不足!";
                return "Insufficient account balance["+args[0]+"]!";
            case "SOURCE_ADDR_INVALID":
                if (mLanguage == 'cn')
                    return "账户["+args[0]+"]检查过程中出现错误!";
                return "An error occurred during the checking of the account["+args[0]+"]!";

        }
        return "";
    },

    getPaymentstep2Msg : function (flag,args){
        switch (flag){
            case "CHECK_DEST_ADDR_INFO":
                if (mLanguage == 'cn')
                    return "正在检查["+args[0]+"]有效性...";
                return "Reading ["+args[0]+"] informations...";
            case "DEST_ADDR_VALID":
                if (mLanguage == 'cn')
                    return "目标地址账户余额["+args[0]+"]";
                return "Destination account balance["+args[0]+"]";
            case "DEST_ADDR_NOT_EXIST":
                if (mLanguage == 'cn')
                    return "目标地址["+args[0]+"]不存在,需要新建账户.";
                return "Destination account address ["+args[0]+"] is not exist.";
            case "DEST_ADDR_INVALID":
                if (mLanguage == 'cn')
                    return "目标地址["+args[0]+"]检查过程中出现错误!";
                return "An error occurred during the checking of the destination account["+args[0]+"]!";
            case "AMOUNT_IS_NOT_VALID":
                if (mLanguage == 'cn')
                    return "失败!新建账户最少需要 20 lumens,当前发送金额为["+args[0]+"]!";
                return "Failure! Create accounts need at least 20 lumens, the current amount is ["+args[0]+"]!";
        }
        return "";
    },

    getPaymentstep3Msg : function (flag,args){
        switch (flag){
            case "BEGIN_SENDING":
                if (mLanguage == 'cn')
                    return "开始发送...";
                return "Begin sending...";
            case "SUCCESS_SIGNED":
                if (mLanguage == 'cn')
                    return "签名成功!执行发送,请稍后...";
                return "Signature success! Executing signature, please wait...";
            case "SEND_SUCCESS":
                if (mLanguage == 'cn')
                    return "发送成功!";
                return "Send success!";
            case "SEND_ERROR":
                if (mLanguage == 'cn')
                    return "发送过程中发生错误!";
                return "An error occurred during the sending!";
        }
        return "";
    },

    getPaymentstep4Msg : function (flag,args){
        switch (flag){
            case "BEGIN_CREATE_NEW_ACCOUNT":
                if (mLanguage == 'cn')
                    return "开始新建账户...";
                return "Begin create account...";
            case "SUCCESS_SIGNED":
                if (mLanguage == 'cn')
                    return "签名成功!执行发送,请稍后...";
                return "Signature success! Executing signature, please wait...";
            case "SEND_SUCCESS":
                if (mLanguage == 'cn')
                    return "发送成功!";
                return "Send success!";
            case "SEND_ERROR":
                if (mLanguage == 'cn')
                    return "发送过程中发生错误!";
                return "An error occurred during the sending!";
        }
        return "";
    },

    getPaymentMessage : function(step,flag,args){
        switch (step){
            case 1:
                return this.getPaymentstep1Msg(flag,args);
            case 2:
                return this.getPaymentstep2Msg(flag,args);
            case 3:
                return this.getPaymentstep3Msg(flag,args);
            case 4:
                return this.getPaymentstep4Msg(flag,args);
        }
        return "";
    },

    clearContext : function() {
        this.contextMsgDiv.setAttribute('style','display: none;');
        this.contextMsgObj.innerText = '';
    },

    appendContext : function(msg) {
        this.contextMsgDiv.setAttribute('style','display: inherit;');
        this.contextMsgObj.innerText = this.contextMsgObj.innerText + '\r\n  ' + msg;
    },

    ExecutePayment : function() {
        this.clearContext();

        setStellarNetwork("LIVE");

        this.Step1();
    },

    // 先检查源地址是否存在，余额是不是够进行支付
    Step1 : function () {
        paymentExecute.appendContext(this.getPaymentMessage(1,"CHECK_ACCOUNT",[paymentExecute.payInfo.srcAddr]));

        getUrl = StellarCurrentNetworkUrl + StellarAccounts + '/' + paymentExecute.payInfo.srcAddr;
        $.ajax({
            url: getUrl,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                if(data.balances != null && data.sequence != null) {
                    accInfo = AccountInfoDecode(data);
                    paymentExecute.payInfo.sequence = accInfo.Sequence;
                    if (paymentExecute.payInfo.assetCode == 'Lumens'){
                        if ((accInfo.LumensBalance - paymentExecute.payInfo.amount - 20) > 0) {
                            paymentExecute.appendContext(paymentExecute.getPaymentMessage(1,"ACCOUNT_VALID",[accInfo.LumensBalance]));
                            paymentExecute.Step2();
                        }else{
                            paymentExecute.appendContext(paymentExecute.getPaymentMessage(1,"BALANCE_NOT_VALID",[accInfo.LumensBalance]));
                        }
                    } else {
                        paymentExecute.Step2();
                    }
                } else {
                    paymentExecute.appendContext(AccountPayment.uiViews.err_Account_not_exist);
                }
            },
            error: function(xhr, status, e) {
                if(xhr.status == 404 && xhr.statusText == 'Not Found') {
                    paymentExecute.appendContext(AccountPayment.uiViews.err_Account_not_exist);
                } else {
                    paymentExecute.appendContext(e);
                }
            }
        });
    },

    // 检查接收账户
    Step2 : function () {
        msg = paymentExecute.getPaymentMessage(2,"CHECK_DEST_ADDR_INFO",[paymentExecute.payInfo.destAddr]);
        paymentExecute.appendContext(msg);
        getUrl = StellarCurrentNetworkUrl + StellarAccounts + '/' + paymentExecute.payInfo.destAddr;
        $.ajax({
            url: getUrl,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                if(data.balances != null && data.sequence != null) {
                    accInfo = AccountInfoDecode(data);
                    paymentExecute.appendContext(paymentExecute.getPaymentMessage(2,"DEST_ADDR_VALID",[accInfo.LumensBalance]));
                    paymentExecute.Step3(false);
                } else {
                    paymentExecute.appendContext(AccountPayment.uiViews.err_Account_not_exist);
                }
            },
            error: function(xhr, status, e) {
                if(xhr.status == 404 && xhr.statusText == 'Not Found') {
                    paymentExecute.appendContext(paymentExecute.getPaymentMessage(2,"DEST_ADDR_NOT_EXIST",[paymentExecute.payInfo.destAddr]));
                    if(paymentExecute.payInfo.amount > 20 && paymentExecute.payInfo.assetCode == 'Lumens') {
                        paymentExecute.Step3(true);
                    } else {
                        paymentExecute.appendContext(paymentExecute.getPaymentMessage(2,"AMOUNT_IS_NOT_VALID",[paymentExecute.payInfo.amount]));
                    }
                } else {
                    paymentExecute.appendContext(e);
                }
            }
        });
    },

    getPaymentOperation : function() {
        asset = null;
        if(paymentExecute.payInfo.assetCode != 'Lumens'){
            asset = new StellarSdk.Asset(paymentExecute.payInfo.assetCode, paymentExecute.payInfo.issuer);
        } else {
            asset = StellarSdk.Asset.native();
        }

        return StellarSdk.Operation.payment({
            destination: paymentExecute.payInfo.destAddr,
            amount: ''+paymentExecute.payInfo.amount,
            source: paymentExecute.payInfo.srcAddr,
            asset: asset
        });
    },

    getCreateAccOperation : function() {
        return StellarSdk.Operation.createAccount({
            destination: paymentExecute.payInfo.destAddr,
            startingBalance: ''+paymentExecute.payInfo.amount,
            source: paymentExecute.payInfo.srcAddr
        });
    },

    getMemo : function() {
        memo = null;
        switch(this.payInfo.memoType) {
            case "ID":
                memo = StellarSdk.Memo.id(''+paymentExecute.payInfo.memoID);
                break;
            case "TEXT":
                memo = StellarSdk.Memo.text(paymentExecute.payInfo.memoText);
                break;
            case "HASH":
                memo = StellarSdk.Memo.hash(paymentExecute.payInfo.memoHash);
                break;
            case "RETURN":
                memo = StellarSdk.Memo.returnHash(paymentExecute.payInfo.memoHash);
                break;
            default:
                memo = StellarSdk.Memo.none();
        }
        return memo;
    },

    getTransaction : function(opera, memo) {
        trans = new StellarSdk.TransactionBuilder(new StellarSdk.Account(paymentExecute.payInfo.srcAddr, paymentExecute.payInfo.sequence));
        trans.addOperation(opera);
        if(memo != null){
            trans.addMemo(memo);
        }
        trans = trans.build();
        uencKey = TransDecrypt(mKey0.substr(0,16), paymentExecute.payInfo.skey, true);
        trans.sign(StellarSdk.Keypair.fromSeed(uencKey));
        uencKey = '';
        return trans;
    },

    // 目标账户存在，发送
    Step3 : function (newAcc) {
        opera = null;
        if (newAcc) {
            paymentExecute.appendContext(paymentExecute.getPaymentMessage(4,"BEGIN_CREATE_NEW_ACCOUNT"));
            opera = paymentExecute.getCreateAccOperation();
        } else {
            paymentExecute.appendContext(this.getPaymentMessage(3,"BEGIN_SENDING"));
            opera = paymentExecute.getPaymentOperation();
        }

        base64 = paymentExecute.getTransaction(opera, paymentExecute.getMemo()).toEnvelope().toXDR().toString("base64");

        paymentExecute.appendContext(paymentExecute.getPaymentMessage(3,"SUCCESS_SIGNED"));
        urlpost = StellarCurrentNetworkUrl + StellarTransactions;

        $.ajax({
            url: urlpost,
            type: 'POST',
            data: 'tx=' + encodeURIComponent(base64),
            async : true,
            cache :false,
            success: function(data, status,xhr){
                paymentExecute.appendContext(paymentExecute.getPaymentMessage(3,"SEND_SUCCESS"));
                AccountPayment.resetConfirmBtnIcon();
            },
            error: function (xhr, status, e) {
                paymentExecute.appendContext(paymentExecute.getPaymentMessage(3,"SEND_ERROR"));
                paymentExecute.appendContext(xhr.responseText);
                AccountPayment.resetConfirmBtnIcon();
            }
        })
    }
};