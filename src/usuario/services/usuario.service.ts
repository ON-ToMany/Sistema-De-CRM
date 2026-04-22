import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  
  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: {
        email: usuario,
      },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find({
      relations: {
        oportunidades: true  
      },
    });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.findByUsuario(usuario.email);

    if (!buscaUsuario) {
      usuario.senha = await bcrypt.hash(usuario.senha, 10);
      return await this.usuarioRepository.save(usuario);
    }

    throw new HttpException('O Usuário já existe!', HttpStatus.BAD_REQUEST);
  }

  async update(usuario: Usuario): Promise<Usuario> {
    const buscaUsuario = await this.usuarioRepository.findOne({
      where: { id: usuario.id },
    });

    if (!buscaUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    usuario.senha = await bcrypt.hash(usuario.senha, 10);
    return await this.usuarioRepository.save(usuario);
  }
}
