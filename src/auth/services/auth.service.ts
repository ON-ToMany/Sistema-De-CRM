import { UsuarioService } from '../../usuario/services/usuario.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const buscaUsuario = await this.usuarioService.findByUsuario(username);
    if(!buscaUsuario)
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);

    const matchPassword = await this.bcrypt.compararSenhas(password, buscaUsuario.senha)
    if(buscaUsuario && matchPassword){
          const { senha, ...resposta } = buscaUsuario
          return resposta
    }
    return null
  }

  async login(usuarioLogin: UsuarioLogin) {
    const payload = { sub: usuarioLogin.usuario }

    const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario);

    if (!buscaUsuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return {
      id: buscaUsuario.id,
      nome: buscaUsuario.nome,
      email: usuarioLogin.usuario,
      senha: '',
      tipo: buscaUsuario.tipo,
      token: `Bearer ${this.jwtService.sign(payload)}`
    }
  }
}
