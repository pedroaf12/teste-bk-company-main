import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const DateRangePicker: React.FC<{ onChange: (start: Date, end: Date) => void }> = ({ onChange }) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  const handleFilter = () => {
    if (startDate && endDate) {
      onChange(new Date(startDate), new Date(endDate));
    }
  };

  return (
    <div className="date-range-picker">
      <div className="date-input-group">
        <label>Data Inicial</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="date-input-group">
        <label>Data Final</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <button className="filter-button" onClick={handleFilter}>
        <FiSearch /> Filtrar
      </button>
    </div>
  );
};

export default DateRangePicker;