/**
 * Created by jojopoper on 2016/12/17.
 */

var WalletIndex = {
    uiViews:{},
    qrvisible: false,

    initController : function () {
        this.initStrings();
        this.initView();
        this.threadCheck();
        setInterval(this.threadCheck,40000);
        $('#qrcode').qrcode({
            render: "canvas", //table方式
            width:  250, //宽度
            height: 250, //高度
            text: mAddress,
        });
    },

    initStrings : function() {
        this.uiViews.id_unique_text = mUnique;
        if(mLanguage == "cn"){
            this.uiViews.id_userinfor_head = "用户详细信息";
            this.uiViews.id_userinfor_memo = "账户基础信息 & Lumens余额 & 资产余额等";
            this.uiViews.id_payment_head = "支付";
            this.uiViews.id_payment_memo = "Lumens & 资产 支付";
            this.uiViews.id_history_head = "账户历史";
            this.uiViews.id_history_memo = "账户的操作和支付所有区块链上的历史查询";
            this.uiViews.id_search_head = "查询";
            this.uiViews.id_search_memo = "用户查询";
            this.uiViews.id_help_head = "帮助";
            this.uiViews.id_help_memo = "使用帮助，能够帮助使用者了解并掌握使用方法";

            this.uiViews.err_server_data_invalid = "你的网络连接出现问题或者你所使用的连接已经超时，请从公众号重新发起请求。";
        } else {
            this.uiViews.id_userinfor_head = "User Information";
            this.uiViews.id_userinfor_memo = "Account information & Lumens balance & Asset balance ...";
            this.uiViews.id_payment_head = "Payment";
            this.uiViews.id_payment_memo = "Lumens & assets payment";
            this.uiViews.id_history_head = "Account history";
            this.uiViews.id_history_memo = "Account operations and payment history queries on block chains";
            this.uiViews.id_search_head = "Search";
            this.uiViews.id_search_memo = "Search user";
            this.uiViews.id_help_head = "Help";
            this.uiViews.id_help_memo = "The help to help users understand and master the use of methods";

            this.uiViews.err_server_data_invalid = "Your network connection has problems or your connection has timed out, please restart the request from the subscription.";
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","LumenStar - 服务");
        } else {
            $(document).attr("title","LumenStar - Service");
        }
        $("#id_unique_text")[0].innerText = this.uiViews.id_unique_text;
        $("#id_userinfor_head")[0].innerText = this.uiViews.id_userinfor_head;
        $("#id_userinfor_memo")[0].innerText = this.uiViews.id_userinfor_memo;
        $("#id_payment_head")[0].innerText = this.uiViews.id_payment_head;
        $("#id_payment_memo")[0].innerText = this.uiViews.id_payment_memo;
        $("#id_history_head")[0].innerText = this.uiViews.id_history_head;
        $("#id_history_memo")[0].innerText = this.uiViews.id_history_memo;
        $("#id_search_head")[0].innerText = this.uiViews.id_search_head;
        $("#id_search_memo")[0].innerText = this.uiViews.id_search_memo;
        $("#id_help_head")[0].innerText = this.uiViews.id_help_head;
        $("#id_help_memo")[0].innerText = this.uiViews.id_help_memo;
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
                checkSuccess(data,status,xhr, "../error.html", WalletIndex.uiViews.err_server_data_invalid);
                saveKeyDatas();
            },
            error: function (xhr, status, e) {
                errorResponse(xhr, status, e, "../error.html", "Lost connection with server");
            }
        })
    },

    userInfoClick : function() {
        parent.location = 'accountdetails.html?' + randomParam();
    },

    paymentClick : function() {
        parent.location = 'payment.html?' + randomParam();
    },

    helpClick : function() {
        parent.location = '../help/index.html?l=' + mLanguage + '&pt=true&' + randomParam();
    },

    PageLeave : function() {
        saveKeyDatas();
    },

    qrcodeClick : function() {
        this.qrvisible = !this.qrvisible;
        if(this.qrvisible){
            $('#id_qrcode_div')[0].setAttribute('style','display: inherit;');
            $('#id_userinfo_list_div')[0].setAttribute('style','display: none;');
            $('#id_qrcode_btn')[0].setAttribute('class','btn fa fa-navicon');
        } else {
            $('#id_qrcode_div')[0].setAttribute('style','display: none;');
            $('#id_userinfo_list_div')[0].setAttribute('style','display: inherit;');
            $('#id_qrcode_btn')[0].setAttribute('class','btn fa fa-qrcode');
        }
    }
};

