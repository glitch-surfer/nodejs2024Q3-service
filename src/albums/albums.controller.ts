import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ValidationPipe,
  NotFoundException,
  Put,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ValidateUuidPipe } from 'src/pipes/validate-uuid';
import { StatusCodes } from 'http-status-codes';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ValidateUuidPipe) id: string) {
    const album = await this.albumsService.findOne(id);
    if (!album) throw new NotFoundException('Not Found');
    return album;
  }

  @Put(':id')
  async update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body(new ValidationPipe()) updateAlbumDto: UpdateAlbumDto,
  ) {
    const album = await this.albumsService.update(id, updateAlbumDto);
    if (!album) throw new NotFoundException('Not Found');
    return album;
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  async remove(@Param('id', ValidateUuidPipe) id: string) {
    const isAlbumExist = await this.albumsService.remove(id);
    if (!isAlbumExist) throw new NotFoundException('Not Found');
  }
}
