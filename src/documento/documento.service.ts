import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Documento } from './schema/documento.schema';
import { Model } from 'mongoose';
import { CreateDocumentoDto } from './dto/create-documento.dto';
import { UpdateDocumentoDto } from './dto/update-documento.dto';

@Injectable()
export class DocumentoService {
  constructor(
    @InjectModel(Documento.name)
    private documentoModel: Model<Documento>
  ) {}

  async create(createDocumentoDto: CreateDocumentoDto) {
    const documento = new this.documentoModel(createDocumentoDto);
    return await documento.save()
  }

  async findAll() {
    return this.documentoModel.find()
  }

  async findOne(documento_id: string) {
    return this.documentoModel.findById(documento_id)
  }

  async update(documento_id: string, updateDocumentoDto: UpdateDocumentoDto) {
    const documento = await this.documentoModel.findById(documento_id)
    if (!documento) {
      throw new BadRequestException('Documento not found');
    }

    documento.type = updateDocumentoDto.type;

    return await documento.save();
  }

  async remove(documento_id: string) {
    const documento = await this.documentoModel.findByIdAndDelete(documento_id)
    if (!documento) {
      throw new BadRequestException('Documento no encontrado');
    }

    return { success: true };
  }
}
