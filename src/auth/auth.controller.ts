import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller({
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('auth/signup')
  signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<{ id: number }> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('auth/signin')
  signIn(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          throw new UnauthorizedException('Verifique los datos ingresados');
        },
      }),
    )
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }
}
