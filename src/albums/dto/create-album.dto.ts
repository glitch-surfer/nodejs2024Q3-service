import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Album } from '../entities/album.entity';

type ICreateAlbumDto = Omit<Album, 'id'>;

export class CreateAlbumDto implements ICreateAlbumDto {
  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  artistId: string;
}
