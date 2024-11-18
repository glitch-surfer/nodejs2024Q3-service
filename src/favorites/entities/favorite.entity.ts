import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Track } from 'src/track/entities/track.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface IFavorites {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

@Entity()
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { array: true, nullable: true, default: [] })
  artists: string[];

  @Column('text', { array: true, nullable: true, default: [] })
  albums: string[];

  @Column('text', { array: true, nullable: true, default: [] })
  tracks: string[];
}

export interface FavoritesResponse {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
