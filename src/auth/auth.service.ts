import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async create(createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return 'User successfully created';
  }
}
