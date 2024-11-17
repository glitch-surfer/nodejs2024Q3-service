import * as uuid from 'uuid';

interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}

export class Album implements IAlbum {
  id = uuid.v4();

  constructor(
    public name: string,
    public year: number,
    public artistId: string | null,
  ) {}

  static updateAlbum(
    album: Album,
    name: string,
    year: number,
    artistId: string,
  ) {
    return {
      ...album,
      name,
      year,
      artistId,
    };
  }
}
