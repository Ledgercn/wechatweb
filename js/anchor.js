/**
 * Created by jojopoper on 2017/02/27.
 */

var AnchorController = {
    uiViews:{},
    tabPage : [],
    tabPageIcon : [],
    tabPageDiv : [],
    assetListView : null,
    anchorAccId : null,
    assetName : null,
    searchBtnIcon : null,
    errorMsgCxt : null,
    exeMsgCxt : null,
    rmvList : null,
    rmvHashTable : {},
    rmvMsgCxt : null,

    initController : function(){
        this.initStrings();
        this.initView();
        this.initParameters();
        this.threadCheck();
        this.refreshAccInfoClick();
        setInterval(this.threadCheck,40000);
    },

    initStrings : function() {
        if(mLanguage == 'cn') {
            this.uiViews.id_tabs_itm1_text = '添加信任 ';
            this.uiViews.id_tabs_itm2_text = '移除信任 ';
            this.uiViews.id_tabs_itm3_text = '发行资产 ';
            this.uiViews.id_tab1_url_cap = '网址查找';
            this.uiViews.id_tab1_url_memo = '可以通过输入网址后查找网址发行资产；如果已知资产可以在下面直接填写。';
            this.uiViews.id_tab1_anchor_cap = '网关账户ID';
            this.uiViews.id_tab1_anchor_id_memo = '用户自己填写网关的ID信息，或者通过网站查询获取发布资产，在列表中选取对应资产。';
            this.uiViews.id_tab1_asset_name_cap = '资产名称';
            this.uiViews.id_tab1_asset_name_memo = '用户自己填写资产名称，或者通过网站查询获取发布资产，在列表中选取对应资产。';
            this.uiViews.id_confirm_changetrust_btn = '确认添加信任';
            this.uiViews.id_tab2_heading_cap = '选择需要移除的信任';
            this.uiViews.id_confirm_remove_changetrust_confirm_cap = '我已经选择并确认';
            this.uiViews.id_confirm_remove_changetrust_btn_cap = '确认移除信任';

            this.uiViews.err_server_data_invalid = '你的网络连接出现问题或者你所使用的连接已经超时，请从公众号重新发起请求。';
            this.uiViews.err_url_denie = '当前网址访问失败，请重试！';
            this.uiViews.err_url_invalid = '当前网址不存在可用资产信息。';
            this.uiViews.err_invalid_anchor_addr = '输入的信任账户ID不是有效的地址！';
            this.uiViews.err_invalid_anchor_name = '输入的信任资产名称不正确！';
            this.uiViews.err_invalid_operation = '发现当前操作非法，请从正确路径登录账户后重试！';
            this.uiViews.err_Account_not_exist = "当前账户还未激活！";
            this.uiViews.step1_title_cap = '读取当前账户有效性...';
            this.uiViews.step1_account_balance_not_enough = '当前账户余额不足，操作取消。';
            this.uiViews.step2_title_cap = '开始签名发送操作请求...';
            this.uiViews.step2_success = '添加资产成功！';
            this.uiViews.step2_Failure = '添加资产失败！';
            this.uiViews.rmv_anchor_not_select = '请选择需要移除的资产！';
            this.uiViews.step3_success = '移除资产成功!';
            this.uiViews.step3_Failure = '移除资产失败！';
        } else {
            this.uiViews.id_tabs_itm1_text = 'Add Asset ';
            this.uiViews.id_tabs_itm2_text = 'Remove Asset ';
            this.uiViews.id_tabs_itm3_text = 'Make Anchor ';
            this.uiViews.id_tab1_url_cap = 'Domain search';
            this.uiViews.id_tab1_url_memo = 'You can enter domain url to search asset; If you have obtained the exact anchor account id and asset name, you can fill in the following information directly below.';
            this.uiViews.id_tab1_anchor_cap = 'Anchor Account ID';
            this.uiViews.id_tab1_anchor_id_memo = 'If you know the anchor account ID can be filled directly, or through the domain search to query the list of account ids to choose.';
            this.uiViews.id_tab1_asset_name_cap = 'Asset Name';
            this.uiViews.id_tab1_asset_name_memo = 'If you know the anchor asset name can be filled directly, or through the domain search to query the list of assets to choose.';
            this.uiViews.id_confirm_changetrust_btn = 'CONFIRM';
            this.uiViews.id_tab2_heading_cap = 'Choose to remove';
            this.uiViews.id_confirm_remove_changetrust_confirm_cap = 'I have chosen and confirmed';
            this.uiViews.id_confirm_remove_changetrust_btn_cap = 'CONFIRM';

            this.uiViews.err_server_data_invalid = 'Your network connection has problems or your connection has timed out, please restart the request from the subscription.';
            this.uiViews.err_url_denie = 'The URL access denied, please try again later!';
            this.uiViews.err_url_invalid = 'The URL can not find anchor information!';
            this.uiViews.err_invalid_anchor_addr = 'Your enter this anchor account id is invalid stellar format!';
            this.uiViews.err_invalid_anchor_name = 'Your enter this asset name is not invalid!';
            this.uiViews.err_invalid_operation = 'Current Account change trust is illegal operation, please login correctly and try again!';
            this.uiViews.err_Account_not_exist = "The stellar account is not activation!";
            this.uiViews.step1_title_cap = 'Reading current account information ...';
            this.uiViews.step1_account_balance_not_enough = 'Account balance is not enough, operation be canceled!';
            this.uiViews.step2_title_cap = 'Signing and send operation to server...';
            this.uiViews.step2_success = 'Add anchor success!';
            this.uiViews.step2_Failure = 'Add anchor failure!';
            this.uiViews.rmv_anchor_not_select = 'Please select anchor at first!';
            this.uiViews.step3_success = 'Remove anchor success!';
            this.uiViews.step3_Failure = 'Remove anchor failure!';
        }
    },

    initView : function() {
        if(mLanguage == 'cn'){
            $(document).attr("title","资产 - LumenStar");
        } else {
            $(document).attr("title","Anchor - LumenStar");
        }
        this.tabPage[0] = $('#id_tabs_itm1');
        this.tabPage[1] = $('#id_tabs_itm2');
        this.tabPage[2] = $('#id_tabs_itm3');
        this.tabPageIcon[0] = $('#id_tabs_itm1_icon');
        this.tabPageIcon[1] = $('#id_tabs_itm2_icon');
        this.tabPageIcon[2] = $('#id_tabs_itm3_icon');
        this.tabPageDiv[0] = $('#id_tab1');
        this.tabPageDiv[1] = $('#id_tab2');
        this.tabPageDiv[2] = $('#id_tab3');
        this.assetListView = $('#id_tab1_url_asset_select_dd');
        this.anchorAccId = $('#id_tab1_anchor_id_input');
        this.assetName = $('#id_tab1_asset_name_input');
        this.searchBtnIcon = $('#id_tab1_url_search_btn_icon');
        this.errorMsgCxt = $('#id_confirm_error');
        this.exeMsgCxt = $('#id_execute_msg_context');
        this.rmvList = $('#id_tab2_rmv_list');
        this.rmvMsgCxt = $('#id_tab2_execute_context');

        $("#id_tabs_itm1_text")[0].innerText = this.uiViews.id_tabs_itm1_text;
        $("#id_tabs_itm2_text")[0].innerText = this.uiViews.id_tabs_itm2_text;
        $("#id_tabs_itm3_text")[0].innerText = this.uiViews.id_tabs_itm3_text;
        $("#id_tab1_url_cap")[0].innerText = this.uiViews.id_tab1_url_cap;
        $("#id_tab1_url_memo")[0].innerText = this.uiViews.id_tab1_url_memo;
        $("#id_tab1_anchor_cap")[0].innerText = this.uiViews.id_tab1_anchor_cap;
        $("#id_tab1_anchor_id_memo")[0].innerText = this.uiViews.id_tab1_anchor_id_memo;
        $("#id_tab1_asset_name_cap")[0].innerText = this.uiViews.id_tab1_asset_name_cap;
        $("#id_tab1_asset_name_memo")[0].innerText = this.uiViews.id_tab1_asset_name_memo;
        $("#id_confirm_changetrust_btn")[0].innerText = this.uiViews.id_confirm_changetrust_btn;
        $("#id_tab2_heading_cap")[0].innerText = this.uiViews.id_tab2_heading_cap;
        $("#id_confirm_remove_changetrust_confirm_cap")[0].innerText = this.uiViews.id_confirm_remove_changetrust_confirm_cap;
        $("#id_confirm_remove_changetrust_btn_cap")[0].innerText = this.uiViews.id_confirm_remove_changetrust_btn_cap;
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
                checkSuccess(data,status,xhr, "../error.html", AnchorController.uiViews.err_server_data_invalid);
                saveKeyDatas();
            },
            error: function (xhr, status, e) {
                errorResponse(xhr, status, e, "../error.html", "Lost connection with server");
            }
        })
    },

    initParameters : function() {
        settype = getUrlParam('settype');
        if(settype =='remove') {
            this.tabClick(2);
        } else {
            this.tabClick(1);

            accid = getUrlParam('accid');
            if(accid != '' && accid != undefined) {
                this.anchorAccId.val(accid);
            }

            assetname = getUrlParam('assetname');
            if(assetname != '' && assetname != undefined) {
                this.assetName.val(assetname);
            }
        }
    },

    tabClick : function (page) {
        for( var idx = 0 ; idx < this.tabPage.length ; idx++) {
            if(idx == page-1) {
                this.tabPage[idx].attr('class','active');
                this.tabPageIcon[idx].attr('class','fa fa-check');
                this.tabPageDiv[idx].css('display','block');
            } else {
                this.tabPage[idx].removeAttr('class');
                this.tabPageIcon[idx].removeAttr('class');
                this.tabPageDiv[idx].css('display','none');
            }
        }
    },

    scanQRcode : function () {
        wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode","barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res) {
                var result = this.splitAnchorAsset(res.resultStr);
                if(result.aid != '' && result.aname != '') {
                    this.anchorAccId.val(result.aid);
                    this.assetName.val(result.aname);
                } else {
                    this.anchorAccId.val(res.resultStr);
                }
            }
        });
    },

    appendAsset: function(assetname) {
        appInfo = '<div class="radio" style="word-wrap: break-word; word-break: break-all"><label><input type="radio" name="optionsRadios" onclick="AnchorController.changeAssetInfoClick(\''+ assetname +'\')">' + assetname + '</label></div>';
        this.assetListView[0].innerHTML = this.assetListView[0].innerHTML + appInfo;
    },

    changeAssetInfoClick : function(str) {
        ret = this.splitAnchorAsset(str);
        this.anchorAccId.val(ret.aid);
        this.assetName.val(ret.aname);
    },

    makeAnchorAsset : function(aid, aname) {
        return aname + ' - ' + aid;
    },

    splitAnchorAsset : function(str) {
        ret = {
            aid: '',
            aname: '',
        };
        index = str.lastIndexOf(' - ');
        if(index > 0) {
            ret.aname = str.substr(0,index);
            ret.aid = str.substring(index+3)
        }
        return ret
    },

    searchUrlBtnClick : function() {
        if(this.searchBtnIcon.attr('class') == 'fa fa-spinner fa-pulse fa-fw') {
            return;
        }
        this.searchBtnIcon.attr('class', 'fa fa-spinner fa-pulse fa-fw');
        this.assetListView[0].innerHTML = '';
        urlheader = $('#id_tab1_url_header')[0].innerText;
        domainurl = $('#id_tab1_url_input').val();
        if(domainurl == undefined || domainurl == '') {
            this.searchBtnIcon.attr('class', 'fa fa-search');
            return;
        }
        this.searchUrlExecute(urlheader + domainurl,1)
    },

    searchUrlExecute : function(baseurl,cnter) {
        $.ajax({
            url: baseurl + '/.well-known/stellar.toml',
            type: 'GET',
            async : true,
            cache :false,
            success: function(data, status,xhr){
                assetArray = AnchorController.resovleTomlContext(data);
                cnter = 2;
                if(assetArray.length == 0) {
                    AnchorController.assetListView[0].innerHTML = '<p style="color: red;">' + AnchorController.uiViews.err_url_invalid + '</p>';
                } else {
                    for(var idx = 0 ; idx < assetArray.length ; idx++) {
                        AnchorController.appendAsset(AnchorController.makeAnchorAsset(assetArray[idx].aid,assetArray[idx].aname));
                    }
                }
            },
            error: function (xhr, status, e) {
                if(cnter == 2) {
                    AnchorController.assetListView[0].innerHTML = '<p style="color: red;">' + AnchorController.uiViews.err_url_denie + '</p>';
                } else {
                    urlheadbtn = $('#id_tab1_url_header')[0];
                    if(urlheadbtn.innerText == 'http://') {
                        urlheadbtn.innerText='https://'
                    } else {
                        urlheadbtn.innerText='http://'
                    }
                    AnchorController.searchUrlExecute(urlheadbtn.innerText + $('#id_tab1_url_input').val(),2);
                }
            },
            complete: function() {
                if(cnter == 2) {
                    AnchorController.searchBtnIcon.attr('class', 'fa fa-search');
                }
            }
        });
    },

    resovleTomlContext : function(tomlDatas) {
        tdatas = tomlDatas;
        result = [];
        var index = tdatas.indexOf('[[CURRENCIES]]');
        var iret = 0;
        while(index >= 0) {
            result[iret] = {};
            tmpIndex = tdatas.indexOf('[[CURRENCIES]]',index+1);
            if(tmpIndex > 0) {
                subStr = tdatas.substring(index,tmpIndex);
            } else {
                subStr = tdatas.substring(index);
            }
            result[iret].aname = subStr.match(/code=\"(\w*)\"/)[1];
            result[iret].aid = subStr.match(/issuer=\"(\w*)\"/)[1];
            iret++;
            index = tmpIndex;
        }
        return result
    },

    checkAnchorAddress : function(p) {
        anchorAddress = this.anchorAccId.val();
        if(anchorAddress == null || anchorAddress == "" || anchorAddress == undefined) {
            return null;
        }
        if(StellarSdk.Keypair.isValidPublicKey(anchorAddress)){
            p.anchorAddr = anchorAddress;
            return p;
        }
        return null;
    },

    clearErrorMsg : function() {
        this.errorMsgCxt.css('display','none');
    },

    setErrorMsg : function(emsg) {
        this.errorMsgCxt.css('display','block');
        this.errorMsgCxt[0].innerText = emsg;
    },

    clearMsgContext : function() {
        this.exeMsgCxt.css('display','none');
        this.exeMsgCxt[0].innerText = '';
    },

    appendMsgContext : function(msg) {
        this.exeMsgCxt.css('display','block');
        this.exeMsgCxt[0].innerText = this.exeMsgCxt[0].innerText + '\r\n  ' + msg;
    },

    getChangeTrustOperation : function(p, isRemove) {
        if(isRemove) {
            return StellarSdk.Operation.changeTrust({
                asset: new StellarSdk.Asset(p.anchorName, p.anchorAddr),
                limit: '0',
                source: p.srcAddr
            });
        }
        return StellarSdk.Operation.changeTrust({
            asset: new StellarSdk.Asset(p.anchorName, p.anchorAddr),
            source: p.srcAddr
        });
    },

    addConfirmClick : function() {
        if(mAddress == '' || mAddress == undefined || mKey1 == '' || mKey1 == undefined) {
            errorResponse(null, null, '', "../error.html", this.uiViews.err_invalid_operation);
            return;
        }

        this.clearErrorMsg();
        this.clearMsgContext();

        var operaInfo = {
            anchorAddr: '',
            anchorName: '',
            srcAddr : mAddress,
            skey : mKey1
        };

        operaInfo = this.checkAnchorAddress(operaInfo);
        if(operaInfo == null) {
            this.setErrorMsg(this.uiViews.err_invalid_anchor_addr);
            return;
        }

        if(this.assetName.val() == '' || this.assetName.val() == null || this.assetName.val() == undefined) {
            this.setErrorMsg(this.uiViews.err_invalid_anchor_name);
            return;
        }
        operaInfo.anchorName = this.assetName.val();

        ctBtnIcon = $('#id_confirm_changetrust_btnIcon');
        if(ctBtnIcon.attr('class') == 'fa fa-spinner fa-pulse fa-fw') {
            return;
        }

        ctBtnIcon.attr('class','fa fa-spinner fa-pulse fa-fw');

        setStellarNetwork("LIVE");

        this.Step1(operaInfo,ctBtnIcon, 2);
       /* for test in test net
         GBEVGGCOFHH2ERVCKSZ73WBBEXG2AKWNCHPRGVVLQFUHHVE5L2CFDRN5
         SATQI7CQR6AWRUADWP62ELHHJHAUCGHO2NIBH3DXF3LM36MJG7GOQIXQ

         GC4BKCKTTHQYG4FYE6VBS6WZ2TYFRGHRNYRYT7SEH3ALAIAB7Z6CBIP6
         SDTYDBNVVGH4EEPRXUNGWLZUZVOF4RW2AL6QZYZ4A5C5PZKKZEQT3ISZ
        * */
    },

    // 检查当前账户是否可用
    Step1 : function(p,btnicon, toStep) {
        if(toStep == 2) {
            AnchorController.appendMsgContext(AnchorController.uiViews.step1_title_cap);
        } else if(toStep == 3) {
            AnchorController.appendRvmMsg(AnchorController.uiViews.step1_title_cap);
        }

        getUrl = StellarCurrentNetworkUrl + StellarAccounts + '/' + p.srcAddr;

        $.ajax({
            url: getUrl,
            dataType: 'json',
            cache :false,
            async : true,
            success: function(data, status, xhr) {
                if(data.balances != null && data.sequence != null) {
                    accInfo = AccountInfoDecode(data);
                    switch (toStep) {
                        case 0:
                        {
                            for(var idx = 1 ; idx < accInfo.Credits.length ; idx++) {
                                AnchorController.appendRemoveAssetList(AnchorController.makeAnchorAsset(accInfo.Credits[idx].issuer,accInfo.Credits[idx].asset_code))
                            }
                        }
                            break;
                        case 2:
                        {
                            p.sequence = accInfo.Sequence;
                            if (accInfo.LumensBalance > 30){
                                AnchorController.Step2(p, btnicon);
                            }else{
                                AnchorController.appendMsgContext(AnchorController.uiViews.step1_account_balance_not_enough);
                                btnicon.attr('class','fa fa-check-circle-o');
                            }
                        }
                            break;
                        case 3:
                        {
                            p.sequence = accInfo.Sequence;
                            if (accInfo.LumensBalance > 20){
                                AnchorController.Step3(p, btnicon);
                            }else{
                                AnchorController.appendRvmMsg(AnchorController.uiViews.step1_account_balance_not_enough);
                                btnicon.attr('class','fa fa-check-circle-o');
                            }
                        }
                            break;
                    }
                } else {
                    if(toStep == 2) {
                        AnchorController.setErrorMsg(AnchorController.uiViews.err_Account_not_exist);
                        btnicon.attr('class','fa fa-check-circle-o');
                    } else if(toStep == 3) {
                        AnchorController.appendRvmMsg(AnchorController.uiViews.err_Account_not_exist);
                        btnicon.attr('class','fa fa-check-circle-o');
                    }
                }
            },
            error: function(xhr, status, e) {
                if(toStep == 2) {
                    if(xhr.status == 404 && xhr.statusText == 'Not Found') {
                        AnchorController.setErrorMsg(AnchorController.uiViews.err_Account_not_exist);
                    } else {
                        AnchorController.setErrorMsg(e);
                    }
                    btnicon.attr('class','fa fa-check-circle-o');
                } else if(toStep == 3) {
                    if(xhr.status == 404 && xhr.statusText == 'Not Found') {
                        AnchorController.appendRvmMsg(AnchorController.uiViews.err_Account_not_exist);
                    } else {
                        AnchorController.appendRvmMsg(e);
                    }
                    btnicon.attr('class','fa fa-check-circle-o');
                }
            },
            complete: function() {
                if(toStep == 0) {
                    btnicon.attr('class','fa fa-refresh fa-2x fa-pull-right');
                }
            }
        });
    },

    // 发送change trust业务到网络
    Step2 : function(p, btnicon) {
        AnchorController.appendMsgContext(AnchorController.uiViews.step2_title_cap);

        ctOpera = AnchorController.getChangeTrustOperation(p,false);
        trans = new StellarSdk.TransactionBuilder(new StellarSdk.Account(p.srcAddr, p.sequence));
        trans.addOperation(ctOpera);
        trans = trans.build();
        uencKey = TransDecrypt(mKey0.substr(0,16), p.skey, true);
        trans.sign(StellarSdk.Keypair.fromSeed(uencKey));
        uencKey = '';
        base64 = trans.toEnvelope().toXDR().toString("base64");

        urlpost = StellarCurrentNetworkUrl + StellarTransactions;


        $.ajax({
            url: urlpost,
            type: 'POST',
            data: 'tx=' + encodeURIComponent(base64),
            async : true,
            cache :false,
            success: function(data, status,xhr){
                AnchorController.appendMsgContext(AnchorController.uiViews.step2_success);
            },
            error: function (xhr, status, e) {
                AnchorController.setErrorMsg(AnchorController.uiViews.step2_Failure);
                AnchorController.setErrorMsg(xhr.responseText);
            },
            complete: function() {
                btnicon.attr('class','fa fa-check-circle-o');
            }
        })
    },

    // 发送取消change trust业务到网络
    Step3 : function(p, btnicon) {
        AnchorController.appendRvmMsg(AnchorController.uiViews.step2_title_cap);

        trans = new StellarSdk.TransactionBuilder(new StellarSdk.Account(p.srcAddr, p.sequence));
        for(var idx = 0; idx < p.anchorAddr.length; idx++){
            rmctOpera = AnchorController.getChangeTrustOperation({anchorAddr: p.anchorAddr[idx], anchorName: p.anchorName[idx]},true);
            trans.addOperation(rmctOpera);
        }
        trans = trans.build();
        uencKey = TransDecrypt(mKey0.substr(0,16), p.skey, true);
        trans.sign(StellarSdk.Keypair.fromSeed(uencKey));
        uencKey = '';
        base64 = trans.toEnvelope().toXDR().toString("base64");

        urlpost = StellarCurrentNetworkUrl + StellarTransactions;


        $.ajax({
            url: urlpost,
            type: 'POST',
            data: 'tx=' + encodeURIComponent(base64),
            async : true,
            cache :false,
            success: function(data, status,xhr){
                AnchorController.appendRvmMsg(AnchorController.uiViews.step3_success);
                setTimeout(AnchorController.refreshAccInfoClick,1000);
            },
            error: function (xhr, status, e) {
                AnchorController.appendRvmMsg(AnchorController.uiViews.step3_Failure);
                AnchorController.appendRvmMsg(xhr.responseText);
            },
            complete: function() {
                btnicon.attr('class','fa fa-check-circle-o');
            }
        })
    },

    refreshAccInfoClick : function() {
        headingBtn = $('#id_tab2_heading_btn');
        if(headingBtn.attr('class') == 'fa fa-spinner fa-pulse fa-fw fa-2x fa-pull-right') {
            return;
        }
        headingBtn.attr('class','fa fa-spinner fa-pulse fa-fw fa-2x fa-pull-right');
        AnchorController.rmvList[0].innerHTML = '';
        AnchorController.rmvHashTable = {};
        cfmBtn = $('#id_confirm_remove_ct_cfm')[0];
        cfmBtn.checked = false;
        AnchorController.confirmRemoveClick();
        AnchorController.clearRvmMsg();
        AnchorController.Step1({srcAddr:mAddress},headingBtn, 0);
    },

    appendRemoveAssetList : function(msg) {
        rmInfo = '<div class="checkbox" style="word-wrap: break-word; word-break: break-all">';
        rmInfo += '<label><input type="checkbox" onclick="AnchorController.selectRemoveItem(\''+msg+'\',this)"/>' + msg + '</label>';
        rmInfo += '</div>';
        AnchorController.rmvList[0].innerHTML = AnchorController.rmvList[0].innerHTML + rmInfo;
        AnchorController.rmvHashTable[msg] = false;
    },

    confirmRemoveClick : function() {
        cfmBtn = $('#id_confirm_remove_ct_cfm')[0];
        if(cfmBtn.checked == true) {
            $('#id_confirm_remove_changetrust_btn').removeAttr('disabled')
        } else {
            $('#id_confirm_remove_changetrust_btn').attr('disabled','disabled')
        }
    },

    selectRemoveItem : function(citm, obj) {
        if(obj == null || obj == undefined) {
            return;
        }
        this.rmvHashTable[citm] = obj.checked;
        this.clearRvmMsg();
    },

    appendRvmMsg : function(msg) {
        this.rmvMsgCxt.css('display','block');
        this.rmvMsgCxt[0].innerText = this.rmvMsgCxt[0].innerText + '\r\n ' + msg;
    },

    clearRvmMsg : function() {
        this.rmvMsgCxt.css('display','none');
        this.rmvMsgCxt[0].innerText = '';
    },

    removeAnchorConfirmBtnClick : function() {
        if(mAddress == '' || mAddress == undefined || mKey1 == '' || mKey1 == undefined) {
            errorResponse(null, null, '', "../error.html", this.uiViews.err_invalid_operation);
            return;
        }
        this.clearRvmMsg();

        var operaInfo = {
            anchorAddr: [],
            anchorName: [],
            srcAddr : mAddress,
            skey : mKey1
        };

        for(var ikey in this.rmvHashTable) {
            if(this.rmvHashTable[ikey] == true) {
                rmvItmInfo = this.splitAnchorAsset(ikey);
                operaInfo.anchorAddr[operaInfo.anchorAddr.length] = rmvItmInfo.aid;
                operaInfo.anchorName[operaInfo.anchorName.length] = rmvItmInfo.aname;
            }
        }

        if(operaInfo.anchorAddr.length == 0) {
            this.appendRvmMsg(this.uiViews.rmv_anchor_not_select);
            return;
        }

        rvmBtnIcon = $('#id_confirm_remove_changetrust_btnIcon');
        if(rvmBtnIcon.attr('class') == 'fa fa-spinner fa-pulse fa-fw') {
            return;
        }

        rvmBtnIcon.attr('class','fa fa-spinner fa-pulse fa-fw');

        setStellarNetwork("LIVE");

        this.Step1(operaInfo, rvmBtnIcon, 3)
    }
};