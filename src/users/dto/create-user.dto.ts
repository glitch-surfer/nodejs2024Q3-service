import { IsNotEmpty, IsString } from 'class-validator';

interface ICreateUserDto {
  login: string;
  password: string;
}

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  login: string;
}
