import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { ValidateUuidPipe } from './pipes/validate-uuid';

@Module({
  imports: [UsersModule, ArtistsModule],
  controllers: [AppController],
  providers: [AppService, ValidateUuidPipe],
})
export class AppModule {}
