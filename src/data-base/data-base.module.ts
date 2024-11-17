import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { ArtistsDb } from './db/artists.db';
import { AlbumsDb } from './db/albums.db';
import { TracksDb } from './db/tracks.db';
import { FavoritesDb } from './db/favorites.db';

@Module({
  providers: [ArtistsDb, AlbumsDb, TracksDb, FavoritesDb, DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
