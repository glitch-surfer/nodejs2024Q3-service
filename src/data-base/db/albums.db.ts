import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/entities/album.entity';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { CreateAlbumDto } from 'src/albums/dto/create-album.dto';

@Injectable()
export class AlbumsDb {
  private albums: Record<string, Album> = {};

  create({ name, year, artistId }: CreateAlbumDto): Album {
    const album = new Album(name, year, artistId);
    this.albums[album.id] = album;
    return album;
  }

  findAll(): Album[] {
    return Object.values(this.albums);
  }

  findOne(id: string): Album | undefined {
    return this.albums[id];
  }

  update(id: string, { name, year, artistId }: UpdateAlbumDto): null | Album {
    const album = this.albums[id];
    if (!album) return null;

    const updatedAlbum = Album.updateAlbum(album, name, year, artistId);

    this.albums[id] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string): boolean {
    const isAlbumExist = Boolean(this.albums[id]);
    if (!isAlbumExist) return false;

    delete this.albums[id];
    return true;
  }

  removeArtist(id: string): void {
    for (const albumId in this.albums) {
      const album = this.albums[albumId];
      if (album.artistId === id) album.artistId = null;
    }
  }
}
