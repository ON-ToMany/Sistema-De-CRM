import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { CategoriaEntity } from "../../categoria/entities/categoria.entity";
import { Cliente } from "../../Clientes/entities/cliente.entity";
import { OportunidadeEntity } from "../../oportunidade/entities/oportunidade.entity";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: this.configService.get<string>('DB_HOST'),
            port: Number(this.configService.get<number>('DB_PORT')),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASS'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [CategoriaEntity, Cliente, OportunidadeEntity, Usuario],
            synchronize: true,
    };
  }
}