import { Module } from "@nestjs/common";
import { OportunidadeService } from "./services/oportunidade.service";
import { OportunidadeController } from "./controllers/oportunidade.controller";
import { OportunidadeEntity } from "./entities/oportunidade.entity";
import { TypeOrmModule } from "@nestjs/typeorm/dist/typeorm.module";

@Module({
    imports: [TypeOrmModule.forFeature([OportunidadeEntity])],
    controllers: [OportunidadeController],
    providers: [OportunidadeService],
})
export class OportunidadeModule {}
