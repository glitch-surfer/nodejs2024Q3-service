import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataBaseModule } from 'src/data-base/data-base.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [DataBaseModule],
})
export class AlbumsModule {}
