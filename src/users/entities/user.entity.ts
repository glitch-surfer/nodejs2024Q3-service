import * as uuid from 'uuid';

interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}

export class User implements IUser {
  id = uuid.v4();
  version = 1;
  createdAt = Date.now();
  updatedAt = Date.now();

  constructor(public login: string, public password: string) {}

  static updatePassword(oldUser: User, newPassword: string): User {
    return {
      ...oldUser,
      version: oldUser.version++,
      updatedAt: Date.now(),
      password: newPassword,
    };
  }
}
