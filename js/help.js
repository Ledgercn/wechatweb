/**
 * Created by jojopoper on 2016/12/23.
 */

var HelpIndex = {
    uiViews : {},

    initController : function () {
        var useRefresh = true;
        if(ptPage == 'false'){
            mLanguage = setLanguage;
            useRefresh = false;
        }
        if(mLanguage == null || mLanguage == undefined || mLanguage == "") {
            mLanguage = 'en';
        }
        this.initStrings();
        this.initView();
        if(useRefresh) {
            this.threadCheck();
            setInterval(this.threadCheck,40000);
        }
    },

    initStrings : function() {
        if(mLanguage == 'cn') {
            this.uiViews.id_help_heading_cap = "帮助";
            this.uiViews.id_help_wx_cmd_cap = "微信LumenStar公众号命令列表";
            this.uiViews.id_help_cmd_reg_cap = "注册命令";
            this.uiViews.id_help_cmd_reg_memo = "在微信公众号输入框中输入“signup”或“注册”或“zc”并发送，公众号会对没有注册的用户返回一个注册链接，点击注册链接进入注册界面。";
            this.uiViews.id_help_cmd_help_cap = "帮助命令";
            this.uiViews.id_help_cmd_help_memo = "在微信公众号输入框中输入“help”或“帮助”或“?”或“？”并发送，公众号会返回一个帮助链接，点击链接进入帮助界面。";
            this.uiViews.id_help_cmd_wallet_cap = "钱包命令";
            this.uiViews.id_help_cmd_wallet_memo = "在微信公众号输入框中输入“wallet”或“钱包”或“qb”并发送，公众号会返回一个钱包链接，点击链接进入钱包界面。";
            this.uiViews.id_help_cmd_language_cap = "修改语言";
            this.uiViews.id_help_cmd_language_memo = "在微信公众号输入框中输入“setlanguage=[中文/English]”并发送，可以设置用户习惯的语言。当前只支持中文和英文两种语言。例如输入： setlanguage=English 发送";
            this.uiViews.id_help_cmd_blockchain_cap = "区块浏览";
            this.uiViews.id_help_cmd_blockchain_memo = "在微信公众号输入框中输入“blockchain”或“bc”或“区块浏览”或“qkll”并发送，公众号会返回一个区块链浏览链接，点击链接进入区块链浏览页面。";
            this.uiViews.id_help_cmd_history_cap = "历史查询";
            this.uiViews.id_help_cmd_history_memo = "在微信公众号输入框中输入“history”或“历史”或“ls”并发送，公众号会返回一个账户历史查询链接，点击链接进入账户历史查询页面。";
            this.uiViews.err_server_data_invalid = "你的网络连接出现问题或者你所使用的连接已经超时，请从公众号重新发起请求。";
        } else {
            this.uiViews.id_help_heading_cap = "Help";
            this.uiViews.id_help_wx_cmd_cap = "Wechat LumenStar subscription command list";
            this.uiViews.id_help_cmd_reg_cap = "Registration command";
            this.uiViews.id_help_cmd_reg_memo = 'Enter "signup" or "zc" in the LumenStar subscription input box and send it. The LumenStar subscription will return a registration link for the unregistered user. Click the registration link to enter the registration interface.';
            this.uiViews.id_help_cmd_help_cap = "Help command";
            this.uiViews.id_help_cmd_help_memo = 'Enter "help" or "?" in the LumenStar subscription input box and send it. The LumenStar subscription will return a help link for the user. Click the help link to enter the help interface.';
            this.uiViews.id_help_cmd_wallet_cap = "Wallet command";
            this.uiViews.id_help_cmd_wallet_memo = 'Enter "wallet" or "qb" in the LumenStar subscription input box and send it. The LumenStar subscription will return a wallet link for the user. Click the wallet link to enter the wallet interface.';
            this.uiViews.id_help_cmd_language_cap = "Language command";
            this.uiViews.id_help_cmd_language_memo = 'Enter "setlanguage=[中文 / English]" in the LumenStar subscription input box and send, you can set the language that the user is accustomed to. Currently, only Chinese and English are supported. For example, enter: setlanguage=English and Send';
            this.uiViews.id_help_cmd_blockchain_cap = 'Block Chain explorer';
            this.uiViews.id_help_cmd_blockchain_memo = 'Enter "blockchain" or "bc" in the LumenStar subscription input box and send it. The LumenStar subscription will return a block chain explorer link for the user. Click the help link to enter the block chain explorer interface.';
            this.uiViews.id_help_cmd_history_cap = "User History";
            this.uiViews.id_help_cmd_history_memo = 'Enter "history" or "ls" in the LumenStar subscription input box and send it. The LumenStar subscription will return a history link for the user. Click the help link to enter the history interface.';
            this.uiViews.err_server_data_invalid = "Your network connection has problems or your connection has timed out, please restart the request from the subscription.";
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","帮助 - LumenStar");
        } else {
            $(document).attr("title","Help - LumenStar");
        }

        $('#id_help_heading_cap')[0].innerText = this.uiViews.id_help_heading_cap;
        $('#id_help_wx_cmd_cap')[0].innerText = this.uiViews.id_help_wx_cmd_cap;
        $('#id_help_cmd_reg_cap')[0].innerText = this.uiViews.id_help_cmd_reg_cap;
        $('#id_help_cmd_reg_memo')[0].innerText = this.uiViews.id_help_cmd_reg_memo;
        $('#id_help_cmd_help_cap')[0].innerText = this.uiViews.id_help_cmd_help_cap;
        $('#id_help_cmd_help_memo')[0].innerText = this.uiViews.id_help_cmd_help_memo;
        $('#id_help_cmd_wallet_cap')[0].innerText = this.uiViews.id_help_cmd_wallet_cap;
        $('#id_help_cmd_wallet_memo')[0].innerText = this.uiViews.id_help_cmd_wallet_memo;
        $('#id_help_cmd_language_cap')[0].innerText = this.uiViews.id_help_cmd_language_cap;
        $('#id_help_cmd_language_memo')[0].innerText = this.uiViews.id_help_cmd_language_memo;
        $('#id_help_cmd_blockchain_cap')[0].innerText = this.uiViews.id_help_cmd_blockchain_cap;
        $('#id_help_cmd_blockchain_memo')[0].innerText = this.uiViews.id_help_cmd_blockchain_memo;
        $('#id_help_cmd_history_cap')[0].innerText = this.uiViews.id_help_cmd_history_cap;
        $('#id_help_cmd_history_memo')[0].innerText = this.uiViews.id_help_cmd_history_memo;
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
                checkSuccess(data,status,xhr, "../error.html", HelpIndex.uiViews.err_server_data_invalid);
                saveKeyDatas();
            },
            error: function (xhr, status, e) {
                errorResponse(xhr, status, e, "../error.html", "Lost connection with server");
            }
        })
    },
};

function saveCommom() {
    if(ptPage == 'true') {
        saveKeyDatas();
    }
}

function readCommom() {
    if(ptPage == 'true') {
        readKeyDatas();
        if(mAddress == undefined || mAddress == null || mAddress == '') {
            ptPage = 'false';
        }
    }
}