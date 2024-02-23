import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateSelectDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;
}
