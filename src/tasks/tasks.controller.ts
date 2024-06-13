import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { JwtAuthGuard } from 'src/users/guards/jwt.guard';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { TaskResponseDto } from './dto/task.response.dto';
import { TaskUpdateDto } from './dto/update-task.dto';
import { TaskCreateDto } from './dto/create-task.dto';

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService,) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get tasks by Project ID' })
  @ApiResponse({
    status: 200,
    description: "List of tasks",
    type: [TaskResponseDto],
    isArray: true,
  })
  async getAllTasks(@Param('id') id: string): Promise<TaskResponseDto[]> {
    return await this.tasksService.getTasks(id);
  }

  @Post('')
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'Created task',
    type: TaskResponseDto,
  })
  async createTask(
    @Body() dto: TaskCreateDto,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.createTask(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  @ApiResponse({
    status: 200,
    description: "Updated task",
    type: TaskResponseDto,
  })
  async updateTask(
    @Body() dto: TaskUpdateDto,
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  @ApiResponse({
    status: 200,
    description: "Deleted task",
    type: TaskResponseDto,
  })
  async deleteTask(
    @Param('id') id: string,
  ): Promise<TaskResponseDto> {
    return await this.tasksService.deleteTask(id);
  }
}
