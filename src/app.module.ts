import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaEntity } from './categoria/entities/categoria.entity';
import { CategoriaModule } from './categoria/categoria.module';

@Module({ 
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1510',
      database: 'db_sistemacrm',
      entities: [CategoriaEntity],
      synchronize: true 
    }),
    CategoriaModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
