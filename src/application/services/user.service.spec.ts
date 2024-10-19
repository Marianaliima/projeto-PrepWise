import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserORMRepository } from '../ports/user.respository';
import {
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '../../interfaces/dtos/user.dto';
import { v4 as uuidv4 } from 'uuid';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserORMRepository;

  const mockUserRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    remove: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UserRepository',
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserORMRepository>('UserRepository');
  });

  it('should create a user', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'securePassword',
    };
    const newUser = {
      ...createUserDto,
      id: uuidv4(),
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);
    mockUserRepository.create.mockReturnValue(newUser);
    mockUserRepository.save.mockResolvedValue(newUser);

    const result = await userService.createUser(createUserDto);

    expect(result).toHaveProperty('id');
    expect(result.email).toEqual(createUserDto.email);
    expect(result.name).toEqual(createUserDto.name);
    expect(result.password).toEqual(createUserDto.password);
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(
      createUserDto.email,
    );
    expect(mockUserRepository.create).toHaveBeenCalledWith({
      ...createUserDto,
      id: expect.any(String),
    });
    expect(mockUserRepository.save).toHaveBeenCalledWith(newUser);
  });

  it('should throw ConflictException if email already exists', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: 'securePassword',
    };

    mockUserRepository.findByEmail.mockResolvedValue(createUserDto);

    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      ConflictException,
    );
  });

  it('should throw BadRequestException if password is missing', async () => {
    const createUserDto: CreateUserDto = {
      email: 'test@example.com',
      name: 'Test User',
      password: '',
    };

    await expect(userService.createUser(createUserDto)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should get a user by ID', async () => {
    const userId = uuidv4();
    const user = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      password: 'securePassword',
    };

    mockUserRepository.findOne.mockResolvedValue(user);

    const result = await userService.getUserById(userId);

    expect(result.id).toEqual(userId);
    expect(result.email).toEqual(user.email);
    expect(result.name).toEqual(user.name);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);
  });

  it('should throw NotFoundException if user not found', async () => {
    const userId = uuidv4();

    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(userService.getUserById(userId)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should update a user', async () => {
    const userId = uuidv4();
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };
    const user = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      password: 'securePassword',
    };

    mockUserRepository.findOne.mockResolvedValue(user);
    mockUserRepository.save.mockResolvedValue({ ...user, ...updateUserDto });

    const result = await userService.updateUser(userId, updateUserDto);

    expect(result.name).toEqual(updateUserDto.name);
    expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);
    expect(mockUserRepository.save).toHaveBeenCalledWith({
      ...user,
      ...updateUserDto,
    });
  });

  it('should throw NotFoundException when updating a user that does not exist', async () => {
    const userId = uuidv4();
    const updateUserDto: UpdateUserDto = {
      name: 'Updated User',
    };

    mockUserRepository.findOne.mockResolvedValue(null);

    await expect(userService.updateUser(userId, updateUserDto)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('should delete a user', async () => {
    const userId = uuidv4();
    const user = {
      id: userId,
      email: 'test@example.com',
      name: 'Test User',
      password: 'securePassword',
    };

    mockUserRepository.findOne.mockResolvedValue(user);
    mockUserRepository.remove.mockResolvedValue(undefined);

    await userService.deleteUser(userId);

    expect(mockUserRepository.findOne).toHaveBeenCalledWith(userId);
    expect(mockUserRepository.remove).toHaveBeenCalledWith(userId);
  });

//   it('should throw NotFoundException when deleting a user that does not exist', async () => {
//     const userId = uuidv4();

//     mockUserRepository.findOne.mockResolvedValue(null);

//     await expect(userService.deleteUser(userId)).rejects.toThrow(
//       NotFoundException,
//     );
//   });

  it('should get all users', async () => {
    const users = [
      {
        id: uuidv4(),
        email: 'test1@example.com',
        name: 'User One',
        password: 'password1',
      },
      {
        id: uuidv4(),
        email: 'test2@example.com',
        name: 'User Two',
        password: 'password2',
      },
    ];

    mockUserRepository.findAll.mockResolvedValue(users);

    const result = await userService.getAllUsers();

    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining(users));
  });
});
