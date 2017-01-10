/**
 * Created by jojopoper on 2017/01/04.
 */

var BaseOperation = function(mainAddr){
    this.Type = "";
    this.SubType = "";
    this.SourceAccount = "";
    this.Hash = "";
    this.MainAddress = mainAddr;
    this.Title = "";
    this.Details = "";
    this.DetailRows = 4;

    this.BaseDecodeBody = function(body){
        this.SourceAccount = body.source_account;
        this.Hash = body._links.transaction.href;
    }
};

var PAYMENT_IN = "PAY-IN";
var PAYMENT_OUT = "PAY-OUT";
var PAYMENT_TYPE = "payment";

var PaymentOperation = function(mainAddr){
    BaseOperation.apply(this,arguments);
    this.From = "";
    this.To = "";
    this.Amount = "";
    this.AssetCode = "";
    this.AssetIssuer = "";
    this.AssetType = "";

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = PAYMENT_TYPE;
        this.From = body.from;
        this.To = body.to;
        this.Amount = body.amount;
        if (body.asset_issuer != null){
            this.AssetCode = body.asset_code;
            this.AssetIssuer = body.asset_issuer;
            this.AssetType = body.asset_type;
        }
        if(this.From == this.MainAddress){
            this.SubType = PAYMENT_OUT;
        }else if(this.To == this.MainAddress){
            this.SubType = PAYMENT_IN;
        }
    }
};

var PATHPAYMENT_IN = "PATH-PAY-IN";
var PATHPAYMENT_OUT = "PATH-PAY-OUT";
var PATHPAYMENT_TYPE = 'pathPayment';

var PathPaymentOperation = function(mainAddr) {
    BaseOperation.apply(this,arguments);
    this.From = "";
    this.To = "";
    this.DestAmount = "";
    this.SendAsset = {
        Code: '',
        Issuer: '',
        Type: ''
    };
    this.DestAsset = {
        Code: '',
        Issuer: '',
        Type: ''
    };
    this.sendMax = {
        amount : '',
        unsigned : false
    };
    this.path = [];

    this.DecodeBody = function(body) {
        this.BaseDecodeBody(body);
        this.Type = PATHPAYMENT_TYPE;
        this.From = body.from;
        this.To = body.to;
        this.Amount = body.amount;
        console.log('decode path payment operation ================= BODY is');
        console.log(body);
        //if (body.asset_issuer != null){
        //    this.AssetCode = body.asset_code;
        //    this.AssetIssuer = body.asset_issuer;
        //    this.AssetType = body.asset_type;
        //}
        //if(this.From == this.MainAddress){
        //    this.SubType = PAYMENT_OUT;
        //}else if(this.To == this.MainAddress){
        //    this.SubType = PAYMENT_IN;
        //}
    }
};

var CREATE_IN = "CREATE-IN";
var CREATE_OUT = "CREATE-OUT";
var CREATE_OTHER = "CREATE-OTHER";
var CREATE_TYPE = "create_account";

var CreateOperation = function(mainAddr){
    BaseOperation.apply(this,arguments);
    this.Account = "";
    this.Funder = "";
    this.StartingBalance = "";

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = CREATE_TYPE;
        this.Account = body.account;
        this.Funder = body.funder;
        this.StartingBalance = body.starting_balance;

        if(this.Account == this.MainAddress){
            this.SubType = CREATE_IN;
        } else if(this.Funder == this.MainAddress) {
            this.SubType = CREATE_OUT;
        }
    }
};

var MERGE_IN = "MERGE-IN";
var MERGE_DESTROY = "MERGE-DESTROY";
var MERGE_TYPE = "account_merge";

var MergeOperation = function(mainAddr){
    BaseOperation.apply(this,arguments);
    this.Account = "";
    this.Into = "";

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = MERGE_TYPE;
        this.Account = body.account;
        this.Into = body.into;

        if(this.Into == this.MainAddress){
            this.SubType = MERGE_IN;
        }else if(this.Account == this.MainAddress){
            this.SubType = MERGE_DESTROY;
        }
    }
};

