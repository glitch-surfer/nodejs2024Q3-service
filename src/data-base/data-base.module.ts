import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { FavoritesDb } from './db/favorites.db';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [FavoritesDb, DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
