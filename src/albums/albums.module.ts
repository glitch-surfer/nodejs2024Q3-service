import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataBaseModule, TypeOrmModule.forFeature([Album])],
})
export class AlbumsModule {}
