import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { ValidateUuidPipe } from './pipes/validate-uuid';
import { AlbumsModule } from './albums/albums.module';
import { TrackModule } from './track/track.module';
import { DataBaseModule } from './data-base/data-base.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ArtistsModule,
    UsersModule,
    AlbumsModule,
    TrackModule,
    FavoritesModule,
    DataBaseModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'nest_user',
      password: 'nest_password',
      database: 'nest_database',
      entities: [],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ValidateUuidPipe],
})
export class AppModule {}
