/**
 * Created by jojopoper on 2016/12/10.
 * require core-min.js cipher-core.js mode-ecb-min.js enc-base64-min.js tripledes-min.js
 */


function EncSecretKey(msg , key){
    keyHex = CryptoJS.enc.Utf8.parse(key);
    //console.log(keyHex.toString());
    encrypted = CryptoJS.TripleDES.encrypt(msg, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding
    });
    console.log(encrypted.toString());
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

function UencSecretKey(msg , key){
    keyHex = CryptoJS.enc.Utf8.parse(key);
    decrypted = CryptoJS.TripleDES.decrypt({
        ciphertext: CryptoJS.enc.Base64.parse(msg)
    }, keyHex, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.NoPadding
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}