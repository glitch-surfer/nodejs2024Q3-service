import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

type UserResponse = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create({ login, password }: CreateUserDto): Promise<UserResponse> {
    const user = new User();
    user.login = login;
    user.password = password;

    return this.removePassword(await this.usersRepository.save(user));
  }

  async findAll(): Promise<UserResponse[]> {
    return (await this.usersRepository.find()).map(this.removePassword);
  }

  async findOne(id: string): Promise<UserResponse> {
    return this.removePassword(await this.usersRepository.findOneBy({ id }));
  }

  async updatePassword(
    id: string,
    UpdatePasswordDto: UpdatePasswordDto,
  ): Promise<string | null | UserResponse> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) return null;
    if (user.password !== UpdatePasswordDto.oldPassword) return '';

    return this.removePassword(
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

  private removePassword(user?: User): UserResponse | null {
    if (!user) return null;
    const { password, ...userWithoutPass } = user;
    return userWithoutPass;
  }
}
