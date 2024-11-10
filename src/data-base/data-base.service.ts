import { Injectable } from '@nestjs/common';
import { AlbumsDb } from './db/albums.db';
import { ArtistsDb } from './db/artists.db';
import { TracksDb } from './db/tracks.db';
import { FavoritesDb } from './db/favorites.db';
import { FavoritesResponse } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class DataBaseService {
  constructor(
    public readonly artistsDb: ArtistsDb,
    public readonly albumsDb: AlbumsDb,
    public readonly tracksDb: TracksDb,
    public readonly favoritesDb: FavoritesDb,
  ) {}

  removeArtist(id: string): void {
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

  isArtistExists(artistId: string): boolean {
    return Boolean(this.artistsDb.findOne(artistId));
  }

  isAlbumExists(albumId: string): boolean {
    return Boolean(this.albumsDb.findOne(albumId));
  }

  isTrackExists(trackId: string): boolean {
    return Boolean(this.tracksDb.findOne(trackId));
  }

  getFavorites(): FavoritesResponse {
    const favoriteIds = this.favoritesDb.getFavoritesIds();
    return {
      artists: favoriteIds.artists.map((id) => this.artistsDb.findOne(id)),
      albums: favoriteIds.albums.map((id) => this.albumsDb.findOne(id)),
      tracks: favoriteIds.tracks.map((id) => this.tracksDb.findOne(id)),
    };
  }
}
