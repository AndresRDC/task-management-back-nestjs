import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
export class TaskDto {
  @ApiProperty({ description: 'Id de la tarea' })
  id: number;
  @ApiProperty({ description: 'Titulo de la tarea' })
  title: string;
  @ApiProperty({ description: 'Descripcion de la tarea' })
  description: string;
  @ApiProperty({
    enum: [TaskStatus.OPEN, TaskStatus.DONE],
    description: 'Estado de la tarea',
  })
  status: TaskStatus;
  @ApiProperty({ description: 'Id de usuario de la tarea' })
  userId: number;
}
