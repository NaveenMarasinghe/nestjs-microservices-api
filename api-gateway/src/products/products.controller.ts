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
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  getOneUser(@Param('id', ParseIntPipe) id: number) {
    return this.productService.findOneProduct(id);
  }

  @Post()
  addNewUser(@Body() createUserDto: CreateProductDto) {
    return this.productService.addNewProduct(createUserDto);
  }

  @Put(':id')
  updateUser(@Body() createUserDto: CreateProductDto) {
    return this.productService.updateProduct(createUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
