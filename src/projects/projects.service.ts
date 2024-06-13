import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from './projects.model';
import { Model } from 'mongoose';
import { ProjectCreateDto } from './dto/create-project.dto';
import { ProjectUpdateDto } from './dto/update-project.dto';
import { UserResponseDto } from 'src/users/dto/users.response.dto';
import { ProjectResponseDto } from './dto/project.response.dto';


@Injectable()
export class ProjectsService {
    constructor(@InjectModel(Project.name) private readonly projectModel: Model<ProjectDocument>) {}

    async createProject(dto: ProjectCreateDto, user: UserResponseDto): Promise<ProjectResponseDto> {
        
        const newProject =  await this.projectModel.create({...dto, participants: [user._id]})
        return newProject
    }
    async getProjects(user: UserResponseDto): Promise<ProjectResponseDto[]> {
        const projects = await this.projectModel.find({participants: user._id})
        return projects
    }

    async getProjectById(id: string): Promise<ProjectResponseDto> {
        const project = await this.projectModel.findById(id).populate({
            path: 'participants',
            select: '-password -token -createdAt -updatedAt'
          })
        return project
    }

    async updateProject(id: string, dto: ProjectUpdateDto): Promise<ProjectResponseDto> {
        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('At least one field required!');
          }
          return await this.projectModel.findByIdAndUpdate(id, dto, {new: true}).select('-updatedAt -createdAt');
    }

    async deleteProject(id: string): Promise<ProjectResponseDto> {
        return await this.projectModel.findByIdAndDelete(id).select('-updatedAt -createdAt');
    }
}

