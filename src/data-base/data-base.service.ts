import { Injectable } from '@nestjs/common';
import { FavoritesDb } from './db/favorites.db';
import { FavoritesResponse } from 'src/favorites/entities/favorite.entity';
import { DataSource, Repository } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { Track } from '../track/entities/track.entity';

@Injectable()
export class DataBaseService {
  private readonly artistsRepository: Repository<Artist>;
  private readonly albumRepository: Repository<Album>;
  private readonly tracksRepository: Repository<Track>;

  constructor(
    public readonly favoritesDb: FavoritesDb,
    private readonly dataSource: DataSource,
  ) {
    this.artistsRepository = dataSource.getRepository(Artist);
    this.albumRepository = dataSource.getRepository(Album);
    this.tracksRepository = dataSource.getRepository(Track);
  }

  async removeArtist(id: string): Promise<void> {
    this.favoritesDb.removeFavoriteArtist(id);
  }

  async removeAlbum(id: string): Promise<void> {
    this.favoritesDb.removeFavoriteAlbum(id);
  }

  async removeTrack(id: string): Promise<void> {
    this.favoritesDb.removeFavoriteTrack(id);
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
    const favoriteIds = this.favoritesDb.getFavoritesIds();
    return {
      artists: await Promise.all(
        favoriteIds.artists.map((id) =>
          this.artistsRepository.findOneBy({ id }),
        ),
      ),
      albums: await Promise.all(
        favoriteIds.albums.map((id) => this.albumRepository.findOneBy({ id })),
      ),
      tracks: await Promise.all(
        favoriteIds.tracks.map((id) => this.tracksRepository.findOneBy({ id })),
      ),
    };
  }
}
