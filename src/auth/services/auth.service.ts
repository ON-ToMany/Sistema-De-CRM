import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/services/usuario.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService,
        private jwtService: JwtService
    ) { }

    async login(user: any) {
        let buscaUsuario = await this.usuarioService.findByUsuario(user.usuario);

        if (!buscaUsuario) {
            throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
        }

        const senhaCoincide = await bcrypt.compare(user.senha, buscaUsuario.senha);

        if (senhaCoincide) {
            const payload = { username: buscaUsuario.email, sub: buscaUsuario.id };
            return {
                access_token: this.jwtService.sign(payload),
            };
        }

        throw new HttpException('Senha incorreta!', HttpStatus.UNAUTHORIZED);
    }
}