import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AccountEntity } from "src/domain/entities/account.entity";
import { Repository } from "typeorm";
import { AccountRepository } from "./account-abs.repository";

@Injectable()
export class AccountORMRepository implements AccountRepository {
    constructor(
        @InjectRepository(AccountEntity)
      private accountRepository: Repository<AccountEntity>
      ){}
    
    async save(account:AccountEntity){
        return this.accountRepository.save(account);
      }
    
}
