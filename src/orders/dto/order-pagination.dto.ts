import { IsEnum, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/common';
import { OrderStatus, OrderStatusList } from '../enum/orders.enum';

export class OrderPaginationDto extends PaginationDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Posible status values are: ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
