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
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { StatusCodes } from 'http-status-codes';
import { ValidateUuidPipe } from 'src/pipes/validate-uuid';

@Controller('user')
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
  async findOne(@Param('id', ValidateUuidPipe) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) throw new NotFoundException('Not Found');
    return user;
  }

  @Put(':id')
  async updatePassword(
    @Param('id', ValidateUuidPipe) id: string,
    @Body(new ValidationPipe()) UpdatePasswordDto: UpdatePasswordDto,
  ) {
    const updatedPassword = await this.usersService.updatePassword(
      id,
      UpdatePasswordDto,
    );

    if (updatedPassword === null) {
      throw new NotFoundException('Not Found');
    }
    if (updatedPassword === '') {
      throw new ForbiddenException('Wrong old password');
    }

    return updatedPassword;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ValidateUuidPipe) id: string) {
    if (!(await this.usersService.remove(id))) {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
  }
}
