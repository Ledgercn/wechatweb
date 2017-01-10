/**
 * Created by jojopoper on 2016/11/28.
 */

function loadingMain(errPage, gotoPage) {
    // 获取传入参数
    vaildStr = getUrlParam("v");
    lang = getUrlParam("l");
    if( vaildStr == null || vaildStr.length == 0) {
        // 未传入参数则返回index界面
        //console.log(errPage);
        parent.location = errPage;
    } else {
        writeCookieData(vaildStr,lang);

        //console.log(gotoPage);
        parent.location = gotoPage + "?" + randomParam();
    }
}

function writeCookieData(v,l) {
    var date = new Date();
    date.setTime(date.getTime() + (120 * 1000)); // 120 senconds timeout
    $.cookie('validation', v, {path:'/', expires: date}); // , domain:'ledgercn.com'
    if (l == null || l == undefined) {
        l = "cn";
    }
    $.cookie('language', l, {path:'/', expires: 7}); // , domain:'ledgercn.com'
}