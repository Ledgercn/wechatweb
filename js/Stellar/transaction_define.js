/**
 * Created by jojopoper on 2017/01/04.
 */

var PaymentOperationEx = function(mainAddr){
    PaymentOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.DecodeBody = function(body,trans){
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = PAYMENT_TYPE;
        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            //console.log("body._attributes.sourceAccount\r\n",body._attributes.sourceAccount);
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }
        if(body._attributes.body._value._attributes.destination._value){
            address = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.destination._value);
            this.To = address;
            this.From = this.SourceAccount;
            if(this.From == "" || this.From == undefined){
                this.From = this.TransSourceAccount;
                this.SourceAccount = this.TransSourceAccount;
            }
            if(address == this.MainAddress){
                this.SubType = PAYMENT_IN;
            }else{
                this.SubType = PAYMENT_OUT;
            }
        }
        if(body._attributes.body._value._attributes.amount != null){
            high = body._attributes.body._value._attributes.amount.high;
            low = body._attributes.body._value._attributes.amount.low;
            if(high < 0){
                high += 4294967296;
            }
            if(low < 0){
                low += 4294967296;
            }
            value = (high*4294967296+low)/10000000.0;
            this.Amount = ""+value;
        }
        if(body._attributes.body._value._attributes.asset._value != null){
            this.AssetType = body._attributes.body._value._attributes.asset._arm;
            this.AssetCode = String(body._attributes.body._value._attributes.asset._value._attributes.assetCode);
            this.AssetIssuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.asset._value._attributes.issuer._value);
        }
    }
};

var PathPaymentOperationEx = function(mainAddr) {
    PathPaymentOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.DecodeBody = function(body,trans){
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = PATHPAYMENT_TYPE;
        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            //console.log("body._attributes.sourceAccount\r\n",body._attributes.sourceAccount);
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }
        if(body._attributes.body._value._attributes.destination._value){
            address = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.destination._value);
            this.To = address;
            this.From = this.SourceAccount;
            if(this.From == "" || this.From == undefined){
                this.From = this.TransSourceAccount;
                this.SourceAccount = this.TransSourceAccount;
            }
            if(address == this.MainAddress){
                this.SubType = PATHPAYMENT_IN;
            }else{
                this.SubType = PATHPAYMENT_OUT;
            }
        }
        if(body._attributes.body._value._attributes.destAmount != null){
            high = body._attributes.body._value._attributes.destAmount.high;
            low = body._attributes.body._value._attributes.destAmount.low;
            if(high < 0){
                high += 4294967296;
            }
            if(low < 0){
                low += 4294967296;
            }
            value = (high*4294967296+low)/10000000.0;
            this.DestAmount = ""+value;
        }
        if(body._attributes.body._value._attributes.destAsset._value != null && body._attributes.body._value._attributes.destAsset._value != undefined){
            this.DestAsset.Type = body._attributes.body._value._attributes.destAsset._arm;
            this.DestAsset.Code = String(body._attributes.body._value._attributes.destAsset._value._attributes.assetCode);
            this.DestAsset.Issuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.destAsset._value._attributes.issuer._value);
        }
        if(body._attributes.body._value._attributes.sendAsset._value != null && body._attributes.body._value._attributes.sendAsset._value != undefined){
            this.DestAsset.Type = body._attributes.body._value._attributes.sendAsset._arm;
            this.DestAsset.Code = String(body._attributes.body._value._attributes.sendAsset._value._attributes.assetCode);
            this.DestAsset.Issuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.sendAsset._value._attributes.issuer._value);
        }
        if(body._attributes.body._value._attributes.sendMax != null && body._attributes.body._value._attributes.sendMax != undefined){
            high = body._attributes.body._value._attributes.sendMax.high;
            low = body._attributes.body._value._attributes.sendMax.low;
            if(high < 0){
                high += 4294967296;
            }
            if(low < 0){
                low += 4294967296;
            }
            value = (high*4294967296+low)/10000000.0;
            this.sendMax.amount = ""+value;
            this.sendMax.unsigned = body._attributes.body._value._attributes.sendMax.unsigned;
        }
        if(body._attributes.body._value._attributes.path != null && body._attributes.body._value._attributes.path != undefined){
            for(var i = 0 ; i < body._attributes.body._value._attributes.path.length ; ++i) {
                this.path[i] = {
                    Type: body._attributes.body._value._attributes.path[i]._arm,
                    Code: String(body._attributes.body._value._attributes.path[i]._value._attributes.assetCode),
                    Issuer : StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.path[i]._value._attributes.issuer._value)
                }
            }
        }
    }
};

