import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { OportunidadeService } from '../services/oportunidade.service';
import { OportunidadeEntity } from '../entities/oportunidade.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Oportunidade')
@UseGuards(JwtAuthGuard)
@Controller('/oportunidades')
@ApiBearerAuth()
export class OportunidadeController {
  constructor(private readonly oportunidadeService: OportunidadeService) {}

  @Get('/todas')
  @HttpCode(HttpStatus.OK)
  buscarTodas(@Req() req: any): Promise<OportunidadeEntity[]> {
    const usuarioId = req.user.id;
    return this.oportunidadeService.buscarTodas(usuarioId);
  }

  // método de busca especifico
  @Get('/equipamento/:equipamento')
  @HttpCode(HttpStatus.OK)
  buscarPorEquipamento(
    @Param('equipamento') equipamento: string,
    @Req() req: any
  ): Promise<OportunidadeEntity[]> {
    const usuarioId = req.user.id;
    return this.oportunidadeService.buscarPorEquipamento(equipamento, usuarioId);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  buscarPorId(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OportunidadeEntity> {
    return this.oportunidadeService.buscarPorId(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  cadastrar(
    @Body() oportunidade: OportunidadeEntity, @Req() req: any
  ): Promise<OportunidadeEntity> {
    oportunidade.usuario = req.user;
    return this.oportunidadeService.cadastrar(oportunidade);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  atualizar(
    @Body() oportunidade: OportunidadeEntity,
  ): Promise<OportunidadeEntity> {
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
  finalizar(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<OportunidadeEntity> {
    return this.oportunidadeService.finalizar(id);
  }

  @Patch('/cancelar/:id')
  @HttpCode(HttpStatus.OK)
  cancelar(@Param('id', ParseIntPipe) id: number): Promise<OportunidadeEntity> {
    return this.oportunidadeService.cancelar(id);
  }
}