function checkDatas() {
    v = $.cookie('validation');
    if(v == undefined || v == null || v == "") {
        readSaveDatas();
        completeResponse(null,'success');
        return;
    }

    l = $.cookie("language");
    if(l != 'en') {
        l = 'cn';
    }

    $.ajax({
        url: CurrentServer + '/validation',
        type: 'POST',
        data: 't=walletloading&v='+ v + '&l=' + l,
        async: true,
        cache :false,
        success: successResponse,
        error: function (xhr, status, e) {
            errorResponse(xhr, status, e, "../error.html", "Lost connection with server");
        },
        complete: completeResponse
    });
}

function successResponse(data, status,xhr) {
    //console.log("successResponse: data");
    jsonobj=eval("("+data+")");
    if (jsonobj.codeid == ReturnCorrectlyFlag) {
        mLanguage = decodeURIComponent(jsonobj.language);
        mUserID = decodeURIComponent(jsonobj.data.id);
        mUpdateTime = decodeURIComponent(jsonobj.data.time);
        mTransKey = decodeURIComponent(jsonobj.data.skey);
        mUnique = decodeURIComponent(jsonobj.data.unique);
        mKey0 = decodeURIComponent(jsonobj.data.key0);
        mKey1 = decodeURIComponent(jsonobj.data.key1);
        mAddress = decodeURIComponent(jsonobj.data.address);

        mKey0 = TransDecrypt(mTransKey, mKey0, true);
        mKey1 = TransDecrypt(mTransKey, mKey1, true);
        mUnique = TransDecrypt(mTransKey, mUnique, true);
        mAddress = TransDecrypt(mTransKey, mAddress, true);
        ParamCheckValid();

        console.log('mLanguage = ' + mLanguage);
        console.log('mUserID = ' + mUserID);
        console.log('mUpdateTime = ' + mUpdateTime);
        console.log('mTransKey = ' + mTransKey);
        console.log('mUnique = ' + mUnique);
        console.log('mKey0 = ' + mKey0);
        console.log('mKey1 = ' + mKey1);
        console.log('mAddress = ' + mAddress);
    } else if (jsonobj.codeid == UserNotExistFlag) { // 用户不存在
        parent.location = '../index.html';
    } else {
        parent.location = '../error.html?details='+ encodeURI(jsonobj.error) + "&" + randomParam();
    }
}

function completeResponse(xhr,code) {
    if (code != "success") {
        parent.location = '../error.html?details='+ encodeURI("The server is stopped, please wait.")  + "&" + randomParam();
    } else {
        WalletIndex.initController();
    }
    $.cookie('validation',null,{path:'/', expires: -1});
    //console.log(code);
}


function readSaveDatas() {
    readKeyDatas();
    console.log('cookie mLanguage = ' + mLanguage);
    console.log('cookie mUserID = ' + mUserID);
    console.log('cookie mUpdateTime = ' + mUpdateTime);
    console.log('cookie mTransKey = ' + mTransKey);
    console.log('cookie mUnique = ' + mUnique);
    console.log('cookie mKey0 = ' + mKey0);
    console.log('cookie mKey1 = ' + mKey1);
    console.log('cookie mAddress = ' + mAddress);
    ParamCheckValid();
}

function ParamCheckValid() {
    if (mLanguage != "en") {
        mLanguage = "cn";
    } else {
        mLanguage = "en";
    }

    if (mUserID == null || mUserID == undefined || mUserID == "") {
        if (mLanguage == "cn"){
            parent.location = '../error.html?details='+ encodeURIComponent("用户信息获取失败或者失去和服务器连接！");
        } else {
            parent.location = '../error.html?details='+ encodeURIComponent("Can not read user informations or lost connection with server!");
        }
        return false;
    }
    if (mUnique == undefined || mUnique == null || mUnique == "" ||
        mTransKey == undefined || mTransKey == null || mTransKey == "" ||
        mKey0 == undefined || mKey0 == null || mKey0 == "" ||
        mKey1 == undefined || mKey1 == null || mKey1 == "" ||
        mAddress == undefined || mAddress == null || mAddress == "" ) {
        if(mLanguage == "cn"){
            parent.location = "../error.html?details=" + encodeURIComponent("为保证您的安全，请使用正确连接进入！");
        } else {
            parent.location = "../error.html?details=" + encodeURIComponent("To ensure your safety, please use the correct connection to enter!");
        }
        return false;
    }
    return true;
}