var MergeOperationEx = function(mainAddr){
    MergeOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.DecodeBody = function(body,trans){
        console.log(body);
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = MERGE_TYPE;

        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            //console.log("body._attributes.sourceAccount\r\n",body._attributes.sourceAccount);
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.Account = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
                this.SourceAccount = this.Account;
            }
        }
        if(this.SourceAccount == "" || this.SourceAccount == undefined){
            this.SourceAccount = this.TransSourceAccount;
            this.Account = this.TransSourceAccount;
        }

        if(body._attributes.body._value._arm == "ed25519"){
            this.Into = StellarSdk.encodeCheck("accountId", body._attributes.body._value._value);
        }

        if(this.Into == this.MainAddress){
            this.SubType = MERGE_IN;
        }else if(this.Account == this.MainAddress){
            this.SubType = MERGE_DESTROY;
        }
        console.log(this);
    }
};

var CreateOperationEx = function(mainAddr){
    CreateOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.DecodeBody = function(body,trans){
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = CREATE_TYPE;

        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            //console.log("body._attributes.sourceAccount\r\n",body._attributes.sourceAccount);
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.Funder = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }

        if(this.Funder == ""){
            if(body._attributes.body.sourceAccount != null){
                //console.log("body._attributes.sourceAccount\r\n",body._attributes.sourceAccount);
                if(body._attributes.body.sourceAccount._arm == "ed25519"){
                    this.Funder = StellarSdk.encodeCheck("accountId", body._attributes.body.sourceAccount._value);
                }
            }
        }

        if(this.Funder == ""){
            this.Funder = this.TransSourceAccount;
        }

        if(body._attributes.body != null){
            if(body._attributes.body._value._attributes.destination._arm == "ed25519"){
                this.Account = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.destination._value);
            }

            if(body._attributes.body._value._attributes.startingBalance != null){
                high = body._attributes.body._value._attributes.startingBalance.high;
                low = body._attributes.body._value._attributes.startingBalance.low;
                if(high < 0){
                    high += 4294967296;
                }
                if(low < 0){
                    low += 4294967296;
                }
                value = (high*4294967296+low)/10000000.0;
                this.StartingBalance = ""+value;
            }
        }
        if(this.Account == "" && this.Funder != this.MainAddress){
            if(body._attributes.tx._attributes.operations != null){
                for( var i = 0 ; i < body._attributes.tx._attributes.operations.length ; ++i){
                    opera = body._attributes.tx._attributes.operations[0];

                    if(opera._attributes.body._value._attributes.startingBalance != null){
                        high = opera._attributes.body._value._attributes.startingBalance.high;
                        low = opera._attributes.body._value._attributes.startingBalance.low;
                        if(high < 0){
                            high += 4294967296;
                        }
                        if(low < 0){
                            low += 4294967296;
                        }
                        value = (high*4294967296+low)/10000000.0;
                        this.StartingBalance = ""+value;
                    }

                    if(opera._attributes.body._value._attributes.destination._arm == "ed25519"){
                        account = StellarSdk.encodeCheck("accountId", opera._attributes.body._value._attributes.destination._value);
                        if(account == this.MainAddress){
                            this.Account = account;
                            break;
                        }
                    }
                }
            }
        }

        if(this.Account == this.MainAddress){
            this.SubType = CREATE_IN;
            this.SourceAccount = this.Funder;
        } else if(this.Funder == this.MainAddress) {
            this.SubType = CREATE_OUT;
            this.SourceAccount = this.Funder;
        } else {
            this.SourceAccount = this.TransSourceAccount;
            this.SubType = CREATE_OTHER;
        }
    }
};

