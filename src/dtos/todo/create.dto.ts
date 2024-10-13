import { IsNotEmpty, IsString, MinLength, MaxLength } from 'class-validator';
import { StatusEnum } from 'src/enums/status.enum';
import { TodoValidationMessages } from 'src/validation/todo.validation';

export class CreateTodoDto {
  @IsNotEmpty({ message: TodoValidationMessages.name.isNotEmpty })
  @IsString()
  @MinLength(3, { message: TodoValidationMessages.name.minLength })
  @MaxLength(10, { message: TodoValidationMessages.name.maxLength })
  name: string;

  @IsNotEmpty({ message: TodoValidationMessages.description.isNotEmpty })
  @IsString()
  @MinLength(10, { message: TodoValidationMessages.description.minLength })
  description: string;

  @IsNotEmpty({ message: TodoValidationMessages.status.isEnum })
  status: StatusEnum; 
}
