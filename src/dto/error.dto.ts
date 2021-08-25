import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class ErrorDto {
  @ApiProperty({ description: 'Codigo de estado' })
  statusCode: number;
  @ApiProperty({ description: 'Detalle de error' })
  message: string;
  @ApiPropertyOptional({ description: 'Descripcion de estado' })
  error: string;
}
