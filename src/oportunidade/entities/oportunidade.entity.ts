import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusOportunidade } from "./statusOportunidade.enum";
import { IsNotEmpty, IsNumber, Length, Min, Max } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Cliente } from "../../Clientes/entities/cliente.entity";
import { CategoriaEntity } from "../../categoria/entities/categoria.entity";
import { Usuario } from "../../usuario/entities/usuario.entity";

@Entity({name: 'tb_oportunidade'})
export class OportunidadeEntity {

    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(() => Cliente, (cliente) => cliente.produto, { 
         onDelete: "CASCADE" 
    })
    cliente: Cliente;

    @Transform(({value}: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: "É obrigatório informar o equipamento!" })
    @Length(5, 255, { message: "O equipamento deve conter entre 5 e 255 caracteres!" })
    @Column({type: 'varchar', length: 255, nullable: false})
    equipamento: string;

    //atributos para calculo de co2 baseado no peso e estado de conservação do equipamento
    @IsNumber({maxDecimalPlaces: 2})
    @Min(0.01)
    @Column({type: 'decimal', precision: 10, scale: 2, nullable: false})
    peso: number;

    @IsNumber()
    @Min(1, { message: 'O estado de conservação deve ser um número entre 1 e 10' })
    @Max(10, { message: 'O estado de conservação deve ser um número entre 1 e 10' })
    @Column({type: 'int', nullable: false})
    valorConservacao: number;

    // não é armazenado no banco, serve somente para o retornar o estado (ótimo, bom, ruim)
    estadoConservacao: string;

    // não é armazenado no banco, serve somente para o retornar o valor economzado de co2
    co2Economizado: number;

  
    @ManyToOne(() => CategoriaEntity, (categoria) => categoria.produtos, { 
        onDelete: "CASCADE" 
     })
    categoria: CategoriaEntity;

    @Column({ type: 'enum', enum: StatusOportunidade, default: StatusOportunidade.PENDENTE})
    status: StatusOportunidade;



    @ManyToOne(() => Usuario, (usuario) => usuario, { 
         onDelete: "CASCADE" 
    })
    usuario: Usuario;
}