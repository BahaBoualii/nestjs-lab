import { IsOptional, IsString, MinLength, MaxLength, IsEnum } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';
import { TodoValidationMessages } from 'src/validation/todo.validation';


export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  @MinLength(3, { message: TodoValidationMessages.name.minLength })
  @MaxLength(10, { message: TodoValidationMessages.name.maxLength })
  name?: string;

  @IsOptional()
  @IsString()
  @MinLength(10, { message: TodoValidationMessages.description.minLength })
  description?: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: TodoValidationMessages.status.isEnum })
  status?: StatusEnum;
}
