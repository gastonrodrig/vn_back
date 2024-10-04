import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Roles } from '../enum/rol.enum';
export class UpdateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  usuario: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;
  
  @ApiProperty()
  @IsEnum(Roles)
  @IsNotEmpty()
  rol: Roles

  @ApiProperty()
  @IsOptional()
  @IsMongoId()
  perfil_id: string;
}