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
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiBody, ApiParam, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { ViewProductDto } from './dto/view-product.dto';

@Controller('products')
@ApiTags('Products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Get(':id')
  @ApiParam({ name: 'id' })
  getOneUser(
    @Param('id', ParseIntPipe) id: number,
  ): Observable<ViewProductDto> {
    return this.productService.findOneProduct(id);
  }

  @Post()
  @ApiBody({ type: CreateProductDto })
  addNewUser(
    @Body() createProduct: CreateProductDto,
  ): Observable<ViewProductDto> {
    return this.productService.addNewProduct(createProduct);
  }

  @Put(':id')
  @ApiParam({ name: 'id' })
  updateUser(
    @Body() createProductDto: CreateProductDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.productService.updateProduct(createProductDto, id);
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }
}
