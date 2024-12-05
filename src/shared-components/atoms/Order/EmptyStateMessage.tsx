import React from 'react';

interface EmptyStateMessageProps {
  message: string;
}

const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({ message }) => {
  return <div>{message}</div>;
};

export default EmptyStateMessage;
