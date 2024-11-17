import { Injectable } from '@nestjs/common';
import { TracksDb } from './db/tracks.db';
import { FavoritesDb } from './db/favorites.db';
import { FavoritesResponse } from 'src/favorites/entities/favorite.entity';
import { DataSource, Repository } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';

@Injectable()
export class DataBaseService {
  private readonly artistsRepository: Repository<Artist>;
  private readonly albumRepository: Repository<Album>;

  constructor(
    public readonly tracksDb: TracksDb,
    public readonly favoritesDb: FavoritesDb,
    private readonly dataSource: DataSource,
  ) {
    this.artistsRepository = dataSource.getRepository(Artist);
    this.albumRepository = dataSource.getRepository(Album);
  }

  async removeArtist(id: string): Promise<void> {
    this.tracksDb.removeArtist(id);
    this.favoritesDb.removeFavoriteArtist(id);
  }

  async removeAlbum(id: string): Promise<void> {
    this.tracksDb.removeAlbum(id);
    this.favoritesDb.removeFavoriteAlbum(id);
  }

  removeTrack(id: string): void {
    this.favoritesDb.removeFavoriteTrack(id);
  }

  isArtistExists(id: string): Promise<boolean> {
    return this.artistsRepository.exists({ where: { id } });
  }

  isAlbumExists(id: string): Promise<boolean> {
    return this.albumRepository.exists({ where: { id } });
  }

  isTrackExists(trackId: string): boolean {
    return Boolean(this.tracksDb.findOne(trackId));
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
      tracks: favoriteIds.tracks.map((id) => this.tracksDb.findOne(id)),
    };
  }
}
