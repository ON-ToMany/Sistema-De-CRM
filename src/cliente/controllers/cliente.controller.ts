import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { Cliente } from '../entities/cliente.entity';
import { ClienteService } from '../services/cliente.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Cliente')
@UseGuards(JwtAuthGuard)
@Controller('/clientes')
@ApiBearerAuth()
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Cliente[]> {
    return this.clienteService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return this.clienteService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findBynome(@Param('nome') nome: string): Promise<Cliente[]> {
    return this.clienteService.findByNome(nome);
  }

  @Get('/cpf/:cpf')
  @HttpCode(HttpStatus.OK)
  findByCpf(@Param('nome') cpf: string): Promise<Cliente[]> {
    return this.clienteService.findByCpf(cpf);
  }
  
  @Get('/email/:email')
  @HttpCode(HttpStatus.OK)
  findByEmail(@Param('nome') email: string): Promise<Cliente[]> {
    return this.clienteService.findByemail(email);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.create(cliente);
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  update(@Body() cliente: Cliente): Promise<Cliente> {
    return this.clienteService.update(cliente);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.clienteService.delete(id);
  }
}
