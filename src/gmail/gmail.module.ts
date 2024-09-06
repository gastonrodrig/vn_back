import { Module } from '@nestjs/common';
import { GmailService } from './gmail.service';
import { GmailController } from './gmail.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apoderado, ApoderadoSchema } from 'src/apoderado/schema/apoderado.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: Apoderado.name, schema: ApoderadoSchema}
    ])
  ],
  providers: [GmailService],
  controllers: [GmailController]
})
export class GmailModule {}
