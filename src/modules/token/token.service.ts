import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from 'src/common/types/userPayload.type';
import { StringValue } from 'ms';
import { randomUUID } from 'crypto';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  generateToken(payload: UserPayload, secret: string, exp: StringValue) {
    return this.jwt.sign(payload, {
      secret,
      expiresIn: exp,
      jwtid: randomUUID(),
    });
  }

  verifyToken(token: string, secret: string) {
    return this.jwt.verify(token, {
      secret: secret,
    });
  }

  decodeToken(token: string) {
    return this.jwt.decode(token);
  }
}
