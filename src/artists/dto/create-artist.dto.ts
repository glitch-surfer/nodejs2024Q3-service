import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { Artist } from '../entities/artist.entity';

type ICreateArtistDto = Omit<Artist, 'id'>;

export class CreateArtistDto implements ICreateArtistDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
