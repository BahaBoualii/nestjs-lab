import { PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create.dto';

export class UpdateTodoDto extends PartialType(CreateTodoDto){}
