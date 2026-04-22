import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OportunidadeEntity } from '../entities/oportunidade.entity';
import { ILike, Repository } from 'typeorm';
import { StatusOportunidade } from '../entities/statusOportunidade.enum';

@Injectable()
export class OportunidadeService {
  constructor(
    @InjectRepository(OportunidadeEntity)
    private oportunidadeRepository: Repository<OportunidadeEntity>,
  ) {}

  //calcula o CO2 economizado com base no peso do equipamento e seu estado de conservação
  private calcularCO2(oportunidade: OportunidadeEntity): number {
    const peso = Number(oportunidade.peso);
    const fatorBase = 2.5; // fator médio estimado de CO2 economizado por kg de equipamento reutilizado
    const fatorEstado = oportunidade.valorConservacao / 10;
    return Number((peso * fatorBase * fatorEstado).toFixed(2));
  }
  //define o estado de conservação do equipamento com base no valor informado no campo valorConservacao
  private definirConservacao(oportunidade: OportunidadeEntity): void {
    const estado = oportunidade.valorConservacao;

    if (estado >= 1 && estado <= 3) {
      oportunidade.estadoConservacao = 'Ruim';
    } else if (estado <= 6) {
      oportunidade.estadoConservacao = 'Bom';
    } else {
      oportunidade.estadoConservacao = 'Ótimo';
    }
  }
  //centraliza as regras da oportunidade, para evitar que sejam repetidas em vários métodos aqui na service
  private processarOportunidade(oportunidade: OportunidadeEntity): void {
    this.definirConservacao(oportunidade);
    oportunidade.co2Economizado = this.calcularCO2(oportunidade);
  }

  //métodos de busca
  async buscarTodas(): Promise<OportunidadeEntity[]> {
    const oportunidades = await this.oportunidadeRepository.find({
      relations: {
          cliente: true,
          usuario: true
      }
    });

    //para exibir os campos de estado de conservação e co2 economizado (pois são apenas de retorno)
    oportunidades.forEach((oportunidade) => {
      this.processarOportunidade(oportunidade);
    });
    return oportunidades;
  }

  async buscarPorId(id: number): Promise<OportunidadeEntity> {
    const oportunidade = await this.oportunidadeRepository.findOne({
      where: { id },
      relations: {
          cliente: true,
          usuario: true
      }
    });

    if (!oportunidade) {
      throw new HttpException(
        'Oportunidade não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }
    //para exibir os campos de estado de conservação e co2 economizado (pois são apenas de retorno)
    this.processarOportunidade(oportunidade);
    return oportunidade;
  }

  async buscarPorEquipamento(nome: string): Promise<OportunidadeEntity[]> {
    const buscarOportunidade = await this.oportunidadeRepository.find({
      where: {
        equipamento: ILike(`%${nome}%`),
      },
      relations: {
          cliente: true,
          usuario: true
      }
    });
    //para exibir os campos de estado de conservação e co2 economizado (pois são apenas de retorno)
    buscarOportunidade.forEach((oportunidade) => {
      this.processarOportunidade(oportunidade);
    });
    return buscarOportunidade;
  }

  //métodos de gerenciamento de status das oportunidades
  //finaliza uma oportunidade
  async finalizar(id: number) {
    const oportunidade = await this.oportunidadeRepository.findOneBy({ id });
    //verifica se a oportunidade existe
    if (!oportunidade) {
      throw new HttpException(
        'Oportunidade não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }
    //verifica se a oportunidade está pendente, apenas oportunidades pendentes podem ser finalizadas
    if (oportunidade.status !== StatusOportunidade.PENDENTE) {
      throw new HttpException(
        'Apenas oportunidades pendentes podem ser finalizadas!',
        HttpStatus.BAD_REQUEST,
      );
    }
    oportunidade.status = StatusOportunidade.FINALIZADO;
    await this.oportunidadeRepository.save(oportunidade);
    this.processarOportunidade(oportunidade);
    return oportunidade;
  }

  //cancela uma oportunidade
  async cancelar(id: number) {
    const oportunidade = await this.oportunidadeRepository.findOneBy({ id });

    if (!oportunidade) {
      throw new HttpException(
        'Oportunidade não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }
    //também verifica se a oportunidade está pendente, pois somente oportunidades pendentes podem ser canceladas
    if (oportunidade.status !== StatusOportunidade.PENDENTE) {
      throw new HttpException(
        'Apenas oportunidades pendentes podem ser canceladas!',
        HttpStatus.BAD_REQUEST,
      );
    }
    oportunidade.status = StatusOportunidade.CANCELADO;
    await this.oportunidadeRepository.save(oportunidade);
    this.processarOportunidade(oportunidade);
    return oportunidade;
  }

  // Métodos de cadastro, atualização e exclusão
  async cadastrar(
    oportunidade: OportunidadeEntity,
  ): Promise<OportunidadeEntity> {
    const novaOportunidade =
      await this.oportunidadeRepository.save(oportunidade);
    this.processarOportunidade(novaOportunidade);
    return novaOportunidade;
  }

  async atualizar(
    oportunidade: OportunidadeEntity,
  ): Promise<OportunidadeEntity> {
    if (!oportunidade.id || oportunidade.id <= 0) {
      throw new HttpException(
        'O ID da oportunidade é inválido!',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this.buscarPorId(oportunidade.id);
    const oportunidadeAtualizada =
      await this.oportunidadeRepository.save(oportunidade);
    this.processarOportunidade(oportunidadeAtualizada);
    return oportunidadeAtualizada;
  }

  async deletar(id: number): Promise<void> {
    await this.buscarPorId(id);
    await this.oportunidadeRepository.delete(id);
  }
}
