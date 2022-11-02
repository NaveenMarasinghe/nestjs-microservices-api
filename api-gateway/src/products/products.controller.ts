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
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number, @Headers() header) {
    return this.productService.findOneProduct(id, header.jwt);
  }

  @Post()
  addNewUser(@Body() createUserDto: CreateProductDto, @Headers() header) {
    return this.productService.addNewProduct(createUserDto, header.jwt);
  }

  @Put(':id')
  updateUser(@Body() createUserDto: CreateProductDto, @Headers() header) {
    return this.productService.updateProduct(createUserDto, header.jwt);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number, @Headers() header) {
    return this.productService.deleteProduct(id, header.jwt);
  }
}
