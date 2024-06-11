import {    
    IsNotEmpty,    
    IsString,
    IsEmail,    
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';
  
  export class UserLoginDto {
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
    password: string;
  }
  