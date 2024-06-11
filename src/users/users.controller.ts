import {
    Body,
    Controller,
    HttpCode,
    Post,
    Get,
    UseGuards,
  } from '@nestjs/common';
  import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserCreateDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/users.response.dto';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GetUser } from 'src/decorators/getuser.decorator';
import { UserLoginDto } from './dto/login-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('register')
    @ApiOperation({ summary: 'Create user' })
    @ApiResponse({
      status: 201,
      description: 'User created',
      type: Object,
    })
    async register(@Body() dto: UserCreateDto): Promise<void> {
      return await this.usersService.createUser(dto);
    }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({
    status: 200,
    description: 'Logged-in user object',
    type: UserResponseDto,
  })
  async login(@Body() dto: UserLoginDto): Promise<UserResponseDto> {
    const user = await this.usersService.validateUser(dto);
    return await this.usersService.loginUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('logout')
  @HttpCode(204)
  @ApiOperation({ summary: 'Logout user' })
  @ApiResponse({
    status: 204,
    description: 'User logged out',
  })
  async logout(@GetUser() user: UserResponseDto): Promise<void> {
    return await this.usersService.logoutUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh user' })
  @ApiResponse({
    status: 200,
    description: 'Current user object',
    type: UserResponseDto,
  })
  @Get('current')
  async refresh(@GetUser() user: UserResponseDto): Promise<UserResponseDto> {
    return await this.usersService.refreshfUser(user);
  }
}
