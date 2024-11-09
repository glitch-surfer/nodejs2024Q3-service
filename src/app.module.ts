import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { ValidateUuidPipe } from './pipes/validate-uuid';
import { AlbumsModule } from './albums/albums.module';

@Module({
  imports: [UsersModule, ArtistsModule, AlbumsModule],
  controllers: [AppController],
  providers: [AppService, ValidateUuidPipe],
})
export class AppModule {}
