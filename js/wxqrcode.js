/**
 * Created by jojopoper on 2016/12/24.
 */
var CryptData = {
    appid: '',
    jsticket: '',
    timestamp: '',
    nonce: '',
    signature: '',
    errorMsg: null
};

function getCurrUrl() {
    currUrl = window.location.href;
    shapIndex = currUrl.indexOf('#');
    if(shapIndex == -1){
        return currUrl;
    }
    return currUrl.substr(0,shapIndex);
}

var WxQrcode = {
    QueryServer : function () {
        $.ajax({
            url: CurrentServer + '/jsticket?addr='+ encodeURIComponent(getCurrUrl()) + '&' + randomParam(),
            type: 'GET',
            dataType: 'json',
            async : false,
            cache :false,
            success: function(data, status, xhr){
                jsonobj=eval("("+data+")");
                if(jsonobj.id == 0){
                    CryptData.appid = jsonobj.appid;
                    CryptData.jsticket = jsonobj.jsticket;
                    CryptData.timestamp = jsonobj.timestamp;
                    CryptData.nonce = jsonobj.nonce;
                    CryptData.signature = jsonobj.signature;
                } else {
                    CryptData.errorMsg = jsonobj.errmsg;
                }
            },
            error: function (xhr, status, e) {
                CryptData.errorMsg = xhr;
            }
        });


        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: CryptData.appid, // 必填，公众号的唯一标识
            timestamp: CryptData.timestamp, // 必填，生成签名的时间戳
            nonceStr: CryptData.nonce, // 必填，生成签名的随机串
            signature: CryptData.signature,// 必填，签名，见附录1
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
    }
};