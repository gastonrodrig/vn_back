import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Documento, DocumentoSchema } from './schema/documento.schema';
import { DocumentoService } from './documento.service';
import { DocumentoController } from './documento.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Documento.name,
      schema: DocumentoSchema
    }])
  ],
  providers: [DocumentoService],
  controllers: [DocumentoController]
})
export class DocumentoModule {}
