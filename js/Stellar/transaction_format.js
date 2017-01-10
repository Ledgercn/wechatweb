/**
 * Created by jojopoper on 2017/01/04.
 */

function formatPaymentOperationEx(opera,lang){
    formatPaymentOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    if(lang == 'cn'){
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == PAYMENT_IN) {
            opera.Title = "收入-";
            opera.subTitle = opera.Amount;
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        }
        else if(opera.SubType == PAYMENT_OUT) {
            opera.Title = "支出-";
            opera.addrTitle = SubString(opera.To,5,5);
        }
        else{
            opera.Title = "(@@)-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        }
        opera.subTitle = opera.Amount;

        if(opera.AssetCode != null && opera.AssetCode != ""){
            opera.Title += opera.AssetCode;

        }else{
            opera.Title += "XLM";
        }
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;

    } else {
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == PAYMENT_IN){
            opera.Title = "Earning-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        }
        else if(opera.SubType == PAYMENT_OUT){
            opera.Title = "Expenditure-";
            opera.addrTitle = SubString(opera.To,5,5);
        }
        else{
            opera.Title = "(@@)-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        }
        opera.subTitle = opera.Amount;

        if(opera.AssetCode != null && opera.AssetCode != ""){
            opera.Title += opera.AssetCode;
        }else{
            opera.Title += "XLM";
        }
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }

    return opera;
}

function formatPathPaymentOperationEx(opera,lang){
    formatPathPaymentOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    if(lang == 'cn'){
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == PATHPAYMENT_IN) {
            opera.Title = "收入(路径)-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);

            if(opera.DestAsset.Code != null && opera.DestAsset.Code != ""){
                opera.Title += opera.DestAsset.Code;
            }else{
                opera.Title += "XLM";
            }
        }
        else if(opera.SubType == PATHPAYMENT_OUT) {
            opera.Title = "支出(路径)-";
            opera.addrTitle = SubString(opera.To,5,5);

            if(opera.SendAsset.Code != null && opera.SendAsset.Code != ""){
                opera.Title += opera.SendAsset.Code;
            }else{
                opera.Title += "XLM";
            }
        }
        else{
            opera.Title = "(@@)-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
            if(opera.DestAsset.Code != null && opera.DestAsset.Code != ""){
                opera.Title += opera.DestAsset.Code;
            }else{
                opera.Title += "XLM";
            }
        }
        opera.subTitle = opera.DestAmount;
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;

    } else {
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == PATHPAYMENT_IN) {
            opera.Title = "Earning(Path)-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);

            if(opera.DestAsset.Code != null && opera.DestAsset.Code != ""){
                opera.Title += opera.DestAsset.Code;
            }else{
                opera.Title += "XLM";
            }
        }
        else if(opera.SubType == PATHPAYMENT_OUT) {
            opera.Title = "Expenditure(Path)-";
            opera.addrTitle = SubString(opera.To,5,5);

            if(opera.SendAsset.Code != null && opera.SendAsset.Code != ""){
                opera.Title += opera.SendAsset.Code;
            }else{
                opera.Title += "XLM";
            }
        }
        else{
            opera.Title = "(@@)-";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
            if(opera.DestAsset.Code != null && opera.DestAsset.Code != ""){
                opera.Title += opera.DestAsset.Code;
            }else{
                opera.Title += "XLM";
            }
        }
        opera.subTitle = opera.DestAmount;
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }

    return opera;
}

function formatCreateOperationEx(opera,lang){
    formatCreateOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    if(lang == 'cn'){
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == CREATE_IN){
            opera.Title = "创建-当前账户";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        } else if (opera.SubType == CREATE_OUT){
            opera.Title = "创建-其他账户";
            opera.addrTitle = SubString(opera.Account,5,5);
        } else {
            opera.Title = "创建账户";
            opera.addrTitle = SubString(opera.Account,5,5);
        }
        opera.subTitle = opera.StartingBalance;
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == CREATE_IN){
            opera.Title = "Create-self account";
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        } else if (opera.SubType == CREATE_OUT){
            opera.Title = "Create-Other account";
            opera.addrTitle = SubString(opera.Account,5,5);
        } else {
            opera.Title = "Create account";
            opera.addrTitle = SubString(opera.Account,5,5);
        }
        opera.subTitle = opera.StartingBalance;
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }
    return opera;
}

