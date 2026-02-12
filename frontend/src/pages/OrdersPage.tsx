import React, { useState, useEffect } from 'react';
import { orderService } from '../services/orderService';
import { Order } from '../types/Order';

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await orderService.getAll();
      setOrders(data);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  return (
    <div className="section" style={{ margin: '20px' }}>
      <div className="section-header">
        <h1>Pedidos</h1>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Email</th>
            <th>Total</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyerName}</td>
              <td>{order.buyerEmail}</td>
              <td>R$ {order.totalAmount.toFixed(2)}</td>
              <td>{new Date(order.createdAt).toLocaleString('pt-BR')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;