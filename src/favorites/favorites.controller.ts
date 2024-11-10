import { Controller, Get, Post, Param, Delete, HttpCode } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ValidateUuidPipe } from 'src/pipes/validate-uuid';
import { StatusCodes } from 'http-status-codes';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  createFavoriteTrack(@Param('id', ValidateUuidPipe) id: string) {
    return this.favoritesService.addFavoriteTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFavoriteTrack(@Param('id', ValidateUuidPipe) id: string) {
    return this.favoritesService.removeFavoriteTrack(id);
  }

  @Post('album/:id')
  createFavoriteAlbum(@Param('id', ValidateUuidPipe) id: string) {
    return this.favoritesService.addFavoriteAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFavoriteAlbum(@Param('id', ValidateUuidPipe) id: string) {
    return this.favoritesService.removeFavoriteAlbum(id);
  }

  @Post('artist/:id')
  createFavoriteArtist(@Param('id', ValidateUuidPipe) id: string) {
    return this.favoritesService.addFavoriteArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(StatusCodes.NO_CONTENT)
  removeFavoriteArtist(@Param('id', ValidateUuidPipe) id: string) {
    return this.favoritesService.removeFavoriteArtist(id);
  }
}
