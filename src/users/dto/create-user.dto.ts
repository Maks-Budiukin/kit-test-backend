import {    
    IsNotEmpty,    
    IsString,
    IsEmail,
    MinLength,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UserCreateDto {
    @ApiProperty({
      example: 'Bob Marley',
      description: "User's name",
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
      example: 'bobmarley@gmail.com',
      description: "User's email",
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;
  
    @ApiProperty({
      example: 'Password1',
      description: "User's password",
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6, { message: 'Min password length is 6 symbols' })
    password: string;
  }
  