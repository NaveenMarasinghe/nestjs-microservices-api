import { ApiProperty } from '@nestjs/swagger';

export class ViewUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  id: number;
}
