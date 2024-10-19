import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from '../../application/services/account.service';

describe('AccountController', () => {
  let controller: AccountController;
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
      providers: [
        {
          provide: AccountService,
          useValue: {
            getAllAccounts: jest
              .fn()
              .mockResolvedValue([
                { id: '123', name: 'John Doe', email: 'john@example.com' },
              ]),
            createAccount: jest.fn().mockResolvedValue({
              id: '123',
              name: 'John Doe',
              email: 'john@example.com',
            }),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<AccountController>(AccountController);
    service = module.get<AccountService>(AccountService);
  });

  it('deve retornar todas as contas', async () => {
    expect(await controller.findAll()).toEqual([
      { id: '123', name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(service.getAllAccounts).toHaveBeenCalled();
  });

  it('deve criar uma nova conta', async () => {
    const newAccount = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123',
    };
    expect(await controller.createAccount(newAccount)).toEqual({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(service.createAccount).toHaveBeenCalledWith(newAccount);
  });

 
});
