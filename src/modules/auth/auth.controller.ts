import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginDto } from './dto/auth.dto';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { Roles } from 'src/common/decorators/rolesDecorator';
import { Role } from 'src/common/enums/userRole.enum';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard, RolesGuard)
  @HttpCode(201)
  @Post('create-user')
  async createUser(@Body() data: CreateUserDto, @Request() req: any) {
    return this.authService.createUser(data);
  }

  @Post('forget-password')
  @HttpCode(200)
  async forgetPassword(@Body() data: any) {
    return this.authService.forgetPassword(data);
  }

  @Post('verify-otp')
  @HttpCode(202)
  async verifyForgetPasswordOtp(@Body() data: any) {
    return this.authService.verifyResetPasswordOtp(data);
  }

  @Post('reset-password')
  @HttpCode(202)
  async resetPassword(@Body() data: any) {
    return this.authService.resetPassword(data);
  }

  @UseGuards(AuthGuard)
  @Post('change-password')
  @HttpCode(202)
  async changePassword(@Request() req: Express.Request, @Body() data: any) {
    return this.authService.changePassword(req['user'], data);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  @HttpCode(202)
  async logout(@Request() req: Express.Request) {
    return this.authService.logout(req['user']);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async profile(@Request() req: Express.Request) {
    return req['user'];
  }

  @Post('refresh-token')
  @HttpCode(200)
  async refreshToken(@Body() data: any) {
    return this.authService.refreshToken(data);
  }
}
