import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';
import { UserORMRepository } from '../ports/user.respository';
import { UserController } from 'src/adapters/controllers/user.controller';
import { UserService } from '../services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])], 
  controllers: [UserController],
  providers: [
    UserService,
    { provide: 'UserRepository', useClass: UserORMRepository }, 
  ],
  exports: ['UserRepository'], 
})
export class UserModule {}