var ManageOfferOperationEx = function(mainAddr){
    ManageOfferOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.DecodeBody = function(body,trans){
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = MANAGE_OFFER_TYPE;

        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }

        if(this.SourceAccount == ""){
            if(this.TransSourceAccount != this.MainAddress){
                this.SubType = MANAGE_OFFER_DEAL_CLOSE;
            } else {
                this.SubType = MANAGE_OFFER_TRADING_BLOCK;
            }
            this.SourceAccount = this.TransSourceAccount;
        } else {
            if(this.SourceAccount != this.TransSourceAccount){
                this.SubType = MANAGE_OFFER_DEAL_CLOSE;
            } else {
                this.SubType = MANAGE_OFFER_TRADING_BLOCK;
            }
        }

        if(body._attributes.body._value._attributes.amount != null){
            high = body._attributes.body._value._attributes.amount.high;
            low = body._attributes.body._value._attributes.amount.low;
            if(high < 0){
                high += 4294967296;
            }
            if(low < 0){
                low += 4294967296;
            }
            value = (high*4294967296+low)/10000000.0;
            this.Amount = ""+value;
        }

        if(body._attributes.body._value._attributes.buying != null){
            if(body._attributes.body._value._attributes.buying._switch.name == "assetTypeCreditAlphanum4"){
                this.Buying.Asset_Type = "alphaNum4";
            } else if(body._attributes.body._value._attributes.buying._switch.name == "assetTypeNative"){
                this.Buying.Asset_Type = "native";
            } else {
                this.Buying.Asset_Type = "alphaNum8";
            }

            if(body._attributes.body._value._attributes.buying._value == null){
                this.Buying.Asset_Code = "XLM";
            } else {
                this.Buying.Asset_Code = String(body._attributes.body._value._attributes.buying._value._attributes.assetCode);
                this.Buying.Asset_Issuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.buying._value._attributes.issuer._value);
            }
        }

        high = body._attributes.body._value._attributes.offerId.high;
        low = body._attributes.body._value._attributes.offerId.low;
        if(high < 0){
            high += 4294967296;
        }
        if(low < 0){
            low += 4294967296;
        }
        this.OfferID = high * 4294967296 + low;
        this.Price = body._attributes.body._value._attributes.price._attributes.n*1.0 / body._attributes.body._value._attributes.price._attributes.d;

        if(body._attributes.body._value._attributes.selling != null){
            if(body._attributes.body._value._attributes.selling._switch.name == "assetTypeCreditAlphanum4"){
                this.Selling.Asset_Type = "alphaNum4";
            } else if(body._attributes.body._value._attributes.selling._switch.name == "assetTypeNative"){
                this.Selling.Asset_Type = "native";
            } else {
                this.Selling.Asset_Type = "alphaNum8";
            }

            if(body._attributes.body._value._attributes.selling._value == null){
                this.Selling.Asset_Code = "XLM";
                if(this.Buying.Asset_Issuer != ""){
                    this.Selling.Asset_Issuer = this.Buying.Asset_Issuer;
                }
            } else {
                this.Selling.Asset_Code = String(body._attributes.body._value._attributes.selling._value._attributes.assetCode);
                this.Selling.Asset_Issuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.selling._value._attributes.issuer._value);
                if(this.Buying.Asset_Issuer == ""){
                    this.Buying.Asset_Issuer = this.Selling.Asset_Issuer;
                }
            }
        }
    }
};

var SetOptionsOperationEx = function(mainAddr){
    SetOptionsOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.highThreshold = 0;
    this.medThreshold = 0;
    this.lowThreshold = 0;
    this.masterWeight = 0;

    this.DecodeBody = function(body,trans){
        //console.log('SetOptionsOperationEx body');
        //console.log(body);
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = SET_OPTIONS_TYPE;

        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }

        if(this.SourceAccount == ""){
            this.SourceAccount = this.TransSourceAccount;
        }

        if(body._attributes.body._value._attributes != null){
            this.HomeDomain = body._attributes.body._value._attributes.homeDomain;
            if(body._attributes.body._value._attributes.inflationDest != null){
                this.InflationDest = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.inflationDest._value);
            }
            if(body._attributes.body._value._attributes.signer != null){
                this.SignerKey = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.signer._attributes.pubKey._value);
                this.SignerWeight = body._attributes.body._value._attributes.signer._attributes.weight;
            }
            this.SetFlags = body._attributes.body._value._attributes.setFlags;
            this.ClearFlags = body._attributes.body._value._attributes.clearFlags;
            this.highThreshold = body._attributes.body._value._attributes.highThreshold;
            this.medThreshold = body._attributes.body._value._attributes.medThreshold;
            this.lowThreshold = body._attributes.body._value._attributes.lowThreshold;
        }
    }
};

