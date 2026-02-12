import React from 'react';

interface OrderItemProps {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

const OrderItem: React.FC<OrderItemProps> = ({ productId, name, quantity, unitPrice }) => {
  return (
    <div className="order-item">
      <h3>{name}</h3>
      <p>Product ID: {productId}</p>
      <p>Quantity: {quantity}</p>
      <p>Unit Price: ${unitPrice.toFixed(2)}</p>
      <p>Total: ${(unitPrice * quantity).toFixed(2)}</p>
    </div>
  );
};

export default OrderItem;