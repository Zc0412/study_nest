import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAuthDto {
  @IsEmail()
  username: string;
  @IsNotEmpty()
  password: string;
}
