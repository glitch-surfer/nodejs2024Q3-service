import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  private readonly tracks: Record<string, Track> = {};

  create({ name, duration, artistId, albumId }: CreateTrackDto): Track {
    const track = new Track(name, artistId, albumId, duration);
    this.tracks[track.id] = track;
    return track;
  }

  findAll(): Track[] {
    return Object.values(this.tracks);
  }

  findOne(id: string): Track | undefined {
    return this.tracks[id];
  }

  update(
    id: string,
    { name, duration, artistId, albumId }: UpdateTrackDto,
  ): Track | null {
    const track = this.tracks[id];
    if (!track) return null;

    const updatedTrack = Track.updateTrack(
      track,
      name,
      duration,
      artistId,
      albumId,
    );
    this.tracks[id] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string): boolean {
    const isTrackExist = Boolean(this.tracks[id]);
    if (!isTrackExist) return false;

    delete this.tracks[id];
    return true;
  }

  removeAlbum(id: string): void {
    for (const trackId in this.tracks) {
      const track = this.tracks[trackId];
      if (track.albumId === id) track.albumId = null;
    }
  }

  removeArtist(id: string): void {
    for (const trackId in this.tracks) {
      const track = this.tracks[trackId];
      if (track.artistId === id) track.artistId = null;
    }
  }
}
