import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signJWT(createAuth: CreateAuthDto) {
    return {
      accessToken: await this.jwtService.signAsync(createAuth),
    };
  }
}
