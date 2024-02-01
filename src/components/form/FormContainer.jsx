import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { fetchFormFields } from '../../network/api';
import TextInput from './fields/TextInput';
import DropdownInput from './fields/DropdownInput';
import CheckboxInput from './fields/CheckboxInput';
import { createValidationSchema } from '../../validation/validationSchema';
import { useIntl } from 'react-intl';
import PasswordInput from './fields/PasswordInput';
import DateInput from './fields/DateInput';
import { toast } from 'react-toastify';
import Loader from '../Loader';
const FormContainer = () => {
    const [formFields, setFormFields] = useState([]);
    const [currentStep, setCurrentStep] = useState(1);
    const intl = useIntl();
    const [isLoading, setIsLoading] = useState(true); // New loading state
 
 
    useEffect(() => {
        fetchFormFields().then(data => {
            if (data.record && data.record.fields) {
                setFormFields(data.record.fields.sort((a, b) => a.order - b.order));
                setIsLoading(false); // Indicate loading is complete
            }
        });
    }, []);
 
    if (isLoading) {
        return <Loader/>; 
    }
    const initialValues = formFields.reduce((values, field) => {
        // If defaultValue is provided, use it; otherwise, set to an empty string or a sensible default
        values[field.code] = field.defaultValue !== undefined ? field.defaultValue : '';
        return values;
    }, {});
    console.log(initialValues);
 
 
    const validationSchema = createValidationSchema(formFields, intl);
 
 
    const renderFormField = (field) => {
        const fieldProps = {
            key: field.code,
            name: field.code,
            label: intl.formatMessage({ id: `${field.code}_label` }),
            placeholder: intl.formatMessage({ id: `${field.code}_placeholder` })
        };
 
        switch (field.fieldType) {
            case 'string':
                return <Field component={TextInput} {...fieldProps} />;
            case 'dropdown':
                return <Field component={DropdownInput} options={field.valueList} {...fieldProps} />;
            case 'checkbox':
                return <Field component={CheckboxInput} {...fieldProps} />;
            case 'password':
                return <Field component={PasswordInput} {...fieldProps} />;
            case 'date':
                return <Field component={DateInput} {...fieldProps} />;
            default:
                return null;
        }
    };
 
    const maxStep = Math.max(...formFields.map(field => field.step || 0));
    const currentFields = formFields.filter(field => field.step === currentStep);
    // Assuming you have access to Formik's errors and touched states
    const areCurrentStepFieldsValid = (currentFields, errors) => {
        return currentFields.every(field => {
            // Check if the field has an error; it's valid if there's no error for it
            return !errors[field.code];
        });
    };

    const submitForm = (values) => {
        console.log(values)
        toast.success("Your form is successfully submitted!", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }
 
    return (
        <div className="form-container">
            {/* Inesrt image here its located in src/assets/monkey-circle.png */}
            {/* <img className='monkey-icon' src={require('../../assets/monkey-circle.png')} alt="monkey" /> */}
            <h1 className='center mt-xl'>Register</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitForm}
            >
                {({ isValid, dirty, errors, touched, values }) => (
                    <Form>
                        {currentFields.map(field => renderFormField(field))}
                        {currentStep > 1 && (
                            <button type="button" onClick={() => setCurrentStep(currentStep - 1)}>
                                Previous
                            </button>
                        )}
                        {currentStep < maxStep && (
                            <button
                                type="button"
                                onClick={() => setCurrentStep(currentStep + 1)}
                                disabled={!areCurrentStepFieldsValid(currentFields, errors, touched)}
                            >
                                Next
                            </button>
                        )}
                        {currentStep === maxStep && (
                            <button type="submit" disabled={!isValid || !dirty}>
                                Submit
                            </button>
                        )}
                    </Form>
                )}
            </Formik>
        </div>
    );
};
 
export default FormContainer;