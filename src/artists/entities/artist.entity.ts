import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}

@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  grammy: boolean;
}
