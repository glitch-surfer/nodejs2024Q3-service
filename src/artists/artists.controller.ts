import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  ValidationPipe,
  HttpCode,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ValidateUuidPipe } from 'src/pipes/validate-uuid';
import { StatusCodes } from 'http-status-codes';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body(new ValidationPipe()) createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ValidateUuidPipe) id: string) {
    const artist = this.artistsService.findOne(id);
    if (!artist) throw new NotFoundException('Not Found');
    return artist;
  }

  @Put(':id')
  update(
    @Param('id', ValidateUuidPipe) id: string,
    @Body(new ValidationPipe()) updateArtistDto: UpdateArtistDto,
  ) {
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(StatusCodes.NO_CONTENT)
  remove(@Param('id', ValidateUuidPipe) id: string) {
    const isArtistExist = this.artistsService.remove(id);
    if (!isArtistExist) throw new NotFoundException('Not Found');
  }
}
