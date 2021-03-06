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
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TaskDto } from './dto/tasks.dto';
import { ErrorDto } from '../dto/error.dto';
import { ErrorsDto } from '../dto/errors.dto';
import { TaskStatusDto } from './dto/task-status.dto';

@ApiTags('tasks')
@ApiBearerAuth()
@Controller({
  version: '1',
})
@UseGuards(AuthGuard())
export class TasksController {
  private logger = new Logger('TasksController');
  constructor(private readonly tasksService: TasksService) {}

  @Get('tasks/:id')
  @ApiOperation({
    summary: 'Obtener tarea por id',
    description: 'Retorna la tarea con el id indicado',
  })
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
    type: ErrorDto,
  })
  getTaskById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<TaskDto> {
    return this.tasksService.getTaskById(id, user);
  }

  @Post('tasks')
  @ApiOperation({
    summary: 'Crear nueva tarea',
    description: 'Registra una nueva tarea y la retorna',
  })
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
    type: ErrorDto,
  })
  @UsePipes(ValidationPipe)
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('tasks/:id')
  @ApiOperation({
    summary: 'Eliminar tarea',
    description: 'Elimina la tarea con el id indicado',
  })
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
    type: ErrorDto,
  })
  deleteTaskById(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.tasksService.deleteTaskById(id, user);
  }

  @Patch('tasks/:id/status')
  @ApiOperation({
    summary: 'Modificar estado tarea',
    description:
      'Actualiza el estado pasado como parametro de la tarea del id indicado',
  })
  @ApiBody({ type: TaskStatusDto })
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
    type: ErrorDto,
  })
  updateStatusTask(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) taskStatusDto: TaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateStatusTask(id, taskStatusDto, user);
  }

  @Get('tasks')
  @ApiOperation({
    summary: 'Obtener tareas',
    description:
      'Retorna todas las tareas con la posibilidad de indicarles filtros por estado (status) o si el titulo o descripci??n contiene un texto sumistrado (search)',
  })
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
    type: ErrorDto,
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
