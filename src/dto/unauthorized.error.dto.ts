import { ApiProperty } from '@nestjs/swagger';
export class UnauthorizedErrorDto {
  @ApiProperty({ description: 'Codigo de estado' })
  statusCode: number;
  @ApiProperty({ description: 'Detalle de error' })
  message: string;
}
