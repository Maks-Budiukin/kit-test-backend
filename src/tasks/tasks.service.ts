import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task, TaskDocument } from './tasks.model';
import { TaskCreateDto } from './dto/create-task.dto';
import { TaskResponseDto } from './dto/task.response.dto';
import { TaskUpdateDto } from './dto/update-task.dto';
import { TaskStatus } from './dto/task-status';



@Injectable()
export class TasksService {
    constructor(@InjectModel(Task.name) private readonly taskModel: Model<TaskDocument>,
    ) {}

    async createTask(dto: TaskCreateDto): Promise<TaskResponseDto> {
               
        if(!dto.status) {
            dto.status = TaskStatus.TODO
        }
        const newTask =  await this.taskModel.create({...dto})
        return newTask
    }

    async getTasks(id: string): Promise<TaskResponseDto[]> {
        const tasks = await this.taskModel.find({project: id}).select('-updatedAt -createdAt');
        return tasks
    }

    async updateTask(id: string, dto: TaskUpdateDto): Promise<TaskResponseDto> {
        const taskToUpdate = await this.taskModel.findById(id)

        if (Object.keys(dto).length === 0) {
            throw new BadRequestException('At least one field required!');
        }

        if(!taskToUpdate) {
            throw new NotFoundException('No such task!')
        }

  
        const updatedTask = await this.taskModel.findByIdAndUpdate(id, dto, {new: true}).select('-updatedAt -createdAt');
        return updatedTask
    }

    async deleteTask(id: string): Promise<TaskResponseDto> {
        const taskToDelete = await this.taskModel.findById(id)
        
        if(!taskToDelete) {
            throw new NotFoundException('No such task!')
        }

        const deletedProject = await this.taskModel.findByIdAndDelete(id).select('-updatedAt -createdAt');
        return deletedProject
    }
}

