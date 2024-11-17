import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly albumsRepository: Repository<Album>,
    private readonly dataBaseService: DataBaseService,
  ) {}

  async create({ name, year, artistId }: CreateAlbumDto): Promise<Album> {
    if (artistId && !(await this.dataBaseService.isArtistExists(artistId))) {
      throw new NotFoundException('Artist not found');
    }

    const album = new Album();
    album.name = name;
    album.year = year;
    album.artistId = artistId;

    return this.albumsRepository.save(album);
  }

  findAll(): Promise<Album[]> {
    return this.albumsRepository.find();
  }

  findOne(id: string): Promise<Album | null> {
    return this.albumsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    { name, year, artistId }: UpdateAlbumDto,
  ): Promise<null | Album> {
    if (artistId && !(await this.dataBaseService.isArtistExists(artistId))) {
      throw new NotFoundException('Artist not found');
    }

    const album = await this.albumsRepository.findOneBy({ id });
    if (!album) return null;

    return this.albumsRepository.save({ ...album, name, year, artistId });
  }

  async remove(id: string): Promise<boolean> {
    if (!(await this.albumsRepository.exists({ where: { id } }))) return false;

    const result = await this.albumsRepository.delete({ id }).then(() => true);
    if (result) await this.dataBaseService.removeAlbum(id);

    return result;
  }
}
