import { Injectable } from '@nestjs/common';
import { AlbumsDb } from './db/albums.db';
import { TracksDb } from './db/tracks.db';
import { FavoritesDb } from './db/favorites.db';
import { FavoritesResponse } from 'src/favorites/entities/favorite.entity';
import { DataSource, Repository } from 'typeorm';
import { Artist } from '../artists/entities/artist.entity';

@Injectable()
export class DataBaseService {
  private readonly artistsRepository: Repository<Artist>;

  constructor(
    public readonly albumsDb: AlbumsDb,
    public readonly tracksDb: TracksDb,
    public readonly favoritesDb: FavoritesDb,
    private readonly dataSource: DataSource,
  ) {
    this.artistsRepository = dataSource.getRepository(Artist);
  }

  async removeArtist(id: string): Promise<void> {
    this.albumsDb.removeArtist(id);
    this.tracksDb.removeArtist(id);
    this.favoritesDb.removeFavoriteArtist(id);
  }

  removeAlbum(id: string): void {
    this.tracksDb.removeAlbum(id);
    this.favoritesDb.removeFavoriteAlbum(id);
  }

  removeTrack(id: string): void {
    this.favoritesDb.removeFavoriteTrack(id);
  }

  async isArtistExists(id: string): Promise<boolean> {
    return await this.artistsRepository.exists({ where: { id } });
  }

  isAlbumExists(albumId: string): boolean {
    return Boolean(this.albumsDb.findOne(albumId));
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
      albums: favoriteIds.albums.map((id) => this.albumsDb.findOne(id)),
      tracks: favoriteIds.tracks.map((id) => this.tracksDb.findOne(id)),
    };
  }
}
