import { UsuarioService } from "../services/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { Body, Controller, Get, HttpCode, HttpStatus, 
    Post, Put, UseGuards } from "@nestjs/common";

@Controller("/usuarios")
export class UsuarioController {

    constructor(private usuarioService: UsuarioService) { }

    @UseGuards(JwtAuthGuard) 
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]> {
        return this.usuarioService.findAll();
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.create(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuarioService.update(usuario);
    }
}