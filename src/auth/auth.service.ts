import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return user;
  }

  async login({ login, password }: CreateUserDto) {
    const user = await this.usersService.findOneByLogin(login);
    if (!user || user.password !== password) {
      throw new ForbiddenException('Wrong credentials');
    }

    const payload = { userId: user.id, login };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
