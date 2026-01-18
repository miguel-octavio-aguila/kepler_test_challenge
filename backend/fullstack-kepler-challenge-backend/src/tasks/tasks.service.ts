import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: number) {
    return this.prisma.task.create({
      data: {
        ...createTaskDto,
        userId,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.task.findMany({
      where: { userId },
    });
  }

  async findOne(id: number) {
    const taskFound = await this.prisma.task.findUnique({ where: { id: id } });
    if (!taskFound) {
      throw new NotFoundException('Task not found');
    }
    return taskFound;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    // First check if task exists
    const taskExists = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    // If exists, update it
    return this.prisma.task.update({
      where: { id },
      data: updateTaskDto,
    });
  }

  async remove(id: number) {
    // First check if task exists
    const taskExists = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!taskExists) {
      throw new NotFoundException('Task not found');
    }

    // If exists, delete it
    return this.prisma.task.delete({
      where: { id },
    });
  }

  async toggleComplete(id: number) {
    // First check if task exists
    const task = await this.prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    // Toggle the completed status
    return this.prisma.task.update({
      where: { id },
      data: { completed: !task.completed },
    });
  }
}
