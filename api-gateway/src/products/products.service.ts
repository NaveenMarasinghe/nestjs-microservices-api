import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';

interface ProductsService {
  findOneProduct(data: { id: number }): Observable<any>;
}

@Injectable()
export class ProductService implements OnModuleInit {
  private productsService: ProductsService;

  constructor(@Inject('CRUD_PACKAGE') private client: ClientGrpc) {}

  onModuleInit() {
    this.productsService =
      this.client.getService<ProductsService>('CrudService');
  }

  getProduct(): Observable<string> {
    return this.productsService.findOneProduct({ id: 1 });
  }
}
