import * as yup from 'yup';

export const createValidationSchema = (fields, intl) => {
    let schema = {};

    fields.forEach(field => {
        let validator = yup.string();

        if (field.required) {
            const requiredMessage = intl.formatMessage({ id: 'This field is required', defaultMessage: 'This field is required' });
            validator = validator.required(requiredMessage);
        }

        field.validators.forEach(val => {
            const message = intl.formatMessage({ id: val.invalid_message, defaultMessage: val.invalid_message });

            switch (val.key) {
                case 'minLength':
                    validator = validator.min(val.parameters.targetLength, message);
                    break;
                case 'maxLength':
                    validator = validator.max(val.parameters.targetLength, message);
                    break;
                case 'regex':
                    validator = validator.matches(new RegExp(val.parameters.regex, val.parameters.modifiers), message);
                    break;
                case 'emailValidator':
                    validator = validator.email(message);
                    break;
                case 'matchesField':
                    // Add a custom test for matching another field
                    validator = validator.test('matches-field', message, function(value) {
                        // `this` is the Yup context, which can resolve other field values
                        const otherFieldValue = this.parent[val.parameters.target];
                        return value === otherFieldValue;
                    });
                    break;
                // Add other validator conditions here
            }
        });

        schema[field.code] = validator;
    });

    return yup.object().shape(schema);
};
