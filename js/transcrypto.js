/**
 * Created by jojopoper on 2016/12/16.
 * require core.js enc-base64.js cipher-core.js evpkdf.js mode-cfb.js pad-nopadding.js aes.js
 */

function TransEncrypt(s,m) {
    k = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Hex.parse(s));

    var encrypted = CryptoJS.AES.encrypt(m, k, {
        iv: k,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });

    return CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
}

function TransDecrypt(s,m, isbyte) {
    k = CryptoJS.enc.Utf8.parse(CryptoJS.enc.Hex.parse(s));

    if(isbyte == true) {
        m = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(m));
    }

    var decrypted = CryptoJS.AES.decrypt(m, k, {
        iv: k,
        mode: CryptoJS.mode.CFB,
        padding: CryptoJS.pad.NoPadding
    });
    try{
        ret = decrypted.toString(CryptoJS.enc.Utf8);
    }catch(ex){
        console.log("decrypt has err" + ex);
        ret = "";
    }
    return ret;
}