/**
 * Created by jojopoper on 2016/12/17.
 */

function checkSuccess(data, status,xhr, erraddr, errmsg) {
    jsonobj=eval("("+data+")");
    if (jsonobj.codeid == 0) {
        //var date = new Date();
        //date.setTime(date.getTime() + (60 * 1000)); // 30 senconds timeout
        //$.cookie('userid', decodeURI(jsonobj.data.id), {path:'/', expires: date});
        //$.cookie('time', decodeURI(jsonobj.data.time), {path:'/', expires: date});
        //decLang = decodeURI(jsonobj.language);
        //if (owner.curLanguage != decLang){
        //    owner.curLanguage =  decLang;
        //    $.cookie('language', decLang, {path:'/', expires: 7}); // , domain:'ledgercn.com'
        //}
        mUserID = decodeURIComponent(jsonobj.data.id);
        mUpdateTime = decodeURIComponent(jsonobj.data.time);
        //console.log(jsonobj.data);
        mLanguage = decodeURIComponent(jsonobj.language);
    } else {
        parent.location = erraddr + "?details=" + encodeURIComponent(errmsg) + "&" + randomParam();
    }
}


function errorResponse(xhr, status, e, erraddr, errMsg) {
    if(e.toString() == '') {
        parent.location = erraddr + '?details='+ encodeURIComponent(errMsg) + "&" + randomParam();
    } else {
        parent.location = erraddr + '?details='+ encodeURIComponent(e.toString()) + "&" + randomParam();
    }
}