import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AccountService } from '../../application/services/account.service';
import { AccountDto } from '../../interfaces/dtos/account.dto';
import { CreateAccountDto } from '../../interfaces/dtos/create-account.dto';

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
