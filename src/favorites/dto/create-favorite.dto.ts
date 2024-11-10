import { IsOptional, IsUUID } from 'class-validator';

export class CreateFavoriteDto {
  @IsUUID()
  @IsOptional()
  artistId: string;

  @IsUUID()
  @IsOptional()
  albumId: string;

  @IsUUID()
  @IsOptional()
  trackId: string;
}
