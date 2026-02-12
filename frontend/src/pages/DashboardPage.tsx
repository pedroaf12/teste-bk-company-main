import React, { useState, useEffect } from 'react';
import DashboardMetrics from '../components/Dashboard/DashboardMetrics';
import DateRangePicker from '../components/Dashboard/DateRangePicker';
import RecentOrders from '../components/Dashboard/RecentOrders';
import { dashboardService } from '../services/dashboardService';
import { productService } from '../services/productService';
import { productCostService } from '../services/productCostService';
import { DashboardData } from '../types/Dashboard';
import { Product } from '../types/Product';
import { ProductCost } from '../types/ProductCost';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import ProductModal from '../components/ProductModal/ProductModal';
import ProductCostModal from '../components/ProductCostModal/ProductCostModal';

const DashboardPage: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalOrders: 0,
    totalRevenue: 0,
    totalCost: 0,
    profit: 0,
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [costs, setCosts] = useState<ProductCost[]>([]);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showCostModal, setShowCostModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string; currentCost: number } | null>(null);

  const handleDateRangeChange = async (start: Date, end: Date) => {
    try {
      const data = await dashboardService.getData(
        start.toISOString(),
        end.toISOString()
      );
      setDashboardData(data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const loadProducts = async () => {
    try {
      const data = await productService.getAll();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  };

  const loadCosts = async () => {
    try {
      const data = await productCostService.getAll();
      setCosts(data);
    } catch (error) {
      console.error('Error loading costs:', error);
    }
  };

  const getCost = (productId: string): number => {
    return costs.find((c) => c.productId === productId)?.cost || 0;
  };

  const handleCostChange = async (productId: string, cost: number) => {
    try {
      await productCostService.createOrUpdate({ productId, cost });
      loadCosts();
    } catch (error) {
      console.error('Error updating cost:', error);
    }
  };

  const handleCreateProduct = async (product: { id: string; name: string; price: number }) => {
    try {
      await productService.create(product);
      loadProducts();
      setShowProductModal(false);
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Erro ao criar produto. Verifique se o ID já não existe.');
    }
  };

  const handleEditCost = (product: Product) => {
    setSelectedProduct({
      id: product.id,
      name: product.name,
      currentCost: getCost(product.id)
    });
    setShowCostModal(true);
  };

  useEffect(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    handleDateRangeChange(start, end);
    loadProducts();
    loadCosts();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-subtitle">Visão geral do dia sua loja</p>
      </div>
      
      <DateRangePicker onChange={handleDateRangeChange} />
      
      <DashboardMetrics
        totalOrders={dashboardData.totalOrders}
        totalRevenue={dashboardData.totalRevenue}
        totalCost={dashboardData.totalCost}
        profit={dashboardData.profit}
      />
      
      <RecentOrders />

      {/* Seção de Produtos */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2>Produtos</h2>
          </div>
          <button className="add-button" onClick={() => setShowProductModal(true)}>
            <FiPlus /> Novo
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th style={{ textAlign: 'right' }}>Preço</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div>{product.name}</div>
                  <div className="product-id">{product.id}</div>
                </td>
                <td style={{ textAlign: 'right' }}>
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seção de Custos de Produto */}
      <div className="section">
        <div className="section-header">
          <div>
            <h2>Custos de Produto</h2>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th style={{ textAlign: 'right' }}>Custo</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const currentCost = getCost(product.id);
              return (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td style={{ textAlign: 'right', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '10px' }}>
                    R$ {currentCost.toFixed(2).replace('.', ',')}
                    <FiEdit2 
                      className="edit-icon" 
                      onClick={() => handleEditCost(product)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Modal para adicionar produto */}
      <ProductModal
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
        onSubmit={handleCreateProduct}
      />

      {/* Modal para editar custo */}
      <ProductCostModal
        isOpen={showCostModal}
        onClose={() => {
          setShowCostModal(false);
          setSelectedProduct(null);
        }}
        onSubmit={handleCostChange}
        product={selectedProduct}
      />
    </div>
  );
};

export default DashboardPage;