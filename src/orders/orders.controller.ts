import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto, OrderPaginationDto, StatusDto } from './dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly serviceClient: ClientProxy,
  ) {}

  @Post()
  async cretaeOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(
        this.serviceClient.send({ cmd: 'create-order' }, createOrderDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  async getAllOrders(@Query() orderPaginationDto: OrderPaginationDto) {
    try {
      return await firstValueFrom(
        this.serviceClient.send({ cmd: 'get-orders' }, orderPaginationDto),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get(':id')
  async getOrder(@Param('id', ParseUUIDPipe) id: string) {
    try {
      const product = await firstValueFrom(
        this.serviceClient.send({ cmd: 'get-order' }, { id }),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Patch(':id')
  async changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() statusDto: StatusDto,
  ) {
    try {
      const product = await firstValueFrom(
        this.serviceClient.send(
          { cmd: 'change-order-status' },
          { id, ...statusDto },
        ),
      );
      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
