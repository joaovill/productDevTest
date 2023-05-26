import { Project } from '../entities/project.entity';
import {
  IsNumber,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateProjectDto extends Project {
  @IsString()
  @MaxLength(30)
  title: string;
  
  @IsNumber()
  zip_code: number;
  
  @IsNumber()
  cost: number;

  @IsString()
  deadline: string;
}