import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hash, genSalt, compare } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create({ login, password }: CreateUserDto) {
    const hashedPassword = await this.getHashedPassword(password);
    const user = new User();
    user.login = login;
    user.password = hashedPassword;

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
    if (!(await compare(UpdatePasswordDto.oldPassword, user.password))) {
      return '';
    }

    return this.getUserResponse(
      await this.usersRepository.save({
        ...user,
        password: await this.getHashedPassword(UpdatePasswordDto.newPassword),
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

  private async getHashedPassword(password: string) {
    const salt = await genSalt(+process.env.CRYPT_SALT);
    return await hash(password, salt);
  }
}
