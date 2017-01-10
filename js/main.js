/**
 * Created by jojopoper on 2016/12/05.
 */
//var server = StellarBase.Server('https://horizon-testnet.stellar.org');
//StellarBase.Network.useTestNetwork();

var MainController = {
    uiViews:{},
    waiting:false,
    showSeed:false,
    addressPair : StellarSdk.Keypair.random(),
    regUserInfo:{},

    initController : function() {
        this.readCookie();
        this.initStrings();
        this.initView();
        this.getAccount('id_address_input','id_address_public');
        setInterval(this.threadCheck,40000);
    },

    readCookie : function() {
        if (mLanguage != "cn") {
            mLanguage = "en";
        } else {
            mLanguage = "cn";
        }
    },

    initStrings : function() {
        if(mLanguage == "en") {
            this.uiViews.id_header = "User login/sign up";
            this.uiViews.id_identification_placeholder = "Enter A~Z or 0~9, a total of 6 characters";
            this.uiViews.id_identification_cap = "User unique ID";
            this.uiViews.id_identification_memo = "Required, a fixed length of 6 characters, only allowed to enter English letters and digital, it will be the unique identification.";
            this.uiViews.id_passowrd_cap = "User password";
            this.uiViews.id_password1_placeholder = "It is used to authenticate the user";
            this.uiViews.id_password1_memo = "Required, The length is at least 6 characters, the longest 50 characters.";
            this.uiViews.id_password2_placeholder = "Input password again";
            this.uiViews.id_password2_memo = "Required, please  ensure that the password is exactly the same";
            this.uiViews.id_address_cap = "Stellar account";
            this.uiViews.id_address_memo = "The above account is randomly generated, if you are not satisfied, you can click on the button to re-generate";
            this.uiViews.id_confirmbtn = " Confirm";

            this.uiViews.err_server_data_invalid = "Your network connection has problems or your connection has timed out, please restart the request from the subscription.";
            this.uiViews.err_skey_invalid = '"SKEY" format is illegal, please check!';
            this.uiViews.err_id_format_invalid = 'There is an error in "User Unique ID". Please check!';
            this.uiViews.err_pwd_format_invalid = 'There is an error in "User password". Please check!';
            this.uiViews.err_pwd_notsame_invalid = '"User password" twice enter inconsistent!';
        } else {
            this.uiViews.id_header = "用户注册/登录";
            this.uiViews.id_identification_placeholder = "输入A~Z或0~9，共6位";
            this.uiViews.id_identification_cap = "用户唯一标示";
            this.uiViews.id_identification_memo = "必填，固定长度6字符，只允许输入英文字母（不区分大小写）和数字，将作为唯一用户标示";
            this.uiViews.id_passowrd_cap = "用户密码";
            this.uiViews.id_password1_placeholder = "用户密码用于验证用户";
            this.uiViews.id_password1_memo = "必填，长度最少为6个字符，最长50个字符";
            this.uiViews.id_password2_placeholder = "再次输入密码";
            this.uiViews.id_password2_memo = "必填，请保证两次密码输入完全一致";
            this.uiViews.id_address_cap = "恒星地址";
            this.uiViews.id_address_memo = "以上地址为随机生成，如果不满意可以点击按键重新生成";
            this.uiViews.id_confirmbtn = " 完成";

            this.uiViews.err_server_data_invalid = "你的网络连接出现问题或者你所使用的连接已经超时，请从公众号重新发起请求。";
            this.uiViews.err_skey_invalid = '"SKEY" 格式错误，请检查！';
            this.uiViews.err_id_format_invalid = '"用户唯一标示"中存在错误，请检查！';
            this.uiViews.err_pwd_format_invalid = '"用户密码"中存在错误，请检查！';
            this.uiViews.err_pwd_notsame_invalid = '"用户密码"两次输入不一致！';
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","注册 - LumenStar");
        } else {
            $(document).attr("title","Registration - LumenStar");
        }
        $("#id_header")[0].innerText = this.uiViews.id_header;
        $("#id_identification_cap")[0].innerText = this.uiViews.id_identification_cap;
        $("#id_identification_input")[0].setAttribute("placeholder",this.uiViews.id_identification_placeholder);
        $("#id_identification_memo")[0].innerText = this.uiViews.id_identification_memo;
        $("#id_passowrd_cap")[0].innerText = this.uiViews.id_passowrd_cap;
        $("#id_password_input1")[0].setAttribute("placeholder",this.uiViews.id_password1_placeholder);
        $("#id_password_memo1")[0].innerText = this.uiViews.id_password1_memo;
        $("#id_password_input2")[0].setAttribute("placeholder",this.uiViews.id_password2_placeholder);
        $("#id_password_memo2")[0].innerText = this.uiViews.id_password2_memo;
        $("#id_address_cap")[0].innerText = this.uiViews.id_address_cap;
        $("#id_address_memo")[0].innerText = this.uiViews.id_address_memo;
        $("#id_confirmbtn")[0].innerText = this.uiViews.id_confirmbtn;
    },

    threadCheck : function() {

        if (mUserID == null || mUserID == undefined) {
            if (mLanguage == "cn"){
                parent.location = 'error.html?details='+ encodeURI("用户信息获取失败或者失去和服务器连接！") + "&" + randomParam();
            } else {
                parent.location = 'error.html?details='+ encodeURI("Can not read user informations or lost connection with server!") + "&" + randomParam();
            }
            return;
        }

        $.ajax({
            url: CurrentServer + '/validation',
            type: 'POST',
            data: 't=refuserinfo&userid=' + encodeURIComponent(mUserID) + '&l=' + MainController.curLanguage  + "&" + randomParam(),
            async : true,
            cache :false,
            success: function(data, status,xhr){
                checkSuccess(data,status,xhr, "error.html", MainController.uiViews.err_server_data_invalid);
            },
            error: function (xhr, status, e) {
                errorResponse(xhr, status, e, "error.html", "Lost connection with server");
            }
        })
    },

    getAccount : function (inputid,publicid) {
        $("#id_error_div")[0].setAttribute("style","display: none;");
        this.addressPair = StellarSdk.Keypair.random();
        $("#"+inputid)[0].value = this.addressPair.seed();
        $("#"+publicid)[0].innerText = this.addressPair.accountId();
    },

    showSeedAddr : function (inputid,btnid) {
        this.showSeed = !this.showSeed;
        if(this.showSeed){
            $("#"+inputid)[0].setAttribute("type","text");
            $("#"+btnid)[0].setAttribute("class","fa fa-eye-slash");
        } else {
            $("#"+inputid)[0].setAttribute("type","password");
            $("#"+btnid)[0].setAttribute("class","fa fa-eye");
        }
    },

    changeSkey : function (skey) {
        try{
            this.addressPair = StellarSdk.Keypair.fromSeed(skey);
            $("#id_address_public")[0].innerText = this.addressPair.accountId();
        }catch(ex){
            $("#id_address_public")[0].innerText = "";
            this.showErrorMsg(this.uiViews.err_skey_invalid);
            return false;
        }
        $("#id_error_div")[0].setAttribute("style","display: none;");
        return true;
    },

    showErrorMsg : function (errMsg) {
        errobj = $("#id_error_div")[0].setAttribute("style","display: inherit;");
        $("#id_error_msg")[0].innerText = errMsg;
    },

    Confirm : function(){
        if(!this.checkDatasValid()){
            return;
        }

        if (mUserID == null || mUserID == undefined) {
            parent.location = 'error.html?details='+ encodeURI("Can not get user informations!");
            return;
        }

        $("#id_confirmbtnIcon")[0].setAttribute("class","fa fa-spinner fa-pulse");
        while(MainController.waiting){
            $.delay(300);
        }

        reqParam = this.getSignupRequest();
        if (reqParam == ""){
            if(mLanguage == "cn"){
                parent.location = 'error.html?details='+ encodeURI("你的请求连接验证错误，请重新尝试！");
            } else {
                parent.location = 'error.html?details='+ encodeURI("Your request is invalid, please try again!");
            }
            return;
        }
        $.ajax({
            url: CurrentServer + '/validation',
            type: 'POST',
            data: 't=signup&userid=' + encodeURIComponent(mUserID) + '&l=' + mLanguage + reqParam,
            async : true,
            success: function(data, status,xhr){
                jsonobj=eval("("+data+")");
                if (jsonobj.codeid == 0) {
                    var date = new Date();
                    date.setTime(date.getTime() + (60 * 1000)); // 30 senconds timeout
                    MainController.waiting = true;
                    $.cookie('userid', decodeURI(jsonobj.data.id), {path:'/', expires: date});
                    $.cookie('time', decodeURI(jsonobj.data.time), {path:'/', expires: date});
                    $.cookie('language', decodeURI(jsonobj.language), {path:'/', expires: 7}); // , domain:'ledgercn.com'
                    $.cookie('unique',MainController.regUserInfo.UniqueId, {path:'/', expires: 30});
                    $.cookie('key0',MainController.regUserInfo.key0, {path:'/', expires: 7});
                    $.cookie('key1',MainController.regUserInfo.key1, {path:'/', expires: 7});
                    $.cookie('address',MainController.regUserInfo.PublicAddr, {path:'/', expires: 30});
                    $.cookie('transkey',mTransKey, {path:'/', expires: 30});
                    MainController.waiting = false;
                    parent.location = "wallet/index.html?" + randomParam();
                } else if (jsonobj.codeid == 6){ // 用户提供参数错误
                    if(mLanguage == 'cn') {
                        MainController.showErrorMsg('提供的用户唯一ID已经被占用，或当前恒星地址已经被使用。');
                    } else {
                        MainController.showErrorMsg('The supplied user unique ID has been occupied, or the current stellar address has been used.');
                    }
                } else {
                    parent.location = "error.html?details=" + encodeURIComponent(MainController.uiViews.err_server_data_invalid + "\r\n" + jsonobj.error) + "&" + randomParam();
                }
            },
            error:function (xhr, status, e) {
                errorResponse(xhr, status, e, "error.html", "Lost connection with server");
            },
            complete: function () {
                $("#id_confirmbtnIcon")[0].setAttribute("class","fa fa-check");
            }
        })
    },

    checkDatasValid : function() {
        $("#id_error_div")[0].setAttribute("style","display: none;");

        idinput = $("#id_identification_input")[0].value;
        if(idinput == undefined || idinput == "" || idinput.length != 6){
            this.showErrorMsg(this.uiViews.err_id_format_invalid);
            return false;
        }
        pwd1input = $("#id_password_input1")[0].value;
        pwd2input = $("#id_password_input2")[0].value;
        if(pwd1input == undefined || pwd1input == "" || pwd1input.length < 6 || pwd2input == undefined || pwd2input == "" || pwd2input.length < 6) {
            this.showErrorMsg(this.uiViews.err_pwd_format_invalid);
            return false;
        }
        if(pwd1input != pwd2input) {
            this.showErrorMsg(this.uiViews.err_pwd_notsame_invalid);
            return false;
        }

        return this.changeSkey($("#id_address_input")[0].value);
    },

    getSignupRequest : function () {
        this.regUserInfo.UniqueId = $("#id_identification_input")[0].value;
        this.regUserInfo.key0 = CryptoJS.SHA512(this.regUserInfo.UniqueId + "_" + $("#id_password_input1")[0].value).toString(CryptoJS.enc.Hex);
        //this.regUserInfo.key1 = EncSecretKey($("#id_address_input")[0].value,this.regUserInfo.key0);
        this.regUserInfo.key1 = TransEncrypt(this.regUserInfo.key0.substr(0,16),$("#id_address_input")[0].value);
        this.regUserInfo.PublicAddr = StellarSdk.Keypair.fromSeed($("#id_address_input")[0].value).accountId();
        this.addressPair = null;
        clearInput('id_password_input1');
        clearInput('id_password_input2');
        clearInput('id_address_input');
        if (mTransKey == undefined || mTransKey == "" || mTransKey == null ) {
            return ""
        }
        //console.log(mTransKey);
        //console.log(this.regUserInfo.UniqueId);
        //console.log(this.regUserInfo.key0);
        //console.log(this.regUserInfo.key1);
        //console.log(this.regUserInfo.PublicAddr);
        enc_unid = TransEncrypt(mTransKey,this.regUserInfo.UniqueId);
        enc_key0 = TransEncrypt(mTransKey,this.regUserInfo.key0);
        enc_key1 = TransEncrypt(mTransKey,this.regUserInfo.key1);
        enc_pubadd = TransEncrypt(mTransKey,this.regUserInfo.PublicAddr);
        //console.log('============================================================');
        //console.log(enc_unid);
        //console.log(enc_key0);
        //console.log(enc_key1);
        //console.log(enc_pubadd);
        retmd5 = CryptoJS.MD5(this.regUserInfo.UniqueId + this.regUserInfo.key0 + this.regUserInfo.key1 + this.regUserInfo.PublicAddr);
        return "&uniqueid=" + encodeURIComponent(enc_unid) +
            "&key0=" + encodeURIComponent(enc_key0) + "&key1=" + encodeURIComponent(enc_key1) +
            "&addr=" + encodeURIComponent(enc_pubadd) + "&check=" + encodeURIComponent(retmd5.toString(CryptoJS.enc.Hex));
    }
};

