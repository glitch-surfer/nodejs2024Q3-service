import { HttpException, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/data-base/data-base.service';
import { Favorites, FavoritesResponse } from './entities/favorite.entity';
import { StatusCodes } from 'http-status-codes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

type LibEntity = 'tracks' | 'artists' | 'albums';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(Favorites)
    private readonly favoritesRepository: Repository<Favorites>,
    private readonly dataBaseService: DataBaseService,
  ) {}

  findAll(): Promise<FavoritesResponse> {
    return this.dataBaseService.getFavorites();
  }

  async addFavoriteTrack(id: string) {
    return this.addFavoriteEntity(id, 'tracks');
  }

  async removeFavoriteTrack(id: string) {
    return this.removeFavoriteEntity(id, 'tracks');
  }

  async addFavoriteAlbum(id: string) {
    return this.addFavoriteEntity(id, 'albums');
  }

  removeFavoriteAlbum(id: string) {
    return this.removeFavoriteEntity(id, 'albums');
  }

  async addFavoriteArtist(id: string) {
    return this.addFavoriteEntity(id, 'artists');
  }

  removeFavoriteArtist(id: string) {
    return this.removeFavoriteEntity(id, 'artists');
  }

  private async removeFavoriteEntity(
    id: string,
    entity: LibEntity,
  ): Promise<string> {
    const favorites = await this.getFavoritesIds();
    const isFavorite = favorites[entity].includes(id);
    if (!isFavorite) {
      const entityName = this.getEntityName(entity);
      throw new HttpException(
        `${entityName} is not favorite`,
        StatusCodes.NOT_FOUND,
      );
    }
    favorites[entity] = favorites[entity].filter((entityId) => entityId !== id);
    return this.favoritesRepository
      .save(favorites)
      .then(() => `${entity} removed from favorites`);
  }

  private async addFavoriteEntity(id: string, entity: LibEntity) {
    const entityName = this.getEntityName(entity);
    const method = `is${entityName.slice(0, -1)}Exists`;

    if (!(await this.dataBaseService[method](id))) {
      throw new HttpException(
        `${entityName} not found`,
        StatusCodes.UNPROCESSABLE_ENTITY,
      );
    }

    const favorites = await this.getFavoritesIds();
    favorites[entity] = [...(favorites[entity] ?? []), id];
    return this.favoritesRepository
      .save(favorites)
      .then(() => `${entityName} added to favorites`);
  }

  private getEntityName(entity: LibEntity) {
    return entity.charAt(0).toUpperCase() + entity.slice(1);
  }

  private async getFavoritesIds(): Promise<Favorites> {
    return (await this.favoritesRepository.find())[0] ?? new Favorites();
  }
}
