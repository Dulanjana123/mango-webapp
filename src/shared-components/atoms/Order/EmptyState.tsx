import React from 'react';

interface EmptyStateProps {
  message: string;
}

const EmptyState = ({ message }: EmptyStateProps) => (
  <div className="empty-state">{message}</div>
);

export default EmptyState;
