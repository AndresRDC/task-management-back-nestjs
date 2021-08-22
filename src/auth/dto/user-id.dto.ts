import { ApiProperty } from '@nestjs/swagger';

export class UserIdDto {
  @ApiProperty({ description: 'Id del usuario' })
  id: number;
}
