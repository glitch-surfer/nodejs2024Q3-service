import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { DataBaseService } from 'src/data-base/data-base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TrackService {
  constructor(
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    private readonly databaseService: DataBaseService,
  ) {}

  async create({
    name,
    duration,
    artistId,
    albumId,
  }: CreateTrackDto): Promise<Track> {
    if (artistId && !(await this.databaseService.isArtistExists(artistId))) {
      throw new NotFoundException('Artist not found');
    }

    if (albumId && !(await this.databaseService.isAlbumExists(albumId))) {
      throw new NotFoundException('Album not found');
    }

    const track = new Track();
    track.name = name;
    track.duration = duration;
    track.artistId = artistId;
    track.albumId = albumId;

    return this.trackRepository.save(track);
  }

  findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  findOne(id: string): Promise<Track | null> {
    return this.trackRepository.findOneBy({ id });
  }

  async update(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Promise<Track | null> {
    if (artistId && !(await this.databaseService.isArtistExists(artistId))) {
      throw new NotFoundException('Artist not found');
    }

    if (albumId && !(await this.databaseService.isAlbumExists(albumId))) {
      throw new NotFoundException('Album not found');
    }

    const track = await this.trackRepository.findOneBy({ id });
    if (!track) throw new NotFoundException('Track not found');

    return this.trackRepository.save({
      ...track,
      name,
      duration,
      artistId,
      albumId,
    });
  }

  async remove(id: string): Promise<boolean> {
    if (!(await this.trackRepository.exists({ where: { id } }))) return false;

    const result = await this.trackRepository.delete({ id }).then(() => true);
    if (result) await this.databaseService.removeTrack(id);
    return result;
  }
}
