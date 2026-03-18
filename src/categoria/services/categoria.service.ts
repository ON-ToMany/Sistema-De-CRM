import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ILike, Repository } from "typeorm";
import { CategoriaEntity } from "../entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CategoriaService {
    constructor(
        @InjectRepository(CategoriaEntity)
        private categoriaRepository: Repository<CategoriaEntity>
    ) {}

    // Métodos de busca
    async buscarTodas(): Promise<CategoriaEntity[]> {
        return this.categoriaRepository.find({
            // relations: {
            //     oportunidade: true
            // }
        });
    }

    async buscarPorId(id:number): Promise<CategoriaEntity>{
        const categoria = await this.categoriaRepository.findOne({
            where: {
                id
            },
            // relations: {
            //     oportunidade: true
            // }
        });

        if(!categoria){
            throw new  HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);
        }
        return categoria;
    }

    async buscarPorNome(nome:string): Promise<CategoriaEntity[]>{
        return this.categoriaRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            // relations: {
            //     oportunidade: true
            // }
        });
    }

    // Métodos de cadastro, atualização e exclusão
    async cadastrar(categoria: CategoriaEntity): Promise<CategoriaEntity>{
        const verificarExistencia = await this.categoriaRepository.findOne({
            where: {
                nome: ILike(categoria.nome)
            }      
        });

        if(verificarExistencia){
            throw new  HttpException('Categoria já cadastrada!', HttpStatus.BAD_REQUEST);
        }
        return await this.categoriaRepository.save(categoria);
    }

    async atualizar(categoria: CategoriaEntity): Promise<CategoriaEntity>{
        // Verificar se o ID da categoria é válido
        if(!categoria.id || categoria.id <= 0){
            throw new HttpException('O ID da categoria é inválido!', HttpStatus.BAD_REQUEST);
        }
        await this.buscarPorId(categoria.id);
        return await this.categoriaRepository.save(categoria);
    }

    async deletar(id: number): Promise<void>{
        await this.buscarPorId(id);
        await this.categoriaRepository.delete(id);
    }
}