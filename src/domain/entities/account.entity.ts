import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('accounts')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  createdAt: Date;
  
  @Column()
  userId: string; 

  @OneToOne(() => UserEntity, (user) => user.account)
  @JoinColumn({ name: 'userId' }) 
  user: UserEntity;
}