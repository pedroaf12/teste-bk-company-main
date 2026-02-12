import React from 'react';
import { Product } from '../../types/Product';

interface ProductItemProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, onAddToCart }) => {
  return (
    <div className="product-item">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <button onClick={() => onAddToCart(product.id)}>Add to Cart</button>
    </div>
  );
};

export default ProductItem;