export class CreateProductDto {
  id?: number;
  tenantId: string;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
}
