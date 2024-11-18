import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { DataBaseModule } from '../data-base/data-base.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [TypeOrmModule.forFeature([Artist]), DataBaseModule],
})
export class ArtistsModule {}
