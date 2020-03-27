import * as CryptoJS from 'crypto-js';
import { JSEncrypt } from 'jsencrypt';

export class KeyEncryptUtils {
    generateEncryptPassword(length): string {
        const encryptPassChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz*&-%/!?*+=()';
        let randomstring = '';
        for (let i = 0; i < length; i++) {
          const rnum = Math.floor(Math.random() * encryptPassChars.length);
          randomstring += encryptPassChars.substring(rnum, rnum + 1);
        }
        return randomstring;
      }
    
      encrypt(data: string, publicKeyData: string): string {
        const rsaEncrypt = new JSEncrypt();
        rsaEncrypt.setPublicKey(publicKeyData);
        const passPhrase = this.generateEncryptPassword(32);
        const iv = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
        const salt = CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex);
        const key = CryptoJS.PBKDF2( passPhrase, CryptoJS.enc.Hex.parse(salt), { keySize: 128 / 32, iterations: 1000 });
        const aesEncrypted = CryptoJS.AES.encrypt(data, key, { iv: CryptoJS.enc.Hex.parse(iv) });
        const aesKey = passPhrase + ':::' + salt + ':::' + aesEncrypted.iv;
        const encryptedMessage = aesEncrypted.ciphertext.toString(CryptoJS.enc.Base64);
        const encryptedKey = rsaEncrypt.encrypt(aesKey);
        const encrypted = encryptedKey + ':::' + encryptedMessage;
        return encrypted;
      }
}
