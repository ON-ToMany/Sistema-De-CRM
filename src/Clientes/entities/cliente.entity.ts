import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MinLength,
  minLength,
} from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OportunidadeEntity } from '../../oportunidade/entities/oportunidade.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 60, nullable: false })
  @ApiProperty()
  nome: string;

  @MinLength(11)
  @IsNotEmpty()
  @Column({ length: 11, nullable: false, unique: true })
  @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos numéricos' })
  @ApiProperty()
  cpf: string;

  @IsEmail({}, { message: 'Email inválido' })
  @Transform(({ value }) => value.toLowerCase())
  @IsNotEmpty()
  @Column({ length: 50, nullable: false, unique: true })
  @ApiProperty()
  email: string;

  @OneToMany(() => OportunidadeEntity, (produto) => produto.cliente)
  @ApiProperty({ type: () => [OportunidadeEntity] })
  produto: OportunidadeEntity[];
}
