import React from 'react';

interface InputProps {
  value: string;
  onChange: (event : React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const MyInput: React.FC<InputProps> = ({ value, onChange, placeholder }) => {
  return (
    <div>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{marginBottom: 10}}
      />
    </div>
  );
};

export default MyInput;