import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';
import { ViewProductDto } from './dto/view-product.dto';

interface ProductsService {
  findOneProduct(data: { id: number }): Observable<ViewProductDto>;
  addNewProduct(data: CreateProductDto): Observable<ViewProductDto>;
  updateProduct(data: {
    product: CreateProductDto;
    id: number;
  }): Observable<ViewProductDto>;
  deleteProduct(data: { id: number }): Observable<any>;
}

@Injectable()
export class ProductService implements OnModuleInit {
  private productsService: ProductsService;

  constructor(@Inject('CRUD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductsService>('CrudService');
  }

  findOneProduct(id: number): Observable<ViewProductDto> {
    return this.productsService.findOneProduct({ id: id });
  }

  addNewProduct(data: CreateProductDto): Observable<ViewProductDto> {
    return this.productsService.addNewProduct({
      title: data.title,
      price: data.price,
      description: data.description,
      category: data.category,
      image: data.image,
    });
  }

  updateProduct(
    data: CreateProductDto,
    id: number,
  ): Observable<ViewProductDto> {
    return this.productsService.updateProduct({
      product: data,
      id: id,
    });
  }

  deleteProduct(id: number): Observable<string> {
    return this.productsService.deleteProduct({ id: id });
  }
}
