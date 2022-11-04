import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IProduct } from './dto/IProduct';
import { IProductView } from './dto/IProductView';
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

  async addNewProduct(data: IProduct): Promise<IProductView> {
    const product = new Product();
    product.title = data.title;
    product.description = data.description;
    product.category = data.category;
    product.image = data.image;
    product.price = data.price;

    const res = await this.productsRepository.save(product);

    if (!res) {
      throw new RpcException('Product not found');
    }

    return res;
  }

  async updateProduct(data: IProduct, id: number): Promise<IProductView> {
    await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        title: data.title,
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
