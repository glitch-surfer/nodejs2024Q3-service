import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorites } from './entities/favorite.entity';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [DataBaseModule, TypeOrmModule.forFeature([Favorites])],
})
export class FavoritesModule {}
