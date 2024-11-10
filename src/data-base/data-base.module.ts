import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { ArtistsDb } from './db/artists.db';
import { AlbumsDb } from './db/albums.db';
import { TracksDb } from './db/tracks.db';

@Module({
  providers: [ArtistsDb, AlbumsDb, TracksDb, DataBaseService],
  exports: [ArtistsDb, AlbumsDb, TracksDb, DataBaseService],
})
export class DataBaseModule {}
