import { Module } from '@nestjs/common';
import { OportunidadeService } from './services/oportunidade.service';
import { OportunidadeController } from './controllers/oportunidade.controller';
import { OportunidadeEntity } from './entities/oportunidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { ClienteModule } from '../cliente/cliente.module';
import { UsuarioModule } from '../usuario/usuario.module';

@Module({
  imports: [TypeOrmModule.forFeature([OportunidadeEntity]),
    ClienteModule,
    UsuarioModule
  ],
  controllers: [OportunidadeController],
  providers: [OportunidadeService],
})
export class OportunidadeModule {}
