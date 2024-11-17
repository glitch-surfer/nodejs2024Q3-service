import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TrackController],
  providers: [TrackService],
  imports: [DataBaseModule, TypeOrmModule.forFeature([Track])],
})
export class TrackModule {}
