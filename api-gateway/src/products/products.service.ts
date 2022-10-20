import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateProductDto } from './dto/create-product.dto';

interface ProductsService {
  findOneProduct(data: { id: number }): Observable<any>;
  addNewProduct(data: { newProduct: CreateProductDto }): Observable<any>;
  updateProduct(data: { updateProduct: CreateProductDto }): Observable<any>;
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

  findOneProduct(id): Observable<string> {
    return this.productsService.findOneProduct({ id: id });
  }

  addNewProduct(data: CreateProductDto): Observable<string> {
    return this.productsService.addNewProduct({ newProduct: data });
  }

  updateProduct(data: CreateProductDto): Observable<string> {
    return this.productsService.updateProduct({ updateProduct: data });
  }

  deleteProduct(id: number): Observable<string> {
    return this.productsService.deleteProduct({ id: id });
  }
}
