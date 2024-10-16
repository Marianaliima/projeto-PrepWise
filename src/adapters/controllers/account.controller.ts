import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccountService } from 'src/application/services/account.service';
import { Account } from 'src/domain/account';
import { AccountDto } from 'src/interfaces/dtos/account.dto';
import { CreateAccountDto } from 'src/interfaces/dtos/create-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post()
  createAccount(@Body() body: CreateAccountDto) {
    return this.accountService.createAccount(body);
  }

  @Get()
  async findAll(): Promise<AccountDto[]> {
    return this.accountService.getAllAccounts();
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.accountService.deleteAccount(id);
  }
}
