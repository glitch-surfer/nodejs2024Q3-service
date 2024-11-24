import {
  IsNumber,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { Track } from '../entities/track.entity';

type ICreateTrackDto = Omit<Track, 'id' | 'artist' | 'album'>;

export class CreateTrackDto implements ICreateTrackDto {
  @IsNumber()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @IsUUID()
  @IsOptional()
  albumId: string | null;
}
