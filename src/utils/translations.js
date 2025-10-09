// Traducciones de mensajes de validación y error
export const translations = {
    // Mensajes de validación Laravel
    'The email has already been taken.': 'El correo electrónico ya está registrado.',
    'The document number has already been taken.': 'El número de documento ya está registrado.',
    'The group field must be a string.': 'El campo grupo debe ser una cadena de texto.',
    'The group field is required.': 'El campo grupo es obligatorio.',

    // Mensajes generales
    'Validation failed': 'Error de validación',
    'Invalid credentials': 'Credenciales inválidas',
    'Access denied': 'Acceso denegado',
    'Email is required': 'El correo electrónico es obligatorio',
    'Password is required': 'La contraseña es obligatoria',

    // Campos en inglés a español
    'first_name': 'nombres',
    'last_name': 'apellidos',
    'email': 'correo electrónico',
    'document_number': 'número de documento',
    'phone_number': 'número de teléfono',
    'gender': 'género',
    'group': 'grupo',
    'area': 'área'
};

export const translateMessage = (message) => {
    if (!message) return message;

    // Buscar traducción exacta
    if (translations[message]) {
        return translations[message];
    }

    // Buscar y reemplazar patrones
    let translatedMessage = message;
    Object.keys(translations).forEach(key => {
        if (translatedMessage.includes(key)) {
            translatedMessage = translatedMessage.replace(key, translations[key]);
        }
    });

    return translatedMessage;
};

export const translateValidationErrors = (errors) => {
    if (!errors || typeof errors !== 'object') return errors;

    const translatedErrors = {};

    Object.keys(errors).forEach(field => {
        const translatedField = translations[field] || field;
        const messages = Array.isArray(errors[field]) ? errors[field] : [errors[field]];

        translatedErrors[translatedField] = messages.map(message => translateMessage(message));
    });

    return translatedErrors;
};