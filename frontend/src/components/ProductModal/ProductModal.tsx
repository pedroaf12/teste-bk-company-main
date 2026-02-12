import React, { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (product: { id: string; name: string; price: number }) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [productData, setProductData] = useState({ id: '', name: '', price: 0 });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(productData);
    setProductData({ id: '', name: '', price: 0 });
  };

  const handleClose = () => {
    setProductData({ id: '', name: '', price: 0 });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Produto</h2>
          <FiX className="close-icon" onClick={handleClose} />
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="product-id">ID do Produto</label>
            <input
              id="product-id"
              type="text"
              value={productData.id}
              onChange={(e) => setProductData({ ...productData, id: e.target.value })}
              required
              placeholder="Ex: SKU-001"
              autoFocus
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-name">Nome do Produto</label>
            <input
              id="product-name"
              type="text"
              value={productData.name}
              onChange={(e) => setProductData({ ...productData, name: e.target.value })}
              required
              placeholder="Ex: Camiseta Básica"
            />
          </div>
          <div className="form-group">
            <label htmlFor="product-price">Preço de Venda (R$)</label>
            <input
              id="product-price"
              type="number"
              step="0.01"
              min="0"
              value={productData.price}
              onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
              required
              placeholder="Ex: 49.90"
            />
          </div>
          <div className="modal-actions">
            <button type="button" className="cancel-button" onClick={handleClose}>
              Cancelar
            </button>
            <button type="submit" className="submit-button">
              Criar Produto
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;