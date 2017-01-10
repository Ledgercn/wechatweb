/**
 * Created by jojopoper on 2016/12/18.
 */

var BackgroundServerAddress = 'http://ledgercn.com/weixin';
var BackgroundTestServerAddress = 'http://192.168.1.101:18999';
var CurrentServer = BackgroundServerAddress;
var TestFederationServer = 'http://localhost:1888/federation';
var ServiceFederationServer = 'http://ledgercn.com:1888/federation';
var CurrentFederationServer = ServiceFederationServer;
var StellarLiveNetowrkUrl = 'https://horizon.stellar.org';
var StellarTestNetowrkUrl = 'https://horizon-testnet.stellar.org';
var StellarCurrentNetworkUrl = StellarLiveNetowrkUrl;
var StellarAccounts = '/accounts';
var StellarTransactions = '/transactions';
var StellarLedgers = '/ledgers';

var ReturnCorrectlyFlag = 0;
var UserNotExistFlag = 5;

var mUserID = "";
var mUpdateTime = null;
var mTransKey = "";
var mLanguage = "";
var mUnique = "";
var mKey0 = "";
var mKey1 = "";
var mAddress = "";

function setStellarNetwork(nw) {
    if(nw == 'LIVE') {
        StellarSdk.Network.usePublicNetwork();
        StellarCurrentNetworkUrl = StellarLiveNetowrkUrl;
    } else {
        StellarSdk.Network.useTestNetwork();
        StellarCurrentNetworkUrl = StellarTestNetowrkUrl;
    }
}
function clearInput(inputid) {
    $("#"+inputid)[0].value = "";
}

function randomParam() {
    return "timer=" + Math.random().toString();
}

function CheckInputIntFloat(oInput) {
    if('' != oInput.value.replace(/\d{1,}\.{0,1}\d{0,}/,'')) {
        oInput.value = oInput.value.match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :oInput.value.match(/\d{1,}\.{0,1}\d{0,}/);
    }
}

function saveKeyDatas() {
    $.cookie('userid', mUserID, {path:'/', expires: 1});
    $.cookie('time', mUpdateTime, {path:'/', expires: 1});
    $.cookie('language', mLanguage, {path:'/', expires: 1}); // , domain:'ledgercn.com'
    $.cookie('unique',mUnique, {path:'/', expires: 1});
    $.cookie('key0',mKey0, {path:'/', expires: 1});
    $.cookie('key1',mKey1, {path:'/', expires: 1});
    $.cookie('address',mAddress, {path:'/', expires: 1});
    $.cookie('transkey',mTransKey, {path:'/', expires: 1});
}

function readKeyDatas() {
    mLanguage = $.cookie("language");
    mUserID = $.cookie('userid');
    mUpdateTime = $.cookie('time');
    mUnique = $.cookie("unique");
    mTransKey = $.cookie("transkey");
    mKey0 = $.cookie("key0");
    mKey1 = $.cookie("key1");
    mAddress = $.cookie("address");
}

function ShoworHideBody(iconid, bodyid) {
    bodyObj = $("#"+bodyid)[0];
    iconObj = $("#"+iconid)[0];
    if (bodyObj.style.display == 'none') {
        iconObj.setAttribute('class','fa fa-caret-down');
        bodyObj.style.display = 'inherit';
    } else {
        iconObj.setAttribute('class','fa fa-caret-right');
        bodyObj.style.display = 'none';
    }
}

function setDetailVisible(id) {
    obj = $('#' + id)[0];
    if(obj.style.display == 'none') {
        obj.style.display = 'inherit';
    } else {
        obj.style.display = 'none';
    }
}

function SubString(src, headlen, taillen) {
    srcLen = src.length;
    if(srcLen <= (headlen + taillen)) {
        return src
    }
    return src.substr(0,headlen) + '...' + src.substr(srcLen-taillen-1);
}

function pad(num, n) {
    var len = num.toString().length;
    while(len < n) {
        num = "0" + num;
        len++;
    }
    return num;
}

// 格式为YYYY-MM-DD HH:mm:ss或者null，如果为null则返回当前日期
function getDate(datetimeStr){
    if(datetimeStr == null || datetimeStr == ""){
        dt = new Date();
        return new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()).getTime();
    }
    dt = new Date(datetimeStr);
    return new Date(dt.getFullYear(),dt.getMonth(),dt.getDate()).getTime();
}

function getLocalDateTimeString(dt,forceLong,language){
    dtime = new Date(dt);
    dttime = getDate(dt);
    ntime = getDate();

    if(!forceLong && (ntime - dttime < 86400000)){ // 1天之内的只显示时间，不显示日期
        return pad(dtime.getHours(),2) + ":" + pad(dtime.getMinutes(),2) + ":" + pad(dtime.getSeconds(),2);
    }
    if (language == 'cn'){
        return dtime.getFullYear() + "-" + pad(dtime.getMonth()+1,2) + "-" + pad(dtime.getDate(),2) + " " +  pad(dtime.getHours(),2) + ":" + pad(dtime.getMinutes(),2) + ":" + pad(dtime.getSeconds(),2);
    }
    return pad(dtime.getMonth()+1,2) + "/" + pad(dtime.getDate(),2) + "/" + dtime.getFullYear() + " " +  pad(dtime.getHours(),2) + ":" + pad(dtime.getMinutes(),2) + ":" + pad(dtime.getSeconds(),2);
}

function randomWord(randomFlag, min, max){
    var str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    // 随机产生
    if(randomFlag){
        range = Math.round(Math.random() * (max-min)) + min;
    }
    for(var i=0; i<range; i++){
        pos = Math.round(Math.random() * (arr.length-1));
        str += arr[pos];
    }
    return str;
}