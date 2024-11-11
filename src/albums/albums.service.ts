import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { AlbumsDb } from 'src/data-base/db/albums.db';
import { DataBaseService } from 'src/data-base/data-base.service';

@Injectable()
export class AlbumsService {
  private readonly albumsDb: AlbumsDb;

  constructor(private readonly dataBaseService: DataBaseService) {
    this.albumsDb = this.dataBaseService.albumsDb;
  }

  create({ name, year, artistId }: CreateAlbumDto): Album {
    if (artistId && !this.dataBaseService.isArtistExists(artistId)) {
      throw new NotFoundException('Artist not found');
    }

    return this.albumsDb.create({ name, year, artistId });
  }

  findAll(): Album[] {
    return this.albumsDb.findAll();
  }

  findOne(id: string): Album | undefined {
    return this.albumsDb.findOne(id);
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto): null | Album {
    if (artistId && !this.dataBaseService.isArtistExists(artistId)) {
      throw new NotFoundException('Artist not found');
    }

    return this.albumsDb.update(id, { name, year, artistId });
  }

  remove(id: string): boolean {
    const result = this.albumsDb.remove(id);
    if (result) {
      this.dataBaseService.removeAlbum(id);
    }

    return result;
  }
}
