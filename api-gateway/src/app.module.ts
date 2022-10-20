import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'CRUD_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'crud',
          protoPath: join(__dirname, './crud.proto'),
        },
      },
    ]),
    ProductsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
