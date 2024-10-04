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
import { DocenteModule } from './docente/docente.module';
import { CursoModule } from './curso/curso.module';
import { GradoCursoHorasModule } from './grado-curso-horas/grado-curso-horas.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { ApoderadoModule } from './apoderado/apoderado.module';
import { EstudianteCursoModule } from './estudiante-curso/estudiante-curso.module';
import { CursoDocenteModule } from './curso-docente/curso-docente.module';
import { HorarioModule } from './horario/horario.module';
import { GmailModule } from './gmail/gmail.module';
import { PagoModule } from './pago/pago.module';
import { StripeModule } from './stripe/stripe.module';
import { CuposModule } from './cupos/cupos.module';
import { SolicitudModule } from './solicitud/solicitud.module';
import { MatriculaModule } from './matricula/matricula.module';
import { SemanasModule } from './semanas/semanas.module';
import { PeriodoSeccionCursoModule } from './periodo-seccion-curso/periodo-seccion-curso.module';
import { VacanteModule } from './vacante/vacante.module';
import { GmailTemporalModule } from './gmailTemporal/gmailTemporal.module';
import { PensionModule } from './pension/pension.module';
import { TutorModule } from './tutor/tutor.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { TareasModule } from './tareas/tareas.module';
import { NotasModule } from './notas/notas.module';

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
    ApoderadoModule,
    EstudianteCursoModule,
    CursoDocenteModule,
    HorarioModule,
    GmailModule,
    PagoModule,
    StripeModule,
    CuposModule,
    SolicitudModule,
    MatriculaModule,
    SemanasModule,
    PeriodoSeccionCursoModule,
    PensionModule,
    VacanteModule,
    GmailTemporalModule,
    TutorModule,
    AsistenciaModule,
    TareasModule,
    NotasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
