import { IsNotEmpty, IsString } from 'class-validator';

interface IUpdatePasswordDto {
  oldPassword: string; // previous password
  newPassword: string; // new password
}

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
