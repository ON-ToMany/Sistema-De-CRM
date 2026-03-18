import { Cliente } from './Clientes/entities/cliente.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Usuario } from './usuario/entities/usuario.entity';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

import { CategoriaEntity } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './Clientes/cliente.module';
import { OportunidadeEntity } from './oportunidade/entities/oportunidade.entity';
import { OportunidadeModule } from './oportunidade/oportunidade.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_sistemacrm',
      entities: [Usuario, Cliente, CategoriaEntity, OportunidadeEntity],
      synchronize: true,
    }),
    UsuarioModule,
    AuthModule,
    ClienteModule,
    OportunidadeModule,
    CategoriaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
