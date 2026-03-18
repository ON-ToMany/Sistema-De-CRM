import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cliente } from "./entities/cliente.entity";
import { ClienteService } from "./services/cliente.service";
import { ClienteController } from "./controllers/cliente.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Cliente])],
    providers: [ClienteService],
    controllers: [ClienteController],
    exports: [TypeOrmModule]
})
export class ClienteModule {}