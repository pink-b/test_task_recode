import React from 'react';

interface DeleteButtonProps {
  onDelete: (id: number) => void;
  id: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, id }) => {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <div>
      <button onClick={handleDeleteClick}>Удалить</button>
    </div>
  );
};

export default DeleteButton;