function checkValid() {
    v = $.cookie('validation');
    l = $.cookie("language");
    if(v == null || v == undefined){
        while(MainController.waiting){
            $.delay(300);
        }
        parent.location = "index.html";
        return;
    }
    $.ajax({
        url: CurrentServer + '/validation',
        type: 'POST',
        data: 't=loading&v='+ v + '&l=' + l,
        async: true,
        cache :false,
        success: successResponse,
        error: function (xhr, status, e) {
            errorResponse(xhr, status, e, "error.html", "Lost connection with server");
        },
        complete: completeResponse
    });
}

function successResponse(data, status,xhr) {
    //console.log("successResponse: data");
    jsonobj=eval("("+data+")");
    if (jsonobj.codeid == ReturnCorrectlyFlag) {
        //console.log(jsonobj.data.id);
        //console.log(jsonobj.data.time);
        //var date = new Date();
        //date.setTime(date.getTime() + (60 * 1000)); // 60 senconds timeout
        //$.cookie('userid', decodeURI(jsonobj.data.id), {path:'/', expires: date});
        //$.cookie('time', decodeURI(jsonobj.data.time), {path:'/', expires: date});
        //if (jsonobj.data.skey != null && jsonobj.data.skey != undefined && jsonobj.data.skey != ""){
        //    $.cookie('transkey', decodeURI(jsonobj.data.skey), {path:'/', expires: 30});
        //}
        //$.cookie('language', decodeURI(jsonobj.language), {path:'/', expires: 7}); // , domain:'ledgercn.com'
        mUserID = decodeURIComponent(jsonobj.data.id);
        mUpdateTime = decodeURIComponent(jsonobj.data.time);
        if (jsonobj.data.skey != null && jsonobj.data.skey != undefined && jsonobj.data.skey != ""){
            mTransKey = decodeURIComponent(jsonobj.data.skey);
        }
        mLanguage = decodeURIComponent(jsonobj.language);
    } else if (jsonobj.codeid == UserNotExistFlag) { // 用户不存在
        parent.location = 'index.html';
    } else {
        parent.location = 'error.html?details='+ encodeURI(jsonobj.error) + "&" + randomParam();
    }
}

function completeResponse(xhr,code) {
    if (code != "success") {
        parent.location = 'error.html?details='+ encodeURI("The server is stopped, please wait.")  + "&" + randomParam();
    } else {
        MainController.initController();
    }
    $.cookie('validation',null,{path:'/', expires: -1});
    //console.log(code);
}

function inputIdCheck(id) {
    v = $("#"+id)[0].value;
    if(v == null) return false;
    v = v.substring(0,6);
    $("#"+id)[0].value = v.replace(/[^\d|a-z|A-Z]/g,'').toUpperCase();
}