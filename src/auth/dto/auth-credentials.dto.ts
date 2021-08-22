import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthCredentialsDto {
  @ApiProperty({ description: 'El nombre de usuario login' })
  @IsString()
  @Matches(/(?=^.{4,20}$)^[a-zA-Z]+[a-zA-Z\-\_0-9.]+[a-zA-Z0-9]+$/)
  username: string;

  @ApiProperty({ description: 'El password login' })
  @Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,200}$/)
  password: string;
}
