import { IsString, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({
    description:
      'El nombre de usuario debe comenzar con una letra, puede contener letras y números, y punto, guion medio, guion bajo en medio, en el nombre de usuario. Largo de 4 a 20.',
  })
  @IsString()
  @Matches(/(?=^.{4,20}$)^[a-zA-Z]+[a-zA-Z\-\_0-9.]+[a-zA-Z0-9]+$/, {
    message:
      'El nombre de usuario debe comenzar con una letra, puede contener letras y números, y punto, guion medio, guion bajo en medio, en el nombre de usuario. Largo de 4 a 20.',
  })
  username: string;

  @ApiProperty({
    description:
      'El password debe contener al menos una mayúscula, una minúscula y un número, sin espacios. Largo entre 6 y 200 caracteres',
  })
  @Matches(/^(?!.*\s)(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{6,200}$/, {
    message:
      'El password debe contener al menos una mayúscula, una minúscula y un número, sin espacios. Largo entre 6 y 200 caracteres',
  })
  password: string;
}
