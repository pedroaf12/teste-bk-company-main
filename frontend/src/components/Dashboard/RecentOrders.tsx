import React, { useEffect, useState } from 'react';
import { Order } from '../../types/Order';
import { orderService } from '../../services/orderService';

const RecentOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      const recentOrders = await orderService.getRecentOrders();
      setOrders(recentOrders);
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="section">
      <div className="section-header">
        <div>
          <h2>Pedidos Recentes</h2>
          <p className="section-subtitle">Últimos pedidos recebidos via webhook</p>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Pedido</th>
            <th>Cliente</th>
            <th>Data</th>
            <th style={{ textAlign: 'right' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.buyerName}</td>
              <td>{new Date(order.createdAt).toLocaleDateString('pt-BR')}</td>
              <td style={{ textAlign: 'right' }}>R$ {order.totalAmount.toFixed(2).replace('.', ',')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentOrders;