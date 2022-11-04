import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { ViewUserDto } from './dto/view-user.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  @ApiParam({ name: 'id' })
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOneUser(id);
  }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiBearerAuth('JWT-auth')
  addNewUser(@Body() newUser: CreateUserDto) {
    return this.usersService.addNewUser(newUser);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  updateUser(@Body() updatedUser: ViewUserDto) {
    return this.usersService.updateUser(updatedUser);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  @ApiBearerAuth('JWT-auth')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }
}
