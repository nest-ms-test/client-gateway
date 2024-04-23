import { IsEnum } from 'class-validator';
import { OrderStatusList } from '../enum';

export class StatusDto {
  @IsEnum(OrderStatusList, {
    message: `Status must be one of the following values: ${Object.values(OrderStatusList)}`,
  })
  status: OrderStatusList;
}
