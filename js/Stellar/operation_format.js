/**
 * Created by jojopoper on 2017/01/04.
 */

function formatBaseOperation(opera,lang){
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Title = "操作:" + opera.Type;
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';
    } else {
        opera.Title = "Opera:" + opera.Type;
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';
    }
    opera.DetailRows = 4;
    return opera;
}

function formatPaymentOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == PAYMENT_IN) {
            opera.Title = "收入-";
            opera.Details += '<br>付款来源:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.DetailRows += 2;
        }
        else if(opera.SubType == PAYMENT_OUT) {
            opera.Title = "支出-";
            opera.Details += '<br>付款去向:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 2;
        }
        else{
            opera.Title = "(@@)-";
            opera.Details += '<br>付款源账户:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.Details += '<br>付款目标账户:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 4;
        }

        if(opera.AssetCode != null && opera.AssetCode != ""){
            opera.Title += "记账:"+ opera.AssetCode + "-";
            opera.Details += "<br>支付种类:<br>&gt; " + opera.AssetCode;
            opera.Details += '<br>网关地址:<br>&gt; <a href="accountid.html?addr=' + opera.AssetIssuer + rParam + '">' + opera.AssetIssuer + '</a>';
            opera.Details += "<br>金额:<br>&gt; " + opera.Amount;
            opera.DetailRows += 6;

        }else{
            opera.Title += "XLM-";
            opera.Details += "<br>恒星币:<br>&gt; " + opera.Amount + " Lumens";
            opera.DetailRows += 2;
        }
    } else {
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == PAYMENT_IN){
            opera.Title = "Earning-";
            opera.Details += '<br>From:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.DetailRows += 2;
        }
        else if(opera.SubType == PAYMENT_OUT){
            opera.Title = "Expenditure-";
            opera.Details += '<br>To:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 2;
        }
        else{
            opera.Title = "(@@)-";
            opera.Details += '<br>From:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.Details += '<br>To:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 4;
        }

        if(opera.AssetCode != null && opera.AssetCode != ""){
            opera.Title += "Credit:" + opera.AssetCode + "-";
            opera.Details += "<br>Code:<br>&gt; " + opera.AssetCode; //AssetIssuer
            opera.Details += '<br>Issuer:<br>&gt; <a href="accountid.html?addr=' + opera.AssetIssuer + rParam + '">' + opera.AssetIssuer + '</a>';
            opera.Details += "<br>Amount:<br>&gt; " + opera.Amount;
            opera.DetailRows += 6;
        }else{
            opera.Title += "XLM-";
            opera.Details += "<br>XLM:<br>&gt; " + opera.Amount + " Lumens";
            opera.DetailRows += 2;
        }
    }

    opera.Title += opera.Amount;

    return opera;
}

function formatPathPaymentOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == PATHPAYMENT_IN) {
            opera.Title = "收入-";
            opera.Details += '<br>付款来源:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.DetailRows += 2;
        }
        else if(opera.SubType == PATHPAYMENT_OUT) {
            opera.Title = "支出-";
            opera.Details += '<br>付款去向:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 2;
        }
        else{
            opera.Title = "(@@)-";
            opera.Details += '<br>付款源账户:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.Details += '<br>付款目标账户:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 4;
        }

        opera.Details += "<br>目标方金额:<br>&gt; " + opera.DestAmount;

        if(opera.SendAsset.Code != null && opera.SendAsset.Code != "" && opera.SendAsset.Code != undefined){
            opera.Title += "路径支付(记账):"+ opera.SendAsset.Code + "-";
            opera.Details += '<br>发送方资产:<br>[';
            opera.Details += "<br>支付种类:<br>&gt; " + opera.SendAsset.Code;
            opera.Details += '<br>网关地址:<br>&gt; <a href="accountid.html?addr=' + opera.SendAsset.Issuer + rParam + '">' + opera.SendAsset.Issuer + '</a>';
            opera.Details += '<br>]';
            opera.DetailRows += 8;
        } else {
            opera.Title += "路径支付: XLM-";
        }

        if(opera.DestAsset.Code != null && opera.DestAsset.Code != "" && opera.DestAsset.Code != undefined){
            opera.Title += opera.DestAsset.Code + "-";
            opera.Details += '<br>目标方资产:<br>[';
            opera.Details += "<br>支付种类:<br>&gt; " + opera.DestAsset.Code;
            opera.Details += '<br>网关地址:<br>&gt; <a href="accountid.html?addr=' + opera.DestAsset.Issuer + rParam + '">' + opera.DestAsset.Issuer + '</a>';
            opera.Details += '<br>]';
            opera.DetailRows += 8;
        }

        if(opera.sendMax.amount != null && opera.sendMax.amount != "" && opera.sendMax.amount != undefined){
            opera.Details += "<br>发送最大值:<br>&gt; " + opera.sendMax.amount;
            opera.DetailRows += 2;
        }

        if(opera.path != null) {
            opera.Details += '<br>路径(' + opera.path.length + ')<br>[';
            for(var i = 0 ; i < opera.path.length; ++i) {
                opera.Details += '<br> &gt; [' + (i+1) + '] 种类: ' + opera.path[i].Code;
                opera.Details += '<br> &gt; [' + (i+1) + '] 地址: <a href="accountid.html?addr=' + opera.path[i].Issuer + rParam + '">' + opera.path[i].Issuer + '</a>';
            }
            opera.Details += '<br>]';
        }
    } else {
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == PATHPAYMENT_IN) {
            opera.Title = "收入-";
            opera.Details += '<br>From:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.DetailRows += 2;
        }
        else if(opera.SubType == PATHPAYMENT_OUT) {
            opera.Title = "支出-";
            opera.Details += '<br>To:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 2;
        }
        else{
            opera.Title = "(@@)-";
            opera.Details += '<br>From:<br>&gt; <a href="accountid.html?addr=' + opera.From + rParam + '">' + opera.From + '</a>';
            opera.Details += '<br>To:<br>&gt; <a href="accountid.html?addr=' + opera.To + rParam + '">' + opera.To + '</a>';
            opera.DetailRows += 4;
        }

        opera.Details += "<br>DestAmount:<br>&gt; " + opera.DestAmount;

        if(opera.SendAsset.Code != null && opera.SendAsset.Code != "" && opera.SendAsset.Code != undefined){
            opera.Title += "PathPayment(Credit):"+ opera.SendAsset.Code + "-";
            opera.Details += '<br>Send Asset:<br>[';
            opera.Details += "<br>Code:<br>&gt; " + opera.SendAsset.Code;
            opera.Details += '<br>Issuer:<br>&gt; <a href="accountid.html?addr=' + opera.SendAsset.Issuer + rParam + '">' + opera.SendAsset.Issuer + '</a>';
            opera.Details += '<br>]';
            opera.DetailRows += 8;
        } else {
            opera.Title += "PathPayment: XLM-";
        }

        if(opera.DestAsset.Code != null && opera.DestAsset.Code != "" && opera.DestAsset.Code != undefined){
            opera.Title += opera.DestAsset.Code + "-";
            opera.Details += '<br>Destination Asset:<br>[';
            opera.Details += "<br>Code:<br>&gt; " + opera.DestAsset.Code;
            opera.Details += '<br>Issuer:<br>&gt; <a href="accountid.html?addr=' + opera.DestAsset.Issuer + rParam + '">' + opera.DestAsset.Issuer + '</a>';
            opera.Details += '<br>]';
            opera.DetailRows += 8;
        }

        if(opera.sendMax.amount != null && opera.sendMax.amount != "" && opera.sendMax.amount != undefined){
            opera.Details += "<br>Send max:<br>&gt; " + opera.sendMax.amount;
            opera.DetailRows += 2;
        }

        if(opera.path != null) {
            opera.Details += '<br>Path(' + opera.path.length + ')<br>[';
            for(var i = 0 ; i < opera.path.length; ++i) {
                opera.Details += '<br> &gt; [' + (i+1) + '] Code: ' + opera.path[i].Code;
                opera.Details += '<br> &gt; [' + (i+1) + '] Issuer: <a href="accountid.html?addr=' + opera.path[i].Issuer + rParam + '">' + opera.path[i].Issuer + '</a>';
            }
            opera.Details += '<br>]';
        }
    }

    opera.Title += opera.DestAmount;

    return opera;
}

function formatCreateOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == CREATE_IN){
            opera.Title = "创建-当前账户-";
            opera.Details += '<br>出资账户:<br>&gt; <a href="accountid.html?addr=' + opera.Funder + rParam + '">' + opera.Funder + '</a>';
            opera.DetailRows += 2;
        } else if (opera.SubType == CREATE_OUT){
            opera.Title = "创建-其他账户-";
            opera.Details += '<br>建立账户:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.DetailRows += 2;
        } else {
            opera.Title = "创建账户-";
            opera.Details += '<br>出资账户:<br>&gt; <a href="accountid.html?addr=' + opera.Funder + rParam + '">' + opera.Funder + '</a>';
            opera.Details += '<br>建立账户:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.DetailRows += 4;
        }
        opera.Title += "金额(" + opera.StartingBalance + ")";
        opera.Details += "<br>起始余额:<br>&gt; " + opera.StartingBalance;
        opera.DetailRows += 2;
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == CREATE_IN){
            opera.Title = "Create-Curr account-";
            opera.Details += '<br>Funder:<br>&gt; <a href="accountid.html?addr=' + opera.Funder + rParam + '">' + opera.Funder + '</a>';
            opera.DetailRows += 2;
        } else if (opera.SubType == CREATE_OUT){
            opera.Title = "Create-Other account-";
            opera.Details += '<br>Account:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.DetailRows += 2;
        } else {
            opera.Title = "Create account-";
            opera.Details += '<br>Funder:<br>&gt; <a href="accountid.html?addr=' + opera.Funder + rParam + '">' + opera.Funder + '</a>';
            opera.Details += '<br>Account:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.DetailRows += 4;
        }
        opera.Title += "Balance(" + opera.StartingBalance + ")";
        opera.Details += "<br>Starting Balance:<br>&gt; " + opera.StartingBalance;
        opera.DetailRows += 2;
    }
    return opera;
}

function formatMergeOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == MERGE_IN){
            opera.Title = "合并-获得其他账户";
            opera.Details += '<br>被销毁账户:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.DetailRows += 2;
        } else if (opera.SubType == MERGE_DESTROY){
            opera.Title = "合并-销毁当前账户";
            opera.Details += '<br>目标账户:<br>&gt; <a href="accountid.html?addr=' + opera.Into + rParam + '">' + opera.Into + '</a>';
            opera.DetailRows += 2;
        } else {
            opera.Title = "合并账户";
            opera.Details += '<br>被销毁账户:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.Details += '<br>目标账户:<br>&gt; <a href="accountid.html?addr=' + opera.Into + rParam + '">' + opera.Into + '</a>';
            opera.DetailRows += 4;
        }
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if(opera.SubType == MERGE_IN){
            opera.Title = "Merge-Get other account";
            opera.Details += '<br>Destroy Account:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.DetailRows += 2;
        } else if (opera.SubType == MERGE_DESTROY){
            opera.Title = "Merge-Destroy";
            opera.Details += '<br>Merge into:<br>&gt; <a href="accountid.html?addr=' + opera.Into + rParam + '">' + opera.Into + '</a>';
            opera.DetailRows += 2;
        } else {
            opera.Title = "Merge account";
            opera.Details += '<br>Destroy Account:<br>&gt; <a href="accountid.html?addr=' + opera.Account + rParam + '">' + opera.Account + '</a>';
            opera.Details += '<br>Merge into:<br>&gt; <a href="accountid.html?addr=' + opera.Into + rParam + '">' + opera.Into + '</a>';
            opera.DetailRows += 4;
        }
    }
    return opera;
}

function formatChangeTrustOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if (opera.SubType == CHANGE_TRUST_ON){
            opera.Title = "信任其他网关-" + opera.AssetCode;
        }else{
            opera.Title = "变更信任-" + opera.AssetCode;
        }
        opera.Details += '<br>受托人:<br>&gt; <a href="accountid.html?addr=' + opera.Trustee + rParam + '">' + opera.Trustee + '</a>';
        opera.Details += '<br>委托人:<br>&gt; <a href="accountid.html?addr=' + opera.Trustor + rParam + '">' + opera.Trustor + '</a>';
        opera.Details += "<br>类型:<br>&gt; " + opera.AssetCode;
        opera.Details += '<br>网关地址:<br>&gt; <a href="accountid.html?addr=' + opera.AssetIssuer + rParam + '">' + opera.AssetIssuer + '</a>';
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        if (opera.SubType == CHANGE_TRUST_ON){
            opera.Title = "Trust Issuer-" + opera.AssetCode;
        }else{
            opera.Title = "Change Trust-" + opera.AssetCode;
        }
        opera.Details += '<br>Trustee:<br>&gt; <a href="accountid.html?addr=' + opera.Trustee + rParam + '">' + opera.Trustee + '</a>';
        opera.Details += '<br>Trustor:<br>&gt; <a href="accountid.html?addr=' + opera.Trustor + rParam + '">' + opera.Trustor + '</a>';
        opera.Details += "<br>AssetCode:<br>&gt; " + opera.AssetCode;
        opera.Details += '<br>AssetIssuer:<br>&gt; <a href="accountid.html?addr=' + opera.AssetIssuer + rParam + '">' + opera.AssetIssuer + '</a>';
    }
    opera.DetailRows += 8;
    return opera;
}

function formatManageOfferOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn') {
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "订单管理-买:" + opera.Buying.Asset_Code + " 卖:" + opera.Selling.Asset_Code;

        opera.Details += "<br>价格:<br>&gt; " + opera.Price;
        opera.Details += "<br>Amount:<br>&gt; " + opera.Amount;
        opera.Details += "<br>订单ID:<br>&gt; " + opera.OfferID;
        opera.Details += "<br>买入信息:<br>[<br>\tCode:" + opera.Buying.Asset_Code + "<br>\t网关:" + opera.Buying.Asset_Issuer + "<br>]";
        opera.Details += "<br>卖出信息:<br>[<br>\tCode:" + opera.Selling.Asset_Code + "<br>\t网关:" + opera.Selling.Asset_Issuer + "<br>]";
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "Offer-Buy:" + opera.Buying.Asset_Code + " Sell:" + opera.Selling.Asset_Code;

        opera.Details += "<br>Price:<br>&gt; " + opera.Price;
        opera.Details += "<br>Amount:<br>&gt; " + opera.Amount;
        opera.Details += "<br>OfferID:<br>&gt; " + opera.OfferID;
        opera.Details += "<br>Buying Info:<br>[<br>\tCode:" + opera.Buying.Asset_Code + "<br>\tIssuer:" + opera.Buying.Asset_Issuer + "<br>]";
        opera.Details += "<br>Selling Info:<br>[<br>\tCode:" + opera.Selling.Asset_Code + "<br>\tIssuer:" + opera.Selling.Asset_Issuer + "<br>]";
    }

    opera.DetailRows += 16;

    return opera;
}

function formatSetOptionsOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    opera.subTitle = "";
    if(lang == 'cn') {
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "设置-更改:";
        if(opera.SignerKey != null && opera.SignerKey != undefined && opera.SignerKey != ""){
            opera.Details += "<br>签名账户:<br>&gt; " + opera.SignerKey;
            opera.DetailRows += 2;
            opera.Title += "签名账户;";
            opera.subTitle = '签名 ';
        }
        if(opera.SignerWeight != null && opera.SignerWeight != undefined && opera.SignerWeight != ""){
            opera.Details += "<br>签名权重:<br>&gt; " + opera.SignerWeight;
            opera.DetailRows += 2;
            opera.Title += "签名权重;";
        }
        if(opera.InflationDest != null && opera.InflationDest != undefined && opera.InflationDest != ""){
            opera.Details += "<br>通胀地址:<br>&gt; " + opera.InflationDest;
            opera.DetailRows += 2;
            opera.Title += "通胀地址;";
            opera.subTitle += '通胀 ';
        }
        if(opera.HomeDomain != null && opera.HomeDomain != undefined && opera.HomeDomain != ""){
            opera.Details += "<br>主域:<br>&gt; " + opera.HomeDomain;
            opera.DetailRows += 2;
            opera.Title += "主域;";
            opera.subTitle += '主域 ';
        }

        if(opera.SetFlags != null && opera.SetFlags != undefined){
            opera.Details += "<br>设置标示:<br>&gt; ";
            if((opera.SetFlags & 0x1) > 0) {
                opera.Details += 'Required(1)';
            }
            if((opera.SetFlags & 0x2) > 0) {
                opera.Details += 'Revocable(1)';
            }
            if((opera.SetFlags & 0x4) > 0) {
                opera.Details += 'Immutable(1)';
            }
            opera.DetailRows += 2;
            opera.Title += "设置标示;";
            opera.subTitle += '标示 ';
        }

        if(opera.ClearFlags != null && opera.ClearFlags != undefined){
            opera.Details += "<br>清除标示:<br>&gt; ";
            if((opera.ClearFlags & 0x1) > 0) {
                opera.Details += 'Required(0)';
            }
            if((opera.ClearFlags & 0x2) > 0) {
                opera.Details += 'Revocable(0)';
            }
            if((opera.ClearFlags & 0x4) > 0) {
                opera.Details += 'Immutable(0)';
            }
            opera.DetailRows += 2;
            opera.Title += "清除标示;";
            opera.subTitle += '清标示 ';
        }

        if( (opera.highThreshold != null && opera.highThreshold != undefined) ||
            (opera.medThreshold != null && opera.medThreshold != undefined) ||
            (opera.lowThreshold != null && opera.lowThreshold != undefined) ) {
            opera.Details += "<br>设置门限:<br>&gt; ";
            if(opera.highThreshold != null && opera.highThreshold != undefined) {
                opera.Details += '高(' + opera.highThreshold + ')';
            }
            if(opera.medThreshold != null && opera.medThreshold != undefined) {
                opera.Details += '中(' + opera.medThreshold + ')';
            }
            if(opera.lowThreshold != null && opera.lowThreshold != undefined) {
                opera.Details += '低(' + opera.lowThreshold + ')';
            }
            opera.DetailRows += 2;
            opera.Title += "门限;";
            opera.subTitle += '门限';
        }
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "Set Options-Operations";
        if(opera.SignerKey != null && opera.SignerKey != undefined && opera.SignerKey != ""){
            opera.Details += "<br>Signer Key:<br>&gt; " + opera.SignerKey;
            opera.DetailRows += 2;
            opera.Title += "SignerKey;";
            opera.subTitle += 'Signer ';
        }
        if(opera.SignerWeight != null && opera.SignerWeight != undefined && opera.SignerWeight != ""){
            opera.Details += "<br>Signer Weight:<br>&gt; " + opera.SignerWeight;
            opera.DetailRows += 2;
            opera.Title += "SignerWeight;";
        }
        if(opera.InflationDest != null && opera.InflationDest != undefined && opera.InflationDest != ""){
            opera.Details += "<br>Inflation Destination:<br>&gt; " + opera.InflationDest;
            opera.DetailRows += 2;
            opera.Title += "Inflation;";
            opera.subTitle += 'Inflation ';
        }
        if(opera.HomeDomain != null && opera.HomeDomain != undefined && opera.HomeDomain != ""){
            opera.Details += "<br>Home Domain:<br>&gt; " + opera.HomeDomain;
            opera.DetailRows += 2;
            opera.Title += "HomeDomain;";
            opera.subTitle += 'Domain ';
        }

        if(opera.SetFlags != null && opera.SetFlags != undefined){
            opera.Details += "<br>Set Flags:<br>&gt; ";
            if((opera.SetFlags & 0x1) > 0) {
                opera.Details += 'Required(1)';
            }
            if((opera.SetFlags & 0x2) > 0) {
                opera.Details += 'Revocable(1)';
            }
            if((opera.SetFlags & 0x4) > 0) {
                opera.Details += 'Immutable(1)';
            }
            opera.DetailRows += 2;
            opera.Title += "SetFlags;";
            opera.subTitle += 'Flags ';
        }

        if(opera.ClearFlags != null && opera.ClearFlags != undefined){
            opera.Details += "<br>Clear Flags:<br>&gt; ";
            if((opera.ClearFlags & 0x1) > 0) {
                opera.Details += 'Required(0)';
            }
            if((opera.ClearFlags & 0x2) > 0) {
                opera.Details += 'Revocable(0)';
            }
            if((opera.ClearFlags & 0x4) > 0) {
                opera.Details += 'Immutable(0)';
            }
            opera.DetailRows += 2;
            opera.Title += "ClearFlags;";
            opera.subTitle += 'ClearFlags ';
        }

        if( (opera.highThreshold != null && opera.highThreshold != undefined) ||
            (opera.medThreshold != null && opera.medThreshold != undefined) ||
            (opera.lowThreshold != null && opera.lowThreshold != undefined) ) {
            opera.Details += "<br>Set Threshold:<br>&gt; ";
            if(opera.highThreshold != null && opera.highThreshold != undefined) {
                opera.Details += 'High(' + opera.highThreshold + ')';
            }
            if(opera.medThreshold != null && opera.medThreshold != undefined) {
                opera.Details += 'Med(' + opera.medThreshold + ')';
            }
            if(opera.lowThreshold != null && opera.lowThreshold != undefined) {
                opera.Details += 'Low(' + opera.lowThreshold + ')';
            }
            opera.DetailRows += 2;
            opera.Title += "Threshold;";
            opera.subTitle += 'Threshold';
        }
    }

    return opera;
}

function formatAllowTrustOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "添加信任-" + opera.AssetCode;
        opera.Details += "<br>类型:<br>&gt; " + opera.AssetCode;
        opera.Details += '<br>地址:<br>&gt; <a href="accountid.html?addr=' + opera.Trustor + rParam + '">' + opera.Trustor + '</a>';
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "Allow Trust-" + opera.AssetCode;
        opera.Details += "<br>Code:<br>&gt; " + opera.AssetCode;
        opera.Details += '<br>Trustor:<br>&gt; <a href="accountid.html?addr=' + opera.Trustor + rParam + '">' + opera.Trustor + '</a>';
    }
    opera.DetailRows += 8;
    return opera;
}

function formatCreatePassiveOfferOperation(opera,lang){
    opera.DetailRows = 4;
    rParam = '&l=' + mLanguage + '&' + randomParam();

    buycode = '';
    buyissuer = '';
    if(opera.Buying.Code == "" || opera.Buying.Code == undefined) {
        buycode = "XLM";
        buyissuer = '';
    } else {
        buycode = opera.Buying.Code;
        buyissuer = opera.Buying.Issuer;
    }
    sellcode = '';
    sellissuer = '';
    if(opera.Selling.Code == "" || opera.Selling.Code == undefined) {
        buycode = "XLM";
        buyissuer = '';
    } else {
        sellcode = opera.Selling.Code;
        sellissuer = opera.Selling.Issuer;
    }
    if(lang == 'cn'){
        opera.Details = '源账户:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "挂单";
        if(opera.Buying.Code == "" || opera.Buying.Code == undefined) {
            opera.Details += "<br>买入:<br>&gt; XLM";
        } else {
            opera.Details += '<br>买入:<br>&gt; ' + opera.Buying.Code;
            opera.Details += '<br>网关地址:<br>&gt; <a href="accountid.html?addr=' + opera.Buying.Issuer + rParam + '">' + opera.Buying.Issuer + '</a>';
        }
        if(opera.Selling.Code == "" || opera.Selling.Code == undefined) {
            opera.Details += "<br>卖出:<br>&gt; XLM";
        } else {
            opera.Details += '<br>卖出:<br>&gt; ' + opera.Selling.Code;
            opera.Details += '<br>网关地址:<br>&gt; <a href="accountid.html?addr=' + opera.Selling.Issuer + rParam + '">' + opera.Selling.Issuer + '</a>';
        }
        opera.Details += '<br>数量:<br>&gt; ' + opera.Amount;
        opera.Details += '<br>价格:<br>&gt; ' + opera.Price;
    }else{
        opera.Details = 'Source Account:<br>&gt; <a href="accountid.html?addr=' + opera.SourceAccount + rParam + '">' + opera.SourceAccount + '</a>';
        opera.Details += '<br>Hash:<br>&gt; <a href="transaction.html?hash=' + opera.Hash + rParam + '">' + opera.Hash + '</a>';

        opera.Title = "CreateOffer";
        if(opera.Buying.Code == "" || opera.Buying.Code == undefined) {
            opera.Details += "<br>Buy:<br>&gt; XLM";
        } else {
            opera.Details += '<br>Buy:<br>&gt; ' + opera.Buying.Code;
            opera.Details += '<br>Issuer:<br>&gt; <a href="accountid.html?addr=' + opera.Buying.Issuer + rParam + '">' + opera.Buying.Issuer + '</a>';
        }
        if(opera.Selling.Code == "" || opera.Selling.Code == undefined) {
            opera.Details += "<br>Sell:<br>&gt; XLM";
        } else {
            opera.Details += '<br>Sell:<br>&gt; ' + opera.Selling.Code;
            opera.Details += '<br>Issuer:<br>&gt; <a href="accountid.html?addr=' + opera.Selling.Issuer + rParam + '">' + opera.Selling.Issuer + '</a>';
        }
        opera.Details += '<br>Aoumnt:<br>&gt; ' + opera.Amount;
        opera.Details += '<br>Price:<br>&gt; ' + opera.Price;
    }
    opera.DetailRows += 8;
    return opera;
}