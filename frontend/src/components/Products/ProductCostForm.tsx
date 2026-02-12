import React, { useState } from 'react';

const ProductCostForm: React.FC<{ onSubmit: (cost: number) => void }> = ({ onSubmit }) => {
  const [cost, setCost] = useState<number>(0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(cost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="cost">Product Cost:</label>
        <input
          type="number"
          id="cost"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ProductCostForm;