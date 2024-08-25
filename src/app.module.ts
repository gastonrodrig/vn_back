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
import { CursoModule } from './curso/curso.module';
import { GradoCursoHorasModule } from './grado-curso-horas/grado-curso-horas.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { DocumentosEstudianteModule } from './documentos-estudiante/documentos-estudiante.module';

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
    MultimediaModule,
    DocumentoModule,
    PeriodoEscolarModule,
    AuthModule,
    UserModule,
    DocenteModule,
    SeccionModule,
    SeccionGradoPeriodoModule,
    CursoModule,
    GradoModule,
    GradoCursoHorasModule,
    EstudianteModule,
    DocumentosEstudianteModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
