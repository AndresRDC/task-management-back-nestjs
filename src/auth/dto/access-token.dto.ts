import { ApiProperty } from '@nestjs/swagger';

export class AccessTokenDto {
  @ApiProperty({ description: 'Token de acceso' })
  accessToken: string;
}
