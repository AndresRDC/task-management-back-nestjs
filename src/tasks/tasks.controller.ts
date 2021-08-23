import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Logger,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../users/user.entity';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskDto } from './dto/tasks.dto';
import { ErrorDto } from '../dto/error.dto';
import { ErrorsDto } from '../dto/errors.dto';
import { UnauthorizedErrorDto } from 'src/dto/unauthorized.error.dto';

@ApiTags('tasks')
@Controller({
  version: '1',
})
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private readonly tasksService: TasksService) {}

  @Get('tasks/:id')
  @ApiOkResponse({
    description: 'Retorna la tarea.',
    type: TaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Tipo de dato id no valido.',
    type: ErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Tarea con id no encontrado.',
    type: ErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token de acceso no valido',
    type: UnauthorizedErrorDto,
  })
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TaskDto> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post('tasks')
  @ApiBody({ type: CreateTaskDto })
  @ApiCreatedResponse({
    description: 'Retorna tarea creada',
    type: TaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Parametros no validos',
    type: ErrorsDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token de acceso no valido',
    type: UnauthorizedErrorDto,
  })
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('tasks/:id')
  @ApiOkResponse({
    description: 'La tarea fue eliminada.',
  })
  @ApiBadRequestResponse({
    description: 'Tipo de dato id no valido.',
    type: ErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Tarea con id no encontrado.',
    type: ErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token de acceso no valido',
    type: UnauthorizedErrorDto,
  })
  deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('tasks/:id/status')
  @ApiOkResponse({
    description: 'El estado de la tarea fue modificado.',
    type: TaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Tipo de dato id no valido.',
    type: ErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Tarea con id no encontrado.',
    type: ErrorDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token de acceso no valido',
    type: UnauthorizedErrorDto,
  })
  updateStatusTask(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateStatusTask(id, status, user);
  }

  @Get('tasks')
  @ApiOkResponse({
    description: 'Retorna las tareas.',
    type: [TaskDto],
  })
  @ApiBadRequestResponse({
    description: 'Parametros no validos',
    type: ErrorsDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Token de acceso no valido',
    type: UnauthorizedErrorDto,
  })
  getTasks(
    @Query(ValidationPipe) filterDto: GetTasksFilterDto,
    @GetUser() user: User,
  ): Promise<TaskDto[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all task. Filters ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.tasksService.getTasks(filterDto, user);
  }
}