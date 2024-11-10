import { Injectable } from '@nestjs/common';
import { AlbumsDb } from './db/albums.db';
import { ArtistsDb } from './db/artists.db';
import { TracksDb } from './db/tracks.db';

@Injectable()
export class DataBaseService {
  constructor(
    public readonly artistsDb: ArtistsDb,
    public readonly albumsDb: AlbumsDb,
    public readonly tracksDb: TracksDb,
  ) {}

  removeArtist(id: string): void {
    this.albumsDb.removeArtist(id);
    this.tracksDb.removeArtist(id);
  }

  removeAlbum(id: string): void {
    this.tracksDb.removeAlbum(id);
  }

  isArtistExists(artistId: string): boolean {
    return Boolean(this.artistsDb.findOne(artistId));
  }

  isAlbumExists(albumId: string): boolean {
    return Boolean(this.albumsDb.findOne(albumId));
  }
}
