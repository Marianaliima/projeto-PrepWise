import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { AccountEntity } from './account.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToOne(() => AccountEntity, (account) => account.user)
  @Exclude() 
  account?: AccountEntity;
}
