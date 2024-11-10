import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { ArtistsDb } from 'src/data-base/db/artists.db';
import { DataBaseService } from 'src/data-base/data-base.service';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsDb: ArtistsDb,
    private readonly dataBaseService: DataBaseService,
  ) {}

  create({ name, grammy }: CreateArtistDto): Artist {
    return this.artistsDb.create({ name, grammy });
  }

  findAll(): Artist[] {
    return this.artistsDb.findAll();
  }

  findOne(id: string): Artist | undefined {
    return this.artistsDb.findOne(id);
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto): null | Artist {
    return this.artistsDb.update(id, UpdateArtistDto);
  }

  remove(id: string): boolean {
    const result = this.artistsDb.remove(id);
    if (result) this.dataBaseService.removeArtist(id);
    return result;
  }
}
