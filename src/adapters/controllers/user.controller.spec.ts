import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from '../../application/services/user.service';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            getAllUsers: jest
              .fn()
              .mockResolvedValue([
                { id: '123', name: 'John Doe', email: 'john@example.com' },
              ]),
            createUser: jest.fn().mockResolvedValue({
              id: '123',
              name: 'John Doe',
              email: 'john@example.com',
            }),
            delete: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('deve retornar todas as contas', async () => {
    expect(await controller.findAll()).toEqual([
      { id: '123', name: 'John Doe', email: 'john@example.com' },
    ]);
    expect(service.getAllUsers).toHaveBeenCalled();
  });

  it('deve criar uma nova conta', async () => {
    const newUser = {
      name: 'John Doe',
      email: 'john@example.com',
      password: '123',
    };
    expect(await controller.create(newUser)).toEqual({
      id: '123',
      name: 'John Doe',
      email: 'john@example.com',
    });
    expect(service.createUser).toHaveBeenCalledWith(newUser);
  });

 
});
