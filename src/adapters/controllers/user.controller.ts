import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../../application/services/user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  UserDto,
} from '../../interfaces/dtos/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.getUserById(id);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    return this.userService.getAllUsers();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
