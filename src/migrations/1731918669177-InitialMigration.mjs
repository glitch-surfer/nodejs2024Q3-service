export class InitialMigration1731918669177 {
  async up(queryRunner) {
    await queryRunner.query(`
            CREATE TABLE "artist" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "grammy" boolean NOT NULL,
                CONSTRAINT "PK_artist_id" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "album" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "year" integer NOT NULL,
                "artistId" uuid,
                CONSTRAINT "PK_album_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_album_artist" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "track" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "duration" integer NOT NULL,
                "artistId" uuid,
                "albumId" uuid,
                CONSTRAINT "PK_track_id" PRIMARY KEY ("id"),
                CONSTRAINT "FK_track_artist" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE SET NULL,
                CONSTRAINT "FK_track_album" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE SET NULL
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "favorites" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "artists" text[] DEFAULT '{}' NOT NULL,
                "albums" text[] DEFAULT '{}' NOT NULL,
                "tracks" text[] DEFAULT '{}' NOT NULL,
                CONSTRAINT "PK_favorites_id" PRIMARY KEY ("id")
            )
        `);

    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "version" integer NOT NULL DEFAULT 1,
                "createdAt" timestamp NOT NULL DEFAULT now(),
                "updatedAt" timestamp NOT NULL DEFAULT now(),
                CONSTRAINT "PK_user_id" PRIMARY KEY ("id")
            )
        `);
  }

  async down(queryRunner) {
    await queryRunner.query(`DROP TABLE "user"`);
    await queryRunner.query(`DROP TABLE "favorites"`);
    await queryRunner.query(`DROP TABLE "track"`);
    await queryRunner.query(`DROP TABLE "album"`);
    await queryRunner.query(`DROP TABLE "artist"`);
  }
}
