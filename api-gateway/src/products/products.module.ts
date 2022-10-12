import { Module } from '@nestjs/common';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRUD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'crud',
          protoPath: join(__dirname, '../crud.proto'),
        },
      },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductsModule {}
