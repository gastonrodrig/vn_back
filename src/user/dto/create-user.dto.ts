import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { Roles } from 'src/auth/enums/rol.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'La nueva contraseña debe tener al menos 5 caracteres.' })
  contrasena: string;
  
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
