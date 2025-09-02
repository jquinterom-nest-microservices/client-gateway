import { IsEnum, IsOptional } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/orders.enum';

export class StatusDto {
  @IsOptional()
  @IsEnum(OrderStatusList, {
    message: `Posible status values are: ${OrderStatusList.join(', ')}`,
  })
  status: OrderStatus;
}
