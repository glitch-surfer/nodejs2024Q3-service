import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [DataBaseModule],
})
export class FavoritesModule {}