function formatMergeOperationEx(opera,lang){
    formatMergeOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    if(lang == 'cn'){
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == MERGE_IN){
            opera.Title = "合并-获得";
            opera.subTitle = SubString(opera.TransSourceAccount,8,8);
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        } else if (opera.SubType == MERGE_DESTROY){
            opera.Title = "合并-销毁";
            opera.subTitle = SubString(opera.TransSourceAccount,8,8);
            opera.addrTitle = SubString(opera.Into,5,5);
        } else {
            opera.Title = "合并账户";
            opera.subTitle = SubString(opera.Account,8,8);
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        }
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if(opera.SubType == MERGE_IN){
            opera.Title = "Merge-Get";
            opera.subTitle = SubString(opera.Into,8,8);
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        } else if (opera.SubType == MERGE_DESTROY){
            opera.Title = "Merge-Destroy";
            opera.subTitle = SubString(opera.Account,8,8);
            opera.addrTitle = SubString(opera.Into,5,5);
        } else {
            opera.Title = "Merge account";
            opera.subTitle = SubString(opera.Account,8,8);
            opera.addrTitle = SubString(opera.SourceAccount,5,5);
        }
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }
    return opera;
}

function formatChangeTrustOperationEx(opera,lang){
    formatChangeTrustOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    if(lang == 'cn'){
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if (opera.SubType == CHANGE_TRUST_ON){
            opera.Title = "信任-" + opera.AssetCode;
        }else{
            opera.Title = "变更-" + opera.AssetCode;
        }
        opera.subTitle = SubString(opera.Trustee,8,8);
        opera.addrTitle = SubString(opera.AssetIssuer,5,5);
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        if (opera.SubType == CHANGE_TRUST_ON){
            opera.Title = "Trust-" + opera.AssetCode;
        }else{
            opera.Title = "Change-" + opera.AssetCode;
        }
        opera.subTitle = SubString(opera.Trustee,8,8);
        opera.addrTitle = SubString(opera.AssetIssuer,5,5);
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }
    return opera;
}

function formatManageOfferOperationEx(opera,lang){
    formatManageOfferOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    opera.addrTitle = SubString(opera.Buying.Asset_Issuer,5,5);
    if(lang == 'cn') {
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = '挂单';
        opera.subTitle = "买:" + opera.Buying.Asset_Code + ' ';
        opera.subTitle += "卖:" + opera.Selling.Asset_Code;
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = 'ManageOffer';
        opera.subTitle = "B:" + opera.Buying.Asset_Code + ' ';
        opera.subTitle += "S:" + opera.Selling.Asset_Code;
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }
    return opera;
}

function formatSetOptionsOperationEx(opera,lang){
    formatSetOptionsOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    opera.addrTitle = SubString(opera.TransSourceAccount,5,5);
    if(lang == 'cn') {
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = "设置";
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = "Set Options";
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }
    if(opera.subTitle == "") {
        opera.subTitle = "-";
    }
    return opera;
}

function formatAllowTrustOperationEx(opera,lang){
    formatAllowTrustOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    opera.addrTitle = SubString(opera.TransSourceAccount,5,5);
    if(lang == 'cn') {
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = "添加信任";
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = "AllowTrust";
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
    }
    opera.subTitle = opera.AssetCode;
    return opera;
}

function formatCreatePassiveOfferOperationEx(opera,lang){
    formatCreatePassiveOfferOperation.apply(this,arguments);
    rParam = '&l=' + mLanguage + '&' + randomParam();
    baseDetails = opera.Details;
    opera.addrTitle = SubString(opera.TransSourceAccount,5,5);
    if(lang == 'cn') {
        opera.Details = "日期/时间:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += '发起账户:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = '成交[' + opera.Amount + ' , ' + opera.Price + ']';
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
        if(opera.Buying.Code == '') {
            opera.subTitle = '买XLM:';
        } else {
            opera.subTitle = '买' + opera.Buying.Code + ':';
        }
        if(opera.Selling.Code == '') {
            opera.subTitle += '卖XLM';
        } else {
            opera.subTitle += '卖' + opera.Selling.Code;
        }
    }else{
        opera.Details = "Date/Time:<br>&gt; " + getLocalDateTimeString(opera.created_datetime,true,lang) + "<br>";
        opera.Details += 'Transaction Account:<br>&gt; <a href="accountid.html?addr=' + opera.TransSourceAccount + rParam + '">' + opera.TransSourceAccount + '</a>';
        opera.Details += "<br>" + baseDetails;
        opera.Title = 'Offer[' + opera.Amount + ' , ' + opera.Price + ']';
        opera.Details += "<br>Fee:<br>&gt; " + opera.fee_paid;
        opera.Details += "<br>Memo( " + opera.memodef.memo_type + " ):<br>&gt; " + opera.memodef.memo;
        if(opera.Buying.Code == '') {
            opera.subTitle = 'B(XLM) : ';
        } else {
            opera.subTitle = 'B(' + opera.Buying.Code + ') : ';
        }
        if(opera.Selling.Code == '') {
            opera.subTitle += 'S(XLM)';
        } else {
            opera.subTitle += 'S(' + opera.Selling.Code + ')';
        }
    }
    return opera;
}
