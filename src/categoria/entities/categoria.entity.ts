import { Transform, TransformFnParams } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OportunidadeEntity } from '../../oportunidade/entities/oportunidade.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_categoria' })
export class CategoriaEntity {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsNotEmpty({ message: 'O campo nome é obrigatório' })
  @Column({ length: 50, nullable: false, unique: true })
  @ApiProperty()
  nome: string;

  @ApiProperty({ type: () => [OportunidadeEntity] })
  @OneToMany(() => OportunidadeEntity, (oportunidades) => oportunidades.categoria)
  oportunidades: OportunidadeEntity[];
}
