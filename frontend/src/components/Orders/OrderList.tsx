import React from 'react';
import { Order } from '../../types/Order';
import OrderItem from './OrderItem';

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  return (
    <div>
      <h2>Order List</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <OrderItem order={order} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;