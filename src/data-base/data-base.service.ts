import { Injectable } from '@nestjs/common';
import {
  Favorites,
  FavoritesResponse,
} from 'src/favorites/entities/favorite.entity';
import { DataSource, Repository } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class DataBaseService {
  private readonly artistsRepository: Repository<Artist>;
  private readonly albumRepository: Repository<Album>;
  private readonly tracksRepository: Repository<Track>;
  private readonly favoritesRepository: Repository<Favorites>;

  constructor(private readonly dataSource: DataSource) {
    this.artistsRepository = dataSource.getRepository(Artist);
    this.albumRepository = dataSource.getRepository(Album);
    this.tracksRepository = dataSource.getRepository(Track);
    this.favoritesRepository = dataSource.getRepository(Favorites);
  }

  async removeArtist(id: string): Promise<void> {
    await this.removeEntityFromFavorites(id, 'artists');
  }

  async removeAlbum(id: string): Promise<void> {
    await this.removeEntityFromFavorites(id, 'albums');
  }

  async removeTrack(id: string): Promise<void> {
    await this.removeEntityFromFavorites(id, 'tracks');
  }

  isArtistExists(id: string): Promise<boolean> {
    return this.artistsRepository.exists({ where: { id } });
  }

  isAlbumExists(id: string): Promise<boolean> {
    return this.albumRepository.exists({ where: { id } });
  }

  isTrackExists(id: string): Promise<boolean> {
    return this.tracksRepository.exists({ where: { id } });
  }

  async getFavorites(): Promise<FavoritesResponse> {
    const favoriteIds =
      (await this.favoritesRepository.find())[0] || new Favorites();

    return {
      artists: await Promise.all(
        favoriteIds.artists?.map((id) =>
          this.artistsRepository.findOneBy({ id }),
        ) ?? [],
      ),
      albums: await Promise.all(
        favoriteIds.albums?.map((id) =>
          this.albumRepository.findOneBy({ id }),
        ) ?? [],
      ),
      tracks: await Promise.all(
        favoriteIds.tracks?.map((id) =>
          this.tracksRepository.findOneBy({ id }),
        ) ?? [],
      ),
    };
  }

  private async removeEntityFromFavorites(
    id: string,
    entity: 'tracks' | 'albums' | 'artists',
  ) {
    const favorites = (await this.favoritesRepository.find())[0];
    favorites[entity] = favorites[entity].filter((entityId) => entityId !== id);
    return this.favoritesRepository.save(favorites);
  }
}
