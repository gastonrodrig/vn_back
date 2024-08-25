import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from 'src/auth/enums/rol.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  nombres_usuario: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email_usuario: string;
  
  @ApiProperty()
  @IsEnum(Roles)
  @IsNotEmpty()
  rol: Roles;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  estudiante_id: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  docente_id: string;

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  apoderado_id: string;
}