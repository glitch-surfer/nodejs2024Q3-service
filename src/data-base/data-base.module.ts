import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { AlbumsDb } from './db/albums.db';
import { TracksDb } from './db/tracks.db';
import { FavoritesDb } from './db/favorites.db';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [AlbumsDb, TracksDb, FavoritesDb, DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
