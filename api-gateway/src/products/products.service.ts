import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

interface ProductsService {
  findOneProduct(data: { id: number; token: string }): Observable<any>;
  addNewProduct(data: {
    newProduct: CreateProductDto;
    token: string;
  }): Observable<any>;
  updateProduct(data: {
    updateProduct: CreateProductDto;
    token: string;
  }): Observable<any>;
  deleteProduct(data: { id: number; token: string }): Observable<any>;
}

@Injectable()
export class ProductService implements OnModuleInit {
  private productsService: ProductsService;

  constructor(@Inject('CRUD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductsService>('CrudService');
  }

  findOneProduct(id, jwt: string): Observable<string> {
    return this.productsService.findOneProduct({ id: id, token: jwt });
  }

  addNewProduct(data: CreateProductDto, jwt: string): Observable<string> {
    return this.productsService.addNewProduct({ newProduct: data, token: jwt });
  }

  updateProduct(data: CreateProductDto, jwt: string): Observable<string> {
    return this.productsService.updateProduct({
      updateProduct: data,
      token: jwt,
    });
  }

  deleteProduct(id: number, jwt: string): Observable<string> {
    return this.productsService.deleteProduct({ id: id, token: jwt });
  }
}
