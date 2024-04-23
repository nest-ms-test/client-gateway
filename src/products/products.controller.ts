import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common/dto';
import { NATS_SERVICE } from 'src/config';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(NATS_SERVICE) private readonly serviceClient: ClientProxy,
  ) {}

  @Post()
  async cretaeProduct(@Body() createProductDto: CreateProductDto) {
    try {
      return await firstValueFrom(
        this.serviceClient.send({ cmd: 'create-product' }, createProductDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async getAllProducts(@Query() paginationDto: PaginationDto) {
    try {
      return await firstValueFrom(
        this.serviceClient.send({ cmd: 'get-products' }, paginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.serviceClient.send({ cmd: 'get-product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      return await firstValueFrom(
        this.serviceClient.send(
          { cmd: 'update-product' },
          { id: Number(id), ...updateProductDto },
        ),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    try {
      const product = await firstValueFrom(
        this.serviceClient.send({ cmd: 'delete-product' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
