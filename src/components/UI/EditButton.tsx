import React from 'react';

interface EditButtonProps {
  onClick: (id: number) => void;
  id: number;
}

const EditButton: React.FC<EditButtonProps> = ({ onClick, id }) => {
  const handleEditClick = () => {
    onClick(id);
  };

  return (
    <div>
      <button onClick={handleEditClick}>
        Редактировать
      </button>
    </div>
  );
};

export default EditButton;