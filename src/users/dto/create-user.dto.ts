import { IsString, IsEmail, IsBoolean, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean = true;
}