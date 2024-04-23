import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common/dto';
import { OrderStatusList } from '../enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Status must be one of the following values: ${Object.values(OrderStatusList)}`,
  })
  status: OrderStatusList;
}
