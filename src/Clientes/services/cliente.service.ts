import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Cliente } from "../entities/cliente.entity";

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private clienteRepository: Repository<Cliente>
    ) { }

    
    async findAll(): Promise<Cliente[]> {
        return await this.clienteRepository.find();
    }
    
    
    async findById(id: number): Promise<Cliente> {
        const cliente = await this.clienteRepository.findOne({
            where: { id },            
            // relations:{
            //     produto:true,
            // }

        });

        if (!cliente)
            throw new HttpException('cliente não encontrado!', HttpStatus.NOT_FOUND);

        return cliente;
    }

    async findByNome(nome: string): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            },
            // relations:{
            //     produto:true,
            // }
        });
    }

    async findByCpf(cpf: string): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            where: {
                cpf: ILike(`%${cpf}%`)
            },
            // relations:{
            //     produto:true,
            // }
        });
    }
    async findByemail(email: string): Promise<Cliente[]> {
        return await this.clienteRepository.find({
            where: {
                email: ILike(`%${email}%`)
            },
            // relations:{
            //     produto:true,
            // }
        });
    }

    async create(cliente: Cliente): Promise<Cliente> {
        return await this.clienteRepository.save(cliente);
    }

    async update(cliente: Cliente): Promise<Cliente> {
        await this.findById(cliente.id); 
        return await this.clienteRepository.save(cliente);
    }

    async delete(id: number): Promise<DeleteResult> {
        await this.findById(id); 
        return await this.clienteRepository.delete(id);
    }
}