var ChangeTrustOperationEx = function(mainAddr){
    ChangeTrustOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";
    this.isFederation = false;
    this.showDetails = false;

    this.DecodeBody = function(body,trans){
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = CHANGE_TRUST_TYPE;

        if(body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined){
            if(body._attributes.sourceAccount._arm == "ed25519"){
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }

        if(body._attributes.body._value._attributes.line != null){
            this.AssetType = body._attributes.body._value._attributes.line._switch.name; // assetTypeCreditAlphanum4
            this.AssetCode = String(body._attributes.body._value._attributes.line._value._attributes.assetCode);
            this.AssetIssuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.line._value._attributes.issuer._value);
            this.Trustee = this.AssetIssuer;
        }

        if(this.SourceAccount != ""){
            this.Trustor = this.SourceAccount;
        } else {
            this.Trustor = this.TransSourceAccount;
            this.SourceAccount = this.TransSourceAccount;
        }

        if(body._attributes.body._value._attributes.limit != null) {
            if(body._attributes.body._value._attributes.limit.high == 0 && body._attributes.body._value._attributes.limit.low == 0) {
                this.SubType = CHANGE_TRUST_OFF;
            } else {
                this.SubType = CHANGE_TRUST_ON;
            }
        }
    }
};

var AllowTrustOperationEx = function(mainAddr) {
    AllowTrustOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";

    this.DecodeBody = function(body,trans) {
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = ALLOW_TRUST_TYPE;

        if (body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined) {
            if (body._attributes.sourceAccount._arm == "ed25519") {
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }
        this.AssetCode = String(body._attributes.body._value._attributes.asset._value);
        this.Trustor = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.trustor._value);

        if(this.SourceAccount == ""){
            this.SourceAccount = this.TransSourceAccount;
        }
    }
};

var CreatePassiveOfferOperationEx = function(mainAddr) {
    CreatePassiveOfferOperation.apply(this,arguments);
    this.created_datetime = "";
    this.TransSourceAccount = "";
    this.fee_paid = "";
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account_sequence = 0;
    this.subTitle = "";
    this.addrTitle = "";

    this.DecodeBody = function(body,trans) {
        this.created_datetime = trans.created_at;
        this.fee_paid = trans.fee_paid;
        this.memodef.memo = trans.memodef.memo;
        this.memodef.memo_type = trans.memodef.memo_type;
        this.TransSourceAccount = trans.source_account;
        this.Hash = trans.hash;
        this.source_account_sequence = trans.source_account_sequence;
        this.Type = CREATE_PASSIVE_OFFER_TYPE;

        if (body._attributes.sourceAccount != null && body._attributes.sourceAccount != undefined) {
            if (body._attributes.sourceAccount._arm == "ed25519") {
                this.SourceAccount = StellarSdk.encodeCheck("accountId", body._attributes.sourceAccount._value);
            }
        }
        if(body._attributes.body._value._attributes.amount != null){
            high = body._attributes.body._value._attributes.amount.high;
            low = body._attributes.body._value._attributes.amount.low;
            if(high < 0){
                high += 4294967296;
            }
            if(low < 0){
                low += 4294967296;
            }
            value = (high*4294967296+low)/10000000.0;
            this.Amount = ""+value;
        }

        if(body._attributes.body._value._attributes.buying != null &&
            body._attributes.body._value._attributes.buying._value != null &&
            body._attributes.body._value._attributes.buying._value != undefined){
            this.Buying.Code = String(body._attributes.body._value._attributes.selling._value._attributes.assetCode);
            this.Buying.Issuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.selling._value._attributes.issuer._value);
        }

        if(body._attributes.body._value._attributes.selling != null &&
            body._attributes.body._value._attributes.selling._value != null &&
            body._attributes.body._value._attributes.selling._value != undefined){
            this.Selling.Code = String(body._attributes.body._value._attributes.selling._value._attributes.assetCode);
            this.Selling.Issuer = StellarSdk.encodeCheck("accountId", body._attributes.body._value._attributes.selling._value._attributes.issuer._value);
        }

        if(body._attributes.body._value._attributes.price != null &&
            body._attributes.body._value._attributes.price._attributes != null &&
            body._attributes.body._value._attributes.price._attributes != undefined){
            d = body._attributes.body._value._attributes.price._attributes.d;
            n = body._attributes.body._value._attributes.price._attributes.n;
            this.Price = n*1.0/d;
        }

        if(this.SourceAccount == ""){
            this.SourceAccount = this.TransSourceAccount;
        }
    }
};

var BaseTransactionDef = function(main){
    this.id = "";
    this.created_at = "";
    this.fee_paid = "";
    this.hash = "";
    this.mainAddr = main;
    this.memodef = {
        memo:"",
        memo_type:"",
    };
    this.source_account = "";
    this.source_account_sequence = 0;
    this.paging_token = 0;
    this.ledger = 0;
    this.operation_count = 0;
    this.envelope_xdr = "";

    this.DecodeBody = function(body){
        this.id = body.id;
        this.created_at = body.created_at;
        this.fee_paid = body.fee_paid;
        this.hash = body.hash;
        this.source_account = body.source_account;
        this.source_account_sequence = body.source_account_sequence;
        this.operation_count = body.operation_count;
        this.paging_token = body.paging_token*1;
        this.ledger = body.ledger;
        this.envelope_xdr = body.envelope_xdr;
        this.memodef.memo_type = body.memo_type;
        if(this.memodef.memo_type != "none"){
            this.memodef.memo = body.memo;
            if(this.memodef.memo_type == "hash" || this.memodef.memo_type == "return"){
                decodeb64 = CryptoJS.enc.Base64.parse(this.memodef.memo);
                this.memodef.memo = decodeb64.toString(CryptoJS.enc.Hex);
            }
        }else{
            this.memodef.memo = "";
        }
    };
    this.DecodeOperation = function(){
        obj = StellarSdk.xdr.TransactionEnvelope.fromXDR(this.envelope_xdr, 'base64');
        //console.log('  obj = ');
        //console.log(obj);
        //console.log('\r\n******************\r\n');
        var ret =[];
        //console.log(' * operations = ');
        //console.log(obj._attributes.tx._attributes.operations);
        //console.log('\r\n******************\r\n');
        if(obj._attributes.tx._attributes.operations != null){
            //console.log(' ** operation_count = ');
            //console.log(this.operation_count);
            //console.log('\r\n******************\r\n');
            for(var i = 0 ; i < this.operation_count ; ++i){
                operater = obj._attributes.tx._attributes.operations[i];
                //console.log(' *** operater = ');
                //console.log(operater);
                //console.log('\r\n******************\r\n');
                switch (operater._attributes.body._switch.name){
                    case "payment":
                        ret[i] = new PaymentOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        //if( ret[i].TransSourceAccount != this.mainAddr &&
                        //    ret[i].SourceAccount != this.mainAddr &&
                        //    ret[i].From != this.mainAddr &&
                        //    ret[i].To != this.mainAddr) {
                        //    ret[i] = null;
                        //}
                        break;
                    case "pathPayment":
                        ret[i] = new PathPaymentOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    case "accountMerge":
                        ret[i] = new MergeOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    case "createAccount":
                        ret[i] = new CreateOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        //if( ret[i].TransSourceAccount != this.mainAddr &&
                        //    ret[i].SourceAccount != this.mainAddr &&
                        //    ret[i].Funder != this.mainAddr &&
                        //    ret[i].Account != this.mainAddr) {
                        //    ret[i] = null;
                        //}
                        break;
                    case "manageOffer":
                        ret[i] = new ManageOfferOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    case "setOption":
                        ret[i] = new SetOptionsOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    case "changeTrust":
                        ret[i] = new ChangeTrustOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    case "allowTrust":
                        ret[i] = new AllowTrustOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    case "createPassiveOffer":
                        ret[i] = new CreatePassiveOfferOperationEx(this.mainAddr);
                        ret[i].DecodeBody(operater,this);
                        break;
                    default :
                    console.log(' *** operater = ');
                    console.log(operater);
                    console.log('\r\n******************\r\n');
                }

            }
        }
        return ret;
    };
};
