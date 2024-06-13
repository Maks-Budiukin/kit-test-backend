import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';
import { UserCreateDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';
import { UserResponseDto } from './dto/users.response.dto';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async findUser(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });
    return user;
  }

  async validateUser(dto: UserLoginDto): Promise<User> {
    const user = await this.findUser(dto.email);

    if (!user) {
      throw new UnauthorizedException('Email or password is wrong!');
    }

    const validPassword = await bcrypt.compare(dto.password, user.password);
    if (!validPassword) {
      throw new UnauthorizedException('Email or password is wrong!');
    }
    return user;
  }

  async createUser(dto: UserCreateDto): Promise<void> {
    const user = await this.findUser(dto.email);

    if (user) {
      throw new ConflictException('User with this email already exists!');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(dto.password, salt);

    const newUser = await this.userModel.create({
      ...dto,
      password: passwordHash,
    });

    if (!newUser) {
      throw new InternalServerErrorException(
        'Something went wrong. Please, try again!',
      );
    }
    return;
  }

  async loginUser(user: User): Promise<UserResponseDto> {
    const token = await this.jwtService.signAsync(user._id.toString());
    const loggedUser = await this.userModel
      .findByIdAndUpdate(user._id, { token }, { new: true })
      .select('-password -updatedAt -createdAt');

    return loggedUser;
  }

  async logoutUser(user: UserResponseDto): Promise<void> {
    const loggedOutUser = await this.userModel.findByIdAndUpdate(user._id, {
      token: null,
    });
    if (!loggedOutUser) {
      throw new InternalServerErrorException(
        'Something went wrong. Please, try again!',
      );
    }
    return;
  }

  async refreshfUser(user: UserResponseDto): Promise<UserResponseDto> {
    const foundUser = await this.userModel
      .findById(user._id)
      .select('-password -updatedAt -createdAt -token');

    return foundUser;
  }
}
