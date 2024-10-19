import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';
import { AccountORMRepository } from '../ports/account.repository';
import { UserORMRepository } from '../ports/user.respository';
import {
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAccountDto } from '../../interfaces/dtos/create-account.dto';

describe('AccountService', () => {
  let service: AccountService;
  let accountRepository: AccountORMRepository;
  let userRepository: UserORMRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccountService,
        {
          provide: 'AccountRepository',
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: 'UserRepository',
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AccountService>(AccountService);
    accountRepository = module.get<AccountORMRepository>('AccountRepository');
    userRepository = module.get<UserORMRepository>('UserRepository');
  });

  describe('createAccount', () => {
    it('should create a new account when user does not exist', async () => {
      const createAccountDto: CreateAccountDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);
      jest
        .spyOn(userRepository, 'create')
        .mockResolvedValue({ id: uuidv4(), ...createAccountDto });
      jest.spyOn(userRepository, 'save').mockResolvedValue(null);
      jest.spyOn(accountRepository, 'create').mockResolvedValue({
        id: uuidv4(),
        createdAt: new Date('2024-01-01T00:00:00Z'),
        userId: '1',
      });
      jest.spyOn(accountRepository, 'save').mockResolvedValue(null);

      const result = await service.createAccount(createAccountDto);

      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createAccountDto.email,
      );
      expect(userRepository.create).toHaveBeenCalled();
      expect(userRepository.save).toHaveBeenCalled();
      expect(accountRepository.create).toHaveBeenCalled();
      expect(accountRepository.save).toHaveBeenCalled();
      expect(result).toEqual({
        id: expect.any(String),
        password: createAccountDto.password,
        email: createAccountDto.email,
        name: createAccountDto.name,
      });
    });

    it('should throw a ConflictException if email is already registered', async () => {
      jest.spyOn(userRepository, 'findByEmail').mockResolvedValue({
        id: uuidv4(),
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      });

      const createAccountDto: CreateAccountDto = {
        email: 'test@example.com',
        name: 'Test User',
        password: 'password123',
      };

      await expect(service.createAccount(createAccountDto)).rejects.toThrow(
        ConflictException,
      );
      expect(userRepository.findByEmail).toHaveBeenCalledWith(
        createAccountDto.email,
      );
    });
  });

  describe('getAllAccounts', () => {
    it('should return an array of account DTOs', async () => {
      const mockAccounts = [
        {
          id: uuidv4(),
          createdAt: new Date('2024-01-01T00:00:00Z'),
          userId: '1',
        },
        {
          id: uuidv4(),
          createdAt: new Date('2024-01-01T00:00:00Z'),
          userId: '1',
        },
      ];
      jest.spyOn(accountRepository, 'findAll').mockResolvedValue(mockAccounts);

      const result = await service.getAllAccounts();

      expect(accountRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(
        mockAccounts.map((account) => ({ id: account.id })),
      );
    });
  });

  describe('deleteAccount', () => {
    it('should delete an account if found', async () => {
      const mockAccount = {
        id: uuidv4(),
        createdAt: new Date('2024-01-01T00:00:00Z'),
        userId: '1',
      };
      jest.spyOn(accountRepository, 'findOne').mockResolvedValue(mockAccount);
      jest.spyOn(accountRepository, 'remove').mockResolvedValue(null);

      await service.deleteAccount(mockAccount.id);

      expect(accountRepository.findOne).toHaveBeenCalledWith(mockAccount.id);
      expect(accountRepository.remove).toHaveBeenCalledWith(mockAccount.id);
    });

  //   it('should throw a NotFoundException if account is not found', async () => {
  //     jest.spyOn(accountRepository, 'findOne').mockResolvedValue(null);

  //     await expect(service.deleteAccount('non-existent-id')).rejects.toThrow(
  //       NotFoundException,
  //     );
  //     expect(accountRepository.findOne).toHaveBeenCalledWith('non-existent-id');
  //   });

    // it('should throw a NotFoundException on other errors', async () => {
    //   jest.spyOn(accountRepository, 'findOne').mockRejectedValue(new Error());

    //   await expect(service.deleteAccount('some-id')).rejects.toThrow(
    //     NotFoundException,
    //   );
    // });
  });
});
