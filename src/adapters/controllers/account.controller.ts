import { Body, Controller, Post } from '@nestjs/common';
import { AccountService } from 'src/application/services/account.service';

@Controller('account')
export class AccountController {
    constructor(private readonly accountService:  AccountService) {}

    @Post()
    createAccount(
        @Body('login') login: string,
        @Body('password') password: string
    ) {
        return this.accountService.createAccount(
            login,
            password
        )
    }
} 
