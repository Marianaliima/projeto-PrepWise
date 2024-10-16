import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { GenericRepository } from '../ports/generic.repository'; // Repositório genérico
import { UserORMRepository } from '../ports/user.respository';
import { UserController } from 'src/adapters/controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], // Importa a entidade UserEntity
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'UserRepository', useClass: UserORMRepository }, // Injeta o repositório genérico para User
  ],
  exports: ['UserRepository'], // Exporta o serviço para uso em outros módulos
})
export class UserModule {}
