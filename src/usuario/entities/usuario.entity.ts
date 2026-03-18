import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
//import { Produto } from "../../produto/entities/produto.entity"; 

@Entity({ name: "tb_usuarios" })
export class Usuario {

    @PrimaryGeneratedColumn()
    id: number;

    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    @Column({ length: 255, nullable: false })
    nome: string; 

    @IsEmail({}, { message: 'Informe um e-mail válido.' })
    @IsNotEmpty()
    @Column({ length: 255, nullable: false, unique: true })
    email: string; 

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres.' })
    @Column({ length: 255, nullable: false })
    senha: string; 

    @Column({ length: 255, nullable: true })
    tipo: string;

    //@OneToMany(() => Produto, (produto) => produto.usuario)
    //produto: Produto[]
    
}