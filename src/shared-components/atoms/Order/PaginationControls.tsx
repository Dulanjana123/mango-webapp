import React from 'react';
import Button from './Button';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const PaginationControls = ({
  currentPage,
  totalPages,
  onPageChange,
  onPageSizeChange,
}: PaginationControlsProps) => (
  <div className="pagination-controls">
    <span>Rows per page:</span>
    <select
      onChange={(e) => onPageSizeChange(Number(e.target.value))}
      className="form-select mx-2"
    >
      {[5, 10, 20].map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
    <Button
      label="Previous"
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 1}
    />
    <span>
      Page {currentPage} of {totalPages}
    </span>
    <Button
      label="Next"
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages}
    />
  </div>
);

export default PaginationControls;
