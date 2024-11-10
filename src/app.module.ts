import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { ValidateUuidPipe } from './pipes/validate-uuid';
import { AlbumsModule } from './albums/albums.module';
import { TrackModule } from './track/track.module';
import { DataBaseModule } from './data-base/data-base.module';

@Module({
  imports: [
    ArtistsModule,
    UsersModule,
    AlbumsModule,
    TrackModule,
    DataBaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, ValidateUuidPipe],
})
export class AppModule {}
