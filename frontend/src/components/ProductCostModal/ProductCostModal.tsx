import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';

interface ProductCostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (productId: string, cost: number) => void;
  product: { id: string; name: string; currentCost: number } | null;
}

const ProductCostModal: React.FC<ProductCostModalProps> = ({ isOpen, onClose, onSubmit, product }) => {
  const [cost, setCost] = useState<string>('');

  useEffect(() => {
    if (product) {
      setCost(product.currentCost.toString());
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const costValue = parseFloat(cost);
    if (!isNaN(costValue) && costValue >= 0) {
      onSubmit(product.id, costValue);
      handleClose();
    }
  };

  const handleClose = () => {
    setCost('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Editar Custo de Produto</h2>
          <FiX className="close-icon" onClick={handleClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product-name-display">Produto</label>
            <input
              id="product-name-display"
              type="text"
              value={product.name}
              disabled
              style={{ backgroundColor: '#f3f4f6', cursor: 'not-allowed' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-cost">Custo (R$)</label>
            <input
              id="product-cost"
              type="number"
              step="0.01"
              min="0"
              value={cost}
              onChange={(e) => setCost(e.target.value)}
              required
              placeholder="Ex: 49.90"
              autoFocus
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductCostModal;