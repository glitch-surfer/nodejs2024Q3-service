import { HttpException, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/data-base/data-base.service';
import { FavoritesDb } from 'src/data-base/db/favorites.db';
import { FavoritesResponse } from './entities/favorite.entity';
import { StatusCodes } from 'http-status-codes';

@Injectable()
export class FavoritesService {
  private readonly favoritesDb: FavoritesDb;

  constructor(private readonly dataBaseService: DataBaseService) {
    this.favoritesDb = this.dataBaseService.favoritesDb;
  }

  findAll(): FavoritesResponse {
    return this.dataBaseService.getFavorites();
  }

  addFavoriteTrack(id: string) {
    if (!this.dataBaseService.isTrackExists(id)) {
      throw new HttpException(
        'Track not found',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesDb.addFavoriteTrack(id);
  }

  removeFavoriteTrack(id: string) {
    const result = this.favoritesDb.removeFavoriteTrack(id);
    if (!result) {
      throw new HttpException('Track is not favorite', StatusCodes.NOT_FOUND);
    }
    return result;
  }

  addFavoriteAlbum(id: string) {
    if (!this.dataBaseService.isAlbumExists(id)) {
      throw new HttpException(
        'Album not found',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesDb.addFavoriteAlbum(id);
  }

  removeFavoriteAlbum(id: string) {
    const result = this.favoritesDb.removeFavoriteAlbum(id);
    if (!result) {
      throw new HttpException('Album is not favorite', StatusCodes.NOT_FOUND);
    }
    return result;
  }

  addFavoriteArtist(id: string) {
    if (!this.dataBaseService.isArtistExists(id)) {
      throw new HttpException(
        'Artist not found',
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }
    this.favoritesDb.addFavoriteArtist(id);
  }

  removeFavoriteArtist(id: string) {
    const result = this.favoritesDb.removeFavoriteArtist(id);
    if (!result) {
      throw new HttpException('Artist is not favorite', StatusCodes.NOT_FOUND);
    }
    return result;
  }
}
