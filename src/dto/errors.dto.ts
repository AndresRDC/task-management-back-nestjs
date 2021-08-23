import { ApiProperty } from '@nestjs/swagger';
export class ErrorsDto {
  @ApiProperty({ description: 'Codigo de estado' })
  statusCode: number;
  @ApiProperty({ description: 'Arreglo de detalles de error' })
  message: Array<string>;
  @ApiProperty({ description: 'Descripcion de estado' })
  error: string;
}
