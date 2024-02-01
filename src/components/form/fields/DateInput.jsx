import React from 'react';
import { ErrorMessage } from 'formik';

const DateInput = ({ field, form: { touched, errors }, label, placeholder, ...props }) => (
    <div className='inputContainer'>
        <label htmlFor={field.name}>{label}</label>
        <input type="date" {...field} value={field.value || ""} placeholder={placeholder} {...props} />
        <ErrorMessage name={field.name} component="div" className="error" />
    </div>
);

export default DateInput;
