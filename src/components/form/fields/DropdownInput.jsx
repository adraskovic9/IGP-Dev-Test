import React from 'react';
import { ErrorMessage } from 'formik';

const DropdownInput = ({ field, form, label, options, ...props }) => (
    <div className='inputContainer'>
        <label htmlFor={field.name}>{label}</label>
        <select {...field} {...props}>
            {options.map(option => <option key={option.value} value={option.value}>{option.name}</option>)}
        </select>
        <ErrorMessage name={field.name} component="div" className="error" />
    </div>
);

export default DropdownInput;
