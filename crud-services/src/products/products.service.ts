import { Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from './dto/IProduct';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new RpcException('Product not found');
    }
    return product;
  }

  async addNewProduct(data: IProduct): Promise<string> {
    const product = new Product();
    product.title = data.title;
    product.tenantId = data.tenantId;
    product.description = data.description;
    product.category = data.category;
    product.image = data.image;
    product.price = data.price;

    await this.productsRepository.save(product);
    return 'Success';
  }

  async updateProduct(data: IProduct, id: number): Promise<Product> {
    await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        title: data.title,
        tenantId: data.tenantId,
        description: data.description,
        category: data.category,
        image: data.image,
        price: data.price,
      })
      .where({
        id: id,
      })
      .returning('*')
      .execute();

    return await this.findOne(id);
  }

  async deleteProduct(data: number) {
    await this.productsRepository.delete({ id: data });
    return { response: 'Success' };
  }
}
