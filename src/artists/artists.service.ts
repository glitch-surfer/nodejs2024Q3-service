import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private readonly artists: Record<string, Artist> = {};

  create({ name, grammy }: CreateArtistDto): Artist {
    const artist = new Artist(name, grammy);
    this.artists[artist.id] = artist;
    return artist;
  }

  findAll(): Artist[] {
    return Object.values(this.artists);
  }

  findOne(id: string): Artist | undefined {
    return this.artists[id];
  }

  update(id: string, UpdateArtistDto: UpdateArtistDto): null | Artist {
    const artist = this.artists[id];
    if (!artist) return null;

    const updatedArtist = Artist.updateArtist(
      artist,
      UpdateArtistDto.name,
      UpdateArtistDto.grammy,
    );

    this.artists[id] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string): boolean {
    const isArtistExist = Boolean(this.artists[id]);
    if (!isArtistExist) return false;

    delete this.artists[id];
    return true;
  }
}
