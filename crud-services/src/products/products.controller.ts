import { Controller, UseGuards } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { IProduct } from './dto/IProduct';
import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';

export type ProductById = {
  id: number;
};

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('CrudService', 'FindOneProduct')
  findOne(
    data: ProductById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.productsService.findOne(data.id);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'AddNewProduct')
  addNewProduct(
    data: IProduct,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.productsService.addNewProduct(data);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'UpdateProduct')
  updateProduct(
    data: any,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.productsService.updateProduct(data.product, data.id);
  }

  @UseGuards(JwtAuthGuard)
  @GrpcMethod('CrudService', 'DeleteProduct')
  deleteProduct(
    data: ProductById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.productsService.deleteProduct(data.id);
  }
}
