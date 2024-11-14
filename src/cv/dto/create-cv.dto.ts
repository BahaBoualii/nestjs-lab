import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class CreateCvDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsNumber()
  cin: number;

  @IsString()
  job: string;

  @IsString()
  path: string;

  @IsArray()
  @IsOptional()
  skills?: string[];
}
