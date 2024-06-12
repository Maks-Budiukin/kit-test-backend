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
import { UserResponseDto } from 'src/users/dto/users.response.dto';
import { GetUser } from 'src/decorators/getuser.decorator';
import { ProjectsService } from './projects.service';
import { ProjectResponseDto } from './dto/project.response.dto';
import { ProjectCreateDto } from './dto/create-project.dto';
import { ProjectUpdateDto } from './dto/update-project.dto';

@ApiTags('Projects')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('')
  @ApiOperation({ summary: 'Get projects' })
  @ApiResponse({
    status: 200,
    description: "List of User's projects",
    type: [ProjectResponseDto],
    isArray: true,
  })
  async getAllProjects(
    @GetUser() user: UserResponseDto,
  ): Promise<ProjectResponseDto[]> {
    return await this.projectsService.getProjects(user);
  }

  @Post('')
  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({
    status: 201,
    description: 'Created project',
    type: ProjectResponseDto,
  })
  async createProject(
    @Body() dto: ProjectCreateDto,
    @GetUser() user: UserResponseDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.createProject(dto, user);
    }

  @Patch(':id')
  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({
    status: 200,
    description: "Updated project",
    type: ProjectResponseDto,
  })
  async updateProject(
    @Body() dto: ProjectUpdateDto,
    @Param('id') id: string,
    @GetUser() user: UserResponseDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.updateProject(user, id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({
    status: 200,
    description: "Deleted project",
    type: ProjectResponseDto,
  })
  async deleteProject(
    @Param('id') id: string,
    @GetUser() user: UserResponseDto,
  ): Promise<ProjectResponseDto> {
    return await this.projectsService.deleteProject(id, user);
  }
}
