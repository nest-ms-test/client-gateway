import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { OrderModule } from './orders/orders.module';
import { NatsModule } from './transports/nats.module';

@Module({
  imports: [ProductsModule, OrderModule, NatsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
