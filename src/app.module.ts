import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OportunidadeEntity } from './oportunidade/entities/oportunidade.entity';
import { OportunidadeModule } from './oportunidade/oportunidade.module';

@Module({ 
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1510',
      database: 'db_sistemacrm',
      entities: [OportunidadeEntity],
      synchronize: true 
    }),
    OportunidadeModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
