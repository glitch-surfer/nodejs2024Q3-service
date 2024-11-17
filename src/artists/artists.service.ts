import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataBaseService } from '../data-base/data-base.service';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistsRepository: Repository<Artist>,
    private readonly dataBaseService: DataBaseService,
  ) {}

  async create({ name, grammy }: CreateArtistDto): Promise<Artist> {
    const artist = new Artist();
    artist.name = name;
    artist.grammy = grammy;
    return this.artistsRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find();
  }

  async findOne(id: string): Promise<Artist | undefined> {
    return this.artistsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    { name, grammy }: UpdateArtistDto,
  ): Promise<null | Artist> {
    const artist = await this.artistsRepository.findOneBy({ id });
    if (!artist) return null;

    return await this.artistsRepository.save({ ...artist, name, grammy });
  }

  async remove(id: string): Promise<boolean> {
    if (!(await this.artistsRepository.exists({ where: { id } }))) return false;

    const result = await this.artistsRepository.delete({ id }).then(() => true);
    if (result) await this.dataBaseService.removeArtist(id);
    return result;
  }
}
