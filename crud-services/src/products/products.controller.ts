import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/IProduct';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @GrpcMethod('CrudService', 'FindOneProduct')
  findOne(data: { id: number }): Promise<IProduct> {
    return this.productsService.findOne(data.id);
  }

  @GrpcMethod('CrudService', 'AddNewProduct')
  addNewProduct(data: CreateProductDto): Promise<IProduct> {
    return this.productsService.addNewProduct(data);
  }

  @GrpcMethod('CrudService', 'UpdateProduct')
  updateProduct(data: UpdateProductDto): Promise<IProduct> {
    return this.productsService.updateProduct(data);
  }

  @GrpcMethod('CrudService', 'DeleteProduct')
  deleteProduct(data: { id: number }) {
    return this.productsService.deleteProduct(data.id);
  }
}
