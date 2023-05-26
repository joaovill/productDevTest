import { User } from '../entities/user.entity';
import {
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @IsString()
  @MinLength(8)
  @MaxLength(12)
  @Matches(/^[a-z0-9_\.]+$/, {
    message: 'username length 8 between 12',
  })
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is too weak',
  })
  password: string;

  @IsString()
  name: string;
}