import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocument } from './schema/users.schema';
import { TokenService } from '../token/token.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserPayload } from 'src/common/types/userPayload.type';
import { EncryptionService } from '../encryption/encryption.service';
import { EmailsService } from '../emails/emails.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { type Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly Users: Model<User>,
    private readonly config: ConfigService,
    private readonly tokenService: TokenService,
    private readonly encryptionService: EncryptionService,
    private readonly emailService: EmailsService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async login(
    data: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email, password } = data;

    const user: UsersDocument | null = await this.Users.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid Credentials');
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid Credentials');
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    };

    const accessToken = this.tokenService.generateToken(
      payload,
      this.config.get<string>('JWT_ACCESS_TOKEN_KEY')!,
      this.config.get('JWT_ACCESS_TOKEN_EXP')!,
    );

    const refreshToken = this.tokenService.generateToken(
      payload,
      this.config.get<string>('JWT_REFRESH_TOKEN_KEY')!,
      this.config.get('JWT_REFRESH_TOKEN_EXP')!,
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { fullName, email, password, companyName, location, phone, role } =
      data;
    const isEmailExist = await this.Users.findOne({ email });
    if (isEmailExist) {
      throw new BadRequestException('This Email Already In Use');
    }

    const hashPassword = await bcrypt.hash(password, 12);
    const encryptedPhone = this.encryptionService.encrypt(phone);

    const newUser = await this.Users.create({
      fullName,
      email,
      password: hashPassword,
      companyName,
      location,
      phone: encryptedPhone,
      role,
    });

    return newUser;
  }

  async forgetPassword(data: any) {
    const { email } = data;

    const findEmail = await this.Users.findOne({ email });
    if (!findEmail) {
      throw new NotFoundException('User Not Found');
    }

    const otp = this.generateOtp();

    await this.cacheManager.set(`OTP:${email}`, otp, 10 * 60 * 1000);

    this.emailService.sendOtpEmail(email, otp);

    return { msg: 'OTP Sent To Your Email' };
  }

  async verifyResetPasswordOtp(data: any) {
    const { email, otp } = data;
    const findOtp = await this.cacheManager.get(`OTP:${email}`);

    if (!findOtp || findOtp !== otp) {
      throw new BadRequestException('Invalid Or Expired OTP');
    }

    await this.cacheManager.del(`OTP:${email}`);
    await this.cacheManager.set(`${email}:IsVerified`, true, 5 * 60 * 1000);

    return {
      msg: 'OTP Verified Successfully',
    };
  }

  async resetPassword(data: any) {
    const { email, newPassword } = data;

    const user = await this.Users.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid Email');
    }

    const isVerified = await this.cacheManager.get(`${email}:IsVerified`);
    if (!isVerified) {
      throw new BadRequestException(`Please Verify Your Otp First`);
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedNewPassword;
    await user.save();

    await this.cacheManager.del(`${email}:IsVerified`);

    return {
      msg: 'Password Updated Successfully',
    };
  }

  async changePassword(user: UsersDocument, data: any) {
    const { currentPassword, newPassword } = data;
    const userId = user._id;

    const findUser = await this.Users.findById(userId);
    if (!findUser) {
      throw new BadRequestException('User Not Found');
    }

    const isMatch = await bcrypt.compare(currentPassword, findUser.password);
    if (!isMatch) {
      throw new BadRequestException('Password is Incorrect');
    }

    const isSamePassword = await bcrypt.compare(newPassword, findUser.password);
    if (isSamePassword) {
      throw new BadRequestException('New Password Must Be A Different');
    }

    const hashPassword = await bcrypt.hash(newPassword, 12);

    findUser.password = hashPassword;
    findUser.tokenVersion += 1;
    await findUser.save();

    return {
      msg: 'Password Changed Successfully',
    };
  }

  async refreshToken(data: any) {
    const { refreshToken } = data;

    const verifyToken = this.tokenService.verifyToken(
      refreshToken,
      this.config.get<string>('JWT_REFRESH_TOKEN_KEY')!,
    );

    if (!verifyToken) {
      throw new BadRequestException('Invalid Refresh Tokens');
    }

    const payload: UserPayload = {
      id: verifyToken.id,
      email: verifyToken.email,
      role: verifyToken.role,
      tokenVersion: verifyToken.tokenVersion,
    };

    const newAccessToken = this.tokenService.generateToken(
      payload,
      this.config.get<string>('JWT_ACCESS_TOKEN_KEY')!,
      this.config.get('JWT_ACCESS_TOKEN_EXP')!,
    );

    const newRefreshToken = this.tokenService.generateToken(
      payload,
      this.config.get<string>('JWT_REFRESH_TOKEN_KEY')!,
      this.config.get('JWT_REFRESH_TOKEN_EXP')!,
    );

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }

  async logout(user: UsersDocument) {
    const userId = user?._id;

    const findUser = await this.Users.findById(userId);
    if (!findUser) {
      throw new UnauthorizedException();
    }

    findUser.tokenVersion += 1;
    findUser.save();

    return {
      msg: 'Your Account Logged out Successfully',
    };
  }

  private generateOtp() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
