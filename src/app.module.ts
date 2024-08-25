import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DocumentoModule } from './documento/documento.module';
import { GradoModule } from './grado/grado.module';
import { PeriodoEscolarModule } from './periodo-escolar/periodo-escolar.module';
import { SeccionModule } from './seccion/seccion.module';
import { SeccionGradoPeriodoModule } from './seccion-grado-periodo/seccion-grado-periodo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { MultimediaModule } from './multimedia/multimedia.module';
import { DocenteModule } from './docente/docente.module';

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
    SeccionModule,
    SeccionGradoPeriodoModule,
    AuthModule,
    UserModule,
    MultimediaModule,
    DocenteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
