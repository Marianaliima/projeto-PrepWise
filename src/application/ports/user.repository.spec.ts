import { Test, TestingModule } from '@nestjs/testing';
import { UserORMRepository } from '../ports/user.respository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/domain/entities/user.entity';

describe('UserORMRepository', () => {
  let userRepository: UserORMRepository;
  let mockRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserORMRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
            create: jest.fn(),
            findByEmail: jest.fn(),
          },
        },
      ],
    }).compile();

    userRepository = module.get<UserORMRepository>(UserORMRepository);
    mockRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('should find a user by ID', async () => {
    const user = new UserEntity();
    user.id = '1';
    user.email = 'test@example.com';

    mockRepository.findOne.mockResolvedValue(user);

    const result = await userRepository.findOne('1');

    expect(result).toEqual(user);
    expect(mockRepository.findOne).toHaveBeenCalledWith('1');
  });

  it('should save a new user', async () => {
    const user = new UserEntity();
    user.email = 'test@example.com';

    mockRepository.save.mockResolvedValue(user);

    const result = await userRepository.save(user);

    expect(result).toEqual(user);
    expect(mockRepository.save).toHaveBeenCalledWith(user);
  });

  // Adicione mais testes conforme necessário
});
