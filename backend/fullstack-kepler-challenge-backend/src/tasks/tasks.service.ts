import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  create(createTaskDto: CreateTaskDto, userId: number) {
    // Convert dueDate string to DateTime if provided
    const data: any = {
      ...createTaskDto,
      userId,
    };

    // If dueDate is provided
    if (createTaskDto.dueDate) {
      // Cast to unknown to check type safely, as DTO says Date but runtime might be string
      const dueDate = createTaskDto.dueDate as unknown;

      if (typeof dueDate === 'string') {
        // Parse the date string (YYYY-MM-DD) and set to midnight UTC
        const [year, month, day] = dueDate.split('-').map(Number);
        data.dueDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
      }
      // If it's already a Date, it stays as is in 'data' (spread from createTaskDto)
    }

    return this.prisma.task.create({
      data,
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

    // If exists, checks for date handling like in create()
    const data: any = { ...updateTaskDto };

    if (updateTaskDto.dueDate) {
      const dueDate = updateTaskDto.dueDate as unknown;
      if (typeof dueDate === 'string') {
        const [year, month, day] = dueDate.split('-').map(Number);
        data.dueDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0));
      }
    }

    // If exists, update it
    return this.prisma.task.update({
      where: { id },
      data,
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
