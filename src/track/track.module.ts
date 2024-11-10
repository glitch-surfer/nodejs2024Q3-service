import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DataBaseModule],
})
export class TrackModule {}
