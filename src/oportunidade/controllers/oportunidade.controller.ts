import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { OportunidadeService } from "../services/oportunidade.service";
import { OportunidadeEntity } from "../entities/oportunidade.entity";

@Controller('/oportunidades')
export class OportunidadeController {

    constructor(
        private readonly oportunidadeService: OportunidadeService
    ) {}

    @Get('/todas')
    @HttpCode(HttpStatus.OK)
    buscarTodas(): Promise<OportunidadeEntity[]> {
        return this.oportunidadeService.buscarTodas();
    }

    // método de busca especifico
    @Get('/equipamento/:equipamento')
    @HttpCode(HttpStatus.OK)
    buscarPorEquipamento(@Param('equipamento') equipamento: string): Promise<OportunidadeEntity[]> {
        return this.oportunidadeService.buscarPorEquipamento(equipamento);
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    buscarPorId(@Param('id', ParseIntPipe) id: number): Promise<OportunidadeEntity> {
        return this.oportunidadeService.buscarPorId(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    cadastrar(@Body() oportunidade: OportunidadeEntity): Promise<OportunidadeEntity> {
        return this.oportunidadeService.cadastrar(oportunidade);
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    atualizar(@Body() oportunidade: OportunidadeEntity): Promise<OportunidadeEntity> {
        return this.oportunidadeService.atualizar(oportunidade);
    }

    @Delete('/deletar/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    deletar(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.oportunidadeService.deletar(id);
    }

    // métodos para gerenciar o status da oportunidade (finalizar e cancelar)
    @Patch('/finalizar/:id')
    @HttpCode(HttpStatus.OK)
    finalizar(@Param('id', ParseIntPipe) id: number): Promise<OportunidadeEntity> {
        return this.oportunidadeService.finalizar(id);
    }

    @Patch('/cancelar/:id')
    @HttpCode(HttpStatus.OK)
    cancelar(@Param('id', ParseIntPipe) id: number): Promise<OportunidadeEntity> {
        return this.oportunidadeService.cancelar(id);
    }
}