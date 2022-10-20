import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  addNewUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.addNewUser(createUserDto);
  }

  @Put(':id')
  updateUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.updateUser(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
