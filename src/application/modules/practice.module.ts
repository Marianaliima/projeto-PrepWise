import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TreinoEntity } from '../entities/treino.entity';
import { TreinoService } from '../services/treino.service';
import { TreinoController } from '../controllers/treino.controller';
import { TreinoRepository } from '../ports/treino.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TreinoEntity])],
  controllers: [TreinoController],
  providers: [TreinoService, TreinoRepository],
})
export class TreinoModule {}
