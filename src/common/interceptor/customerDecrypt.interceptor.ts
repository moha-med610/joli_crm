import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EncryptionService } from 'src/common/modules/encryption/encryption.service';

@Injectable()
export class CustomerDecryptInterceptor implements NestInterceptor {
  constructor(private readonly encryptionService: EncryptionService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((data) => this.decryptData(data)));
  }

  private decryptData(data: any): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.decryptData(item));
    }

    if (data.data) {
      data.data = this.decryptData(data.data);
      return data;
    }

    if (data.phone) {
      data.phone = this.encryptionService.decrypt(data.phone);
    }

    if (data.whatsapp) {
      data.whatsapp = this.encryptionService.decrypt(data.whatsapp);
    }

    return data;
  }
}
