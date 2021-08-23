import { IsOptional, IsIn, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../task-status.enum';
import { ApiPropertyOptional } from '@nestjs/swagger';
export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN])
  @ApiPropertyOptional({
    enum: [TaskStatus.OPEN, TaskStatus.DONE],
    description: 'Estado de la tarea',
  })
  status: TaskStatus;

  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({
    description: 'Texto que debe contener titulo o descripcion de tarea',
  })
  search: string;
}
