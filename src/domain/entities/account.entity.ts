import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('accounts') 

export class AccountEntity { @PrimaryGeneratedColumn('uuid')
     id: string; @Column() password: string; @Column() login: string;
}