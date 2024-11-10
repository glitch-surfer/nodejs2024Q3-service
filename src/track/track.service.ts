import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { TracksDb } from 'src/data-base/db/tracks.db';
import { DataBaseService } from 'src/data-base/data-base.service';

@Injectable()
export class TrackService {
  private readonly tracksDb: TracksDb;

  constructor(private readonly databaseService: DataBaseService) {
    this.tracksDb = this.databaseService.tracksDb;
  }

  create({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    if (artistId && !this.databaseService.isArtistExists(artistId)) {
      throw new NotFoundException('Artist not found');
    }

    if (albumId && !this.databaseService.isAlbumExists(albumId)) {
      throw new NotFoundException('Album not found');
    }

    return this.tracksDb.create({ name, duration, artistId, albumId });
  }

  findAll(): Track[] {
    return this.tracksDb.findAll();
  }

  findOne(id: string): Track | undefined {
    return this.tracksDb.findOne(id);
  }

  update(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Track | null {
    if (artistId && !this.databaseService.isArtistExists(artistId)) {
      throw new NotFoundException('Artist not found');
    }

    if (albumId && !this.databaseService.isAlbumExists(albumId)) {
      throw new NotFoundException('Album not found');
    }

    return this.tracksDb.update(id, { name, duration, artistId, albumId });
  }

  remove(id: string): boolean {
    return this.tracksDb.remove(id);
  }
}
