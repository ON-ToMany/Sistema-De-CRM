import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OportunidadeEntity } from "../../oportunidade/entities/oportunidade.entity";

@Entity({name: 'tb_categoria'})
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({message: 'O campo nome é obrigatório'})
    @Column({length: 50, nullable: false, unique: true})
    nome: string;


     @OneToMany(() => OportunidadeEntity, (oportunidade) => oportunidade.categoria) 
    produtos:OportunidadeEntity[];
}