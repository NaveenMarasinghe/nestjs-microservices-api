import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { IProduct } from './dto/IProduct';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRating } from './entities/productRating.entity';

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
    return product;
  }

  async addNewProduct(): Promise<string> {
    const product = new Product();
    product.title = 'New TShirt';
    product.tenantId = '2';
    product.description = 'New';
    product.category = 'men';
    product.image = 'image';
    product.price = 2000;

    await this.productsRepository.save(product);
    return 'Success';
  }
}
