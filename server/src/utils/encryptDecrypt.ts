import { AES, enc } from "crypto-js";
import "dotenv/config";

const { AUTH_SECRET: key } = process.env;

export function decrypt(encryptedPassword: string): string | undefined { 
    const decrypted = AES.decrypt(encryptedPassword, key as string)
    if(decrypted){
        const decryptedString = decrypted.toString(enc.Utf8)
        return decryptedString
    }
    return

}

export function encrypt(password: string): string {
    const encryptedString = AES.encrypt(password, key as string).toString();
    return encryptedString;
}
