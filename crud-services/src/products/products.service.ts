import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IProduct } from './interfaces/IProduct';

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

  async addNewProduct(data: CreateProductDto): Promise<IProduct> {
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

  async updateProduct(data: UpdateProductDto): Promise<IProduct> {
    await this.productsRepository
      .createQueryBuilder()
      .update(Product)
      .set({
        title: data.product.title,
        description: data.product.description,
        category: data.product.category,
        image: data.product.image,
        price: data.product.price,
      })
      .where({
        id: data.id,
      })
      .returning('*')
      .execute();

    return await this.findOne(data.id);
  }

  async deleteProduct(data: number) {
    await this.productsRepository.delete({ id: data });
    return { response: 'Success' };
  }
}
