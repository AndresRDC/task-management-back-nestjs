import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { AccessTokenDto } from './dto/access-token.dto';

@Injectable()
export class AuthService {
  private logger = new Logger();
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AccessTokenDto> {
    const username = await this.validateUserPassword(authCredentialsDto);
    if (!username) {
      throw new UnauthorizedException('Verifique los datos ingresados');
    }
    const payload: JwtPayload = { username };
    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.usersService.getUserByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      return username;
    }
    return null;
  }
}
