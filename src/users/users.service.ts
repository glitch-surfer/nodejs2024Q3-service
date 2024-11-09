import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

type UserResponse = Omit<User, 'password'>;

@Injectable()
export class UsersService {
  private readonly users: Record<string, User> = {};

  create(createUserDto: CreateUserDto): UserResponse {
    const user = new User(createUserDto.login, createUserDto.password);
    this.users[user.id] = user;
    return this.removePassword(user);
  }

  findAll(): UserResponse[] {
    return Object.values(this.users).map(this.removePassword);
  }

  findOne(id: string): UserResponse {
    return this.removePassword(this.users[id]);
  }

  updatePassword(
    id: string,
    UpdatePasswordDto: UpdatePasswordDto,
  ): string | null | UserResponse {
    const user = this.users[id];
    if (!user) return null;
    if (user.password !== UpdatePasswordDto.oldPassword) return '';

    const updatedUser = User.updatePassword(
      user,
      UpdatePasswordDto.newPassword,
    );

    this.users[id] = updatedUser;
    return this.removePassword(updatedUser);
  }

  remove(id: string): boolean {
    const isUserExist = Boolean(this.users[id]);
    if (!isUserExist) return false;

    delete this.users[id];
    return true;
  }

  private removePassword(user?: User): UserResponse | null {
    if (!user) return null;
    const { password, ...userWithoutPass } = user;
    return userWithoutPass;
  }
}
