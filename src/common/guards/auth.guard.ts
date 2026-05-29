import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Request } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/modules/auth/schema/users.schema';
import { EncryptionService } from 'src/modules/encryption/encryption.service';
import { TokenService } from 'src/modules/token/token.service';
import { UserPayload } from '../types/userPayload.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectModel('User') private readonly Users: Model<User>,
    private readonly tokenService: TokenService,
    private readonly config: ConfigService,
    private readonly encryptionService: EncryptionService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Token Not Found');
    }

    try {
      const payload: UserPayload = this.tokenService.verifyToken(
        token,
        this.config.get<string>('JWT_ACCESS_TOKEN_KEY')!,
      );

      if (!payload) {
        throw new UnauthorizedException('Invalid Token');
      }

      const user = await this.Users.findById(payload.id).select('-password');
      if (!user) {
        throw new UnauthorizedException('Invalid user Id');
      }

      if (Number(user.tokenVersion) !== Number(payload.tokenVersion)) {
        throw new UnauthorizedException('Your Account is Logged out');
      }

      const userData = user.toObject();

      userData.phone = this.encryptionService.decrypt(user.phone);

      req['user'] = userData;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      throw new UnauthorizedException('Invalid Or Expired Token');
    }

    return true;
  }
}
