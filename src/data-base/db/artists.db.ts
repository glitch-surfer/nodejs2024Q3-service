import { Injectable } from '@nestjs/common';
import { Artist } from 'src/artists/entities/artist.entity';

import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { CreateArtistDto } from 'src/artists/dto/create-artist.dto';

@Injectable()
export class ArtistsDb {
  private artists: Record<string, Artist> = {};

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

  update(id: string, updateArtistDto: UpdateArtistDto): null | Artist {
    const artist = this.artists[id];
    if (!artist) return null;

    const updatedArtist = Artist.updateArtist(
      artist,
      updateArtistDto.name,
      updateArtistDto.grammy,
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
