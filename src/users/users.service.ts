import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const user = new User();
    user.login = login;
    user.password = password;

    return this.getUserResponse(await this.usersRepository.save(user));
  }

  async findAll() {
    return (await this.usersRepository.find()).map(this.getUserResponse);
  }

  async findOne(id: string) {
    return this.getUserResponse(await this.usersRepository.findOneBy({ id }));
  }

  async findOneByLogin(login: string) {
    return this.usersRepository.findOneBy({ login });
  }

  async updatePassword(id: string, UpdatePasswordDto: UpdatePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    if (user.password !== UpdatePasswordDto.oldPassword) return '';

    return this.getUserResponse(
      await this.usersRepository.save({
        ...user,
        password: UpdatePasswordDto.newPassword,
      }),
    );
  }

  async remove(id: string): Promise<boolean> {
    if (!(await this.usersRepository.exists({ where: { id } }))) return false;

    return this.usersRepository.delete({ id }).then(() => true);
  }

  private getUserResponse(user?: User) {
    if (!user) return null;
    const { password, ...userWithoutPass } = user;
    return {
      ...userWithoutPass,
      createdAt: +user.createdAt,
      updatedAt: +user.updatedAt,
    };
  }
}
