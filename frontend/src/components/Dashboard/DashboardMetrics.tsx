import React from 'react';

const DashboardMetrics: React.FC<{ totalOrders: number; totalRevenue: number; totalCost: number; profit: number }> = ({ totalOrders, totalRevenue, totalCost, profit }) => {
  return (
    <div className="metrics-grid">
      <div className="metric-card">
        <div className="metric-label">Lucro</div>
        <div className="metric-value">R$ {profit.toFixed(2).replace('.', ',')}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Faturamento</div>
        <div className="metric-value">R$ {totalRevenue.toFixed(2).replace('.', ',')}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Custo Total</div>
        <div className="metric-value">R$ {totalCost.toFixed(2).replace('.', ',')}</div>
      </div>
      <div className="metric-card">
        <div className="metric-label">Total de Pedidos</div>
        <div className="metric-value">{totalOrders}</div>
      </div>
    </div>
  );
};

export default DashboardMetrics;