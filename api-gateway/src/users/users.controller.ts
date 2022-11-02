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
  Headers,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number, @Headers() header) {
    return this.usersService.getOneUser(id, header.jwt);
  }

  @Post()
  addNewUser(@Body() newUser: CreateUserDto, @Headers() header) {
    return this.usersService.addNewUser(newUser, header.jwt);
  }

  @Put(':id')
  updateUser(@Body() newUser: CreateUserDto, @Headers() header) {
    return this.usersService.updateUser(newUser, header.jwt);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Headers() header) {
    return this.usersService.deleteUser(id, header.jwt);
  }
}
