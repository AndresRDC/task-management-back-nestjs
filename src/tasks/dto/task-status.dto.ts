import { TaskStatus } from '../task-status.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsIn } from 'class-validator';
export class TaskStatusDto {
  @ApiProperty({
    enum: [TaskStatus.OPEN, TaskStatus.DONE],
    description: 'Estado de la tarea',
  })
  @IsIn(getAllowedStatus(), {
    message:
      'Debe ingresar un estado valido (' + getAllowedStatus().toString() + ')',
  })
  status: TaskStatus;
}

function getAllowedStatus(): string[] {
  const allowedStatus = [];
  for (const [propertyKey, propertyValue] of Object.entries(TaskStatus)) {
    if (!Number.isNaN(Number(propertyKey))) {
      continue;
    }
    allowedStatus.push(propertyValue);
  }
  return allowedStatus;
}
