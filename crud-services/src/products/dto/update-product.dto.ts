import { CreateProductDto } from './create-product.dto';

export class UpdateProductDto {
  product: CreateProductDto;
  id: number;
}
