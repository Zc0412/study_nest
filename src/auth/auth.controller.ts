import {
  Controller,
  Get,
  Post,
  Body,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { SkipAuth } from '../decorator/auth.decorator';
import { Roles } from '../decorator/roles.decorator';
import { Role } from '../enums/role.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipAuth()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() createAuth: CreateAuthDto) {
    console.log(createAuth);
    return this.authService.signJWT(createAuth);
  }

  @Get('profile')
  @Roles(Role.Admin)
  getProfile(@Request() req) {
    // console.log(req);
    return req.user;
  }
}
