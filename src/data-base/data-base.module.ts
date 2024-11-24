import { Module } from '@nestjs/common';
import { DataBaseService } from './data-base.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature()],
  providers: [DataBaseService],
  exports: [DataBaseService],
})
export class DataBaseModule {}
