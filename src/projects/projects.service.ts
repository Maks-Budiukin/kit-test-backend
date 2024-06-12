import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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

    async updateProject(user: UserResponseDto, id: string, dto: ProjectUpdateDto): Promise<ProjectResponseDto> {
        const projectToUpdate = await this.projectModel.findById(id)

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('At least one field required!');
          }

        if(!projectToUpdate || !projectToUpdate.participants.includes(user._id)) {
            throw new NotFoundException('No such project!')
        }

        const updatedProject = await this.projectModel.findByIdAndUpdate(id, dto, {new: true}).select('-updatedAt -createdAt');
        return updatedProject
    }

    async deleteProject(id: string, user: UserResponseDto): Promise<ProjectResponseDto> {
        const projectToDelete = await this.projectModel.findById(id)
        
        if(!projectToDelete || !projectToDelete.participants.includes(user._id)) {
            throw new NotFoundException('No such project!')
        }

        const deletedProject = await this.projectModel.findByIdAndDelete(id).select('-updatedAt -createdAt');
        return deletedProject
    }
}

