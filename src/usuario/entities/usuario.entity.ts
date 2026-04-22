import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OportunidadeEntity } from '../../oportunidade/entities/oportunidade.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  nome: string;

  @IsEmail({}, { message: 'Informe um e-mail válido.' })
  @IsNotEmpty()
  @Column({ length: 255, nullable: false, unique: true })
  @ApiProperty({ example: 'email@email.com.br' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória.' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
  @Column({ length: 255, nullable: false })
  @ApiProperty()
  senha: string;

  @Column({ length: 255, nullable: true })
  @ApiProperty()
  tipo: string;

  @ApiProperty({ type: () => [OportunidadeEntity] })
  @OneToMany(() => OportunidadeEntity, (oportunidades) => oportunidades.usuario)
  oportunidades: OportunidadeEntity[];
}
