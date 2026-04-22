import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { CategoriaEntity } from '../../categoria/entities/categoria.entity';
import { OportunidadeEntity } from '../../oportunidade/entities/oportunidade.entity';
import { Cliente } from '../../cliente/entities/cliente.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_sistemacrm',
      entities: [CategoriaEntity, Cliente, OportunidadeEntity, Usuario],
      synchronize: true,
    };
  }
}
