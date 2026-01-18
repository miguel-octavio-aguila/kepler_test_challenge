import { CreateTaskDto } from './create-task.dto';

// export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
export type UpdateTaskDto = Partial<CreateTaskDto>;
