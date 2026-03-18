import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'tb_categoria'})
export class CategoriaEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({message: 'O campo nome é obrigatório'})
    @Column({length: 50, nullable: false, unique: true})
    nome: string;

    //relacionamento
    // @OneToMany(() => Oportunidade, (oportunidade) => oportunidade.categoria) 
    // produtos: Oportunidade[];
}