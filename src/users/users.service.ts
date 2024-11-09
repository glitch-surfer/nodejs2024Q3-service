import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

type UserResponse = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users: User[] = [new User('login', 'password')];

  create(createUserDto: CreateUserDto): UserResponse {
    const user = new User(createUserDto.login, createUserDto.password);
    this.users.push(user);
    return this.removePassword(user);
  }

  findAll(): UserResponse[] {
    return this.users.map(this.removePassword);
  }

  findOne(id: string): UserResponse {
    return this.removePassword(this.users.find((user) => user.id === id));
  }

  update(id: number, UpdatePasswordDto: UpdatePasswordDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private removePassword(user?: User): UserResponse | null {
    if (!user) return null;
    const { password, ...userWithoutPass } = user;
    return userWithoutPass;
  }
}