var CHANGE_TRUST_IN = "CHANGE-TRUST-IN"; // 别人信任自己
var CHANGE_TRUST_ON = "CHANGE-TRUST-ON"; // 自己信任别人
var CHANGE_TRUST_TYPE = "change_trust";

var ChangeTrustOperation = function(mainAddr){
    BaseOperation.apply(this,arguments);
    this.AssetCode = "";
    this.AssetIssuer = "";
    this.AssetType = "";
    this.Trustee = "";
    this.Trustor = "";

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = CHANGE_TRUST_TYPE;
        this.AssetCode = body.asset_code;
        this.AssetIssuer = body.asset_issuer;
        this.AssetType = body.asset_type;
        this.Trustee = body.trustee;
        this.Trustor = body.trustor;

        if(this.Trustor == this.MainAddress){
            this.SubType = CHANGE_TRUST_ON;
        }
    }
};

var MANAGE_OFFER_TYPE = "manage_offer";
var MANAGE_OFFER_TRADING_BLOCK = "OFFER-TRADING-BLOCK"; //等待交易
var MANAGE_OFFER_DEAL_CLOSE = "OFFER-DEAL-CLOSE"; //交易完成

var ManageOfferOperation = function(mainAddr){
    BaseOperation.apply(this,arguments);
    this.Amount = "";
    this.OfferID = 0;
    this.Price = "";
    this.Buying = {
        Asset_Code:"",
        Asset_Type:"",
        Asset_Issuer:""
    };
    this.Selling = {
        Asset_Code:"",
        Asset_Type:"",
        Asset_Issuer:""
    };

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = MANAGE_OFFER_TYPE;
        this.Amount = body.amount;
        this.OfferID = body.offer_id;
        this.Price = body.price;

        this.Buying.Asset_Type = body.buying_asset_type;
        if(this.Buying.Asset_Type != "native"){
            this.Buying.Asset_Code = body.buying_asset_code;
            this.Buying.Asset_Issuer = body.buying_asset_issuer;
        }else{
            this.Buying.Asset_Code = "XLM";
            this.Buying.Asset_Issuer = body.selling_asset_issuer;
        }

        this.Selling.Asset_Type = body.selling_asset_type;
        if(this.Selling.Asset_Type != "native"){
            this.Selling.Asset_Code = body.selling_asset_code;
            this.Selling.Asset_Issuer = body.selling_asset_issuer;
        }else{
            this.Selling.Asset_Code = "XLM";
            this.Selling.Asset_Issuer = body.buying_asset_issuer;
        }
    }
};

var SET_OPTIONS_TYPE = "set_options";

var SetOptionsOperation = function(mainAddr){
    BaseOperation.apply(this,arguments);
    this.HomeDomain = "";
    this.InflationDest = "";
    this.SetFlags = [];
    this.ClearFlags = [];
    this.SignerKey = "";
    this.SignerWeight = "";

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = SET_OPTIONS_TYPE;
        this.HomeDomain = body.home_domain;
        this.InflationDest = body.inflation_dest;
        this.SignerKey = body.signer_key;
        this.SignerWeight = body.signer_weight;
        this.SetFlags = body.set_flags_s;
        this.ClearFlags = body.clear_flags_s;
    }
};

var ALLOW_TRUST_TYPE = 'allow_trust';

var AllowTrustOperation = function(mainAddr) {
    BaseOperation.apply(this,arguments);
    this.AssetCode = "";
    this.Trustor = "";

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = ALLOW_TRUST_TYPE;
    }
};

var CREATE_PASSIVE_OFFER_TYPE = 'create_passive_offer';

var CreatePassiveOfferOperation = function(mainAddr) {
    BaseOperation.apply(this,arguments);
    this.Amount = 0;
    this.Buying = {
        Code: '',
        Issuer: ''
    };
    this.Selling = {
        Code: '',
        Issuer: ''
    };
    this.Price = 0.0;

    this.DecodeBody = function(body){
        this.BaseDecodeBody(body);
        this.Type = CREATE_PASSIVE_OFFER_TYPE;
    }
};