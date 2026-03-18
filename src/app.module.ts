import { Cliente } from './Clientes/entities/cliente.entity';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './Clientes/cliente.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: "root",
      password: "root",
      database: "db_sistemacrm",
      autoLoadEntities: true,
      synchronize: true,
   
    }),
  
    ClienteModule,
    
    
  ],
}) 
export class AppModule {}