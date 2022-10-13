import { Controller } from '@nestjs/common';
import { GrpcMethod, MessagePattern, Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Metadata, ServerUnaryCall } from '@grpc/grpc-js';
import { IProduct } from './dto/IProduct';

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

  @GrpcMethod('CrudService', 'AddNewProduct')
  addNewProduct(
    data: ProductById,
    metadata: Metadata,
    call: ServerUnaryCall<any, any>,
  ) {
    return this.productsService.addNewProduct();
  }
}
