import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  imports: [DataBaseModule],
})
export class ArtistsModule {}
