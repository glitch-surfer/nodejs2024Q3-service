import { Injectable } from '@nestjs/common';
import { Favorite } from 'src/favorites/entities/favorite.entity';

@Injectable()
export class FavoritesDb {
  private readonly favorites = new Favorite();

  getFavoritesIds() {
    return this.favorites;
  }

  addFavoriteTrack(id: string) {
    this.favorites.tracks.push(id);
  }

  removeFavoriteTrack(id: string): boolean {
    const lengthBeforeFilter = this.favorites.tracks.length;
    this.favorites.tracks = this.favorites.tracks.filter(
      (track) => track !== id,
    );

    return lengthBeforeFilter !== this.favorites.tracks.length;
  }

  addFavoriteAlbum(id: string) {
    this.favorites.albums.push(id);
  }

  removeFavoriteAlbum(id: string): boolean {
    const lengthBeforeFilter = this.favorites.albums.length;
    this.favorites.albums = this.favorites.albums.filter(
      (album) => album !== id,
    );

    return lengthBeforeFilter !== this.favorites.albums.length;
  }

  addFavoriteArtist(id: string) {
    this.favorites.artists.push(id);
  }

  removeFavoriteArtist(id: string): boolean {
    const lengthBeforeFilter = this.favorites.artists.length;
    this.favorites.artists = this.favorites.artists.filter(
      (artist) => artist !== id,
    );

    return lengthBeforeFilter !== this.favorites.artists.length;
  }
}
