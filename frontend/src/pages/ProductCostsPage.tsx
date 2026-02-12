import React, { useState, useEffect } from 'react';
import { productService } from '../services/productService';
import { productCostService } from '../services/productCostService';
import { Product } from '../types/Product';
import { ProductCost } from '../types/ProductCost';

const ProductCostsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [costs, setCosts] = useState<ProductCost[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, costsData] = await Promise.all([
        productService.getAll(),
        productCostService.getAll(),
      ]);
      setProducts(productsData);
      setCosts(costsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleCostChange = async (productId: string, cost: number) => {
    try {
      await productCostService.createOrUpdate({ productId, cost });
      loadData();
    } catch (error) {
      console.error('Error updating cost:', error);
    }
  };

  const getCost = (productId: string): number => {
    return costs.find((c) => c.productId === productId)?.cost || 0;
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Custos de Produtos</h1>
      
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Custo (R$)</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const currentCost = getCost(product.id);
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <input
                    type="number"
                    step="0.01"
                    defaultValue={currentCost}
                    id={`cost-${product.id}`}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      const input = document.getElementById(`cost-${product.id}`) as HTMLInputElement;
                      handleCostChange(product.id, parseFloat(input.value));
                    }}
                  >
                    Salvar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCostsPage;