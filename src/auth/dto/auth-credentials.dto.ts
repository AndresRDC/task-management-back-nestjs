import { IsString, Matches } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @Matches(/(?=^.{4,20}$)^[a-zA-Z]+[a-zA-Z\-\_0-9.]+[a-zA-Z0-9]+$/)
  username: string;

  @Matches(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{6,200}$/)
  password: string;
}
