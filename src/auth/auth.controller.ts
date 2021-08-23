import {
  Body,
  Controller,
  Post,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ValidationError } from 'class-validator';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AccessTokenDto } from './dto/access-token.dto';
import { UserIdDto } from './dto/user-id.dto';
import { ErrorsDto } from '../dto/errors.dto';
import { ErrorDto } from '../dto/error.dto';
@ApiTags('auth')
@Controller({
  version: '1',
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}
  @Post('auth/signup')
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'El usuario fue creado.',
    type: UserIdDto,
  })
  @ApiBadRequestResponse({
    description: 'Parametros no son validos.',
    type: ErrorsDto,
  })
  @ApiConflictResponse({
    description: 'El nombre de usuario ya existe.',
    type: ErrorDto,
  })
  signUp(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserIdDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Post('auth/signin')
  @ApiBody({ type: AuthCredentialsDto })
  @ApiCreatedResponse({
    description: 'El usuario ingreso.',
    type: AccessTokenDto,
  })
  @ApiBadRequestResponse({
    description: 'Parametros no validos.',
    type: ErrorsDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Los datos ingresados no corresponde a un usuario.',
    type: ErrorDto,
  })
  signIn(
    @Body(
      new ValidationPipe({
        exceptionFactory: (errors: ValidationError[]) => {
          throw new UnauthorizedException('Verifique los datos ingresados');
        },
      }),
    )
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AccessTokenDto> {
    return this.authService.signIn(authCredentialsDto);
  }
}
