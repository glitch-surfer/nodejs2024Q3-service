import * as uuid from 'uuid';
import { UpdateTrackDto } from '../dto/update-track.dto';

interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export class Track implements ITrack {
  id = uuid.v4();

  constructor(
    public name: string,
    public artistId: string | null,
    public albumId: string | null,
    public duration: number,
  ) {}

  static updateTrack(
    track: Track,
    name: string,
    duration: number,
    artistId?: string,
    albumId?: string,
  ): Track {
    return {
      ...track,
      name,
      duration,
      artistId,
      albumId,
    };
  }
}
