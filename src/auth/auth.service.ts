import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

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
    if (!user || !(await compare(password, user.password))) {
      throw new ForbiddenException('Wrong credentials');
    }

    const payload = { userId: user.id, login };
    return this.getTokens(payload);
  }

  async refreshToken({ refreshToken }: RefreshTokenDto) {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_SECRET_KEY,
      });

      return this.getTokens(payload);
    } catch {
      throw new ForbiddenException('Invalid refresh token');
    }
  }

  private async getTokens({ userId, login }: Record<string, unknown>) {
    return {
      accessToken: await this.jwtService.signAsync({ userId, login }),
      refreshToken: await this.jwtService.signAsync(
        { userId, login },
        {
          expiresIn: '7d',
        },
      ),
    };
  }
}
