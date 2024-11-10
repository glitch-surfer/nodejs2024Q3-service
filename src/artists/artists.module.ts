import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { TrackModule } from 'src/track/track.module';
import { AlbumsModule } from 'src/albums/albums.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
  imports: [TrackModule, AlbumsModule],
})
export class ArtistsModule {}
