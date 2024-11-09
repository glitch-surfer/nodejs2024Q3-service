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
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isUUID } from 'class-validator';
import { StatusCodes } from 'http-status-codes';
import { ValidateUuidPipe } from 'src/pipes/validate-uuid';

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
  findOne(@Param('id', ValidateUuidPipe) id: string) {
    const user = this.usersService.findOne(id);
    if (!user) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    return user;
  }

  @Put(':id')
  updatePassword(
    @Param('id', ValidateUuidPipe) id: string,
    @Body(new ValidationPipe()) UpdatePasswordDto: UpdatePasswordDto,
  ) {
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
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', ValidateUuidPipe) id: string) {
    if (!this.usersService.remove(id)) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
