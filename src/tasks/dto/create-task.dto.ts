import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'Titulo de la tarea' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'Descripcion de la tarea' })
  description: string;
}
