import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, Matches, MinLength, minLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "tb_clientes" })
export class Cliente {

    @PrimaryGeneratedColumn()    
    id: number;

    @IsNotEmpty()
    @Column({ length: 60, nullable: false })
    nome: string; 

    
    @MinLength(11)
    @IsNotEmpty()
    @Column({ length: 11, nullable: false , unique: true })
    @Matches(/^\d{11}$/, { message: 'CPF deve ter 11 dígitos numéricos' })
    cpf: string; 

    @IsEmail({}, { message: 'Email inválido' })
    @Transform(({ value }) => value.toLowerCase())
    @IsNotEmpty()
    @Column({ length: 50, nullable: false , unique: true })
    email: string; 

    
    
    // @OneToMany(() => Produto, (produto) => produto.categoria)
    // produto: Produto[];
}