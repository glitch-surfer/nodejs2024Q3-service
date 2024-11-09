import * as uuid from 'uuid';

interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

export class Artist implements IArtist {
  id = uuid.v4();

  constructor(public name: string, public grammy: boolean) {}

  static updateArtist(artist: Artist, name: string, grammy: boolean) {
    return {
      ...artist,
      name,
      grammy,
    };
  }
}
