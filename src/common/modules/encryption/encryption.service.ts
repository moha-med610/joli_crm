import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CryptoJs from 'crypto-js';

@Injectable()
export class EncryptionService {
  constructor(private readonly config: ConfigService) {}

  encrypt(text: string) {
    return CryptoJs.AES.encrypt(
      text,
      this.config.get<string>('ENCRYPTION_KEY')!,
    ).toString();
  }

  decrypt(cipherText: string) {
    const bytes = CryptoJs.AES.decrypt(
      cipherText,
      this.config.get<string>('ENCRYPTION_KEY')!,
    );
    return bytes.toString(CryptoJs.enc.Utf8);
  }
}
