import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  ValidationPipe,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isUUID } from 'class-validator';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }

    const user = this.usersService.findOne(id);
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Put(':id')
  updatePassword(
    @Param('id') id: string,
    @Body(new ValidationPipe()) UpdatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUUID(id)) {
      throw new HttpException('Id is not uuid', HttpStatus.BAD_REQUEST);
    }

    const updatedPassword = this.usersService.updatePassword(
      id,
      UpdatePasswordDto,
    );

    if (updatedPassword === null) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    if (updatedPassword === '') {
      throw new HttpException('Wrong old password', HttpStatus.FORBIDDEN);
    }

    return updatedPassword;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
