import React from 'react';

const CheckboxInput = ({ name, checked, onChange }) => (
  <input 
    type="checkbox" 
    name={name} 
    checked={checked} 
    onChange={onChange} 
  />
);

export default CheckboxInput;
