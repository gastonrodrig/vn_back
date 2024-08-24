import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentoModule } from './documento/documento.module';
import { GradoModule } from './grado/grado.module';
import { PeriodoEscolarModule } from './periodo-escolar/periodo-escolar.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    DocumentoModule,
    GradoModule,
    PeriodoEscolarModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
