import { Injectable } from '@nestjs/common';
import { AccountRepository } from '../ports/account-abs.repository';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class AccountService {

    constructor(private readonly accountRepository: AccountRepository){}
createAccount(
    login: string,
    password: string
) {
   return this.accountRepository.save(
       {
           login,
           password,
           id: uuidv4()
       }
    )

}


}
