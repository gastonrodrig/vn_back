import { Module } from '@nestjs/common';
import { Bimestre, BimestreSchema } from './schema/bimestre.schema';
import { BimestreService } from './bimestre.service';
import { BimestreController } from './bimestre.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Bimestre.name, schema: BimestreSchema}
    ])
  ],
  providers: [BimestreService],
  controllers: [BimestreController]
})
export class BimestreModule {}