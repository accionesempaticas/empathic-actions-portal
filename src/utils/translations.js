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
    'area': 'área',
    'document_type': 'tipo de documento',
    'nationality': 'nacionalidad',
    'date_of_birth': 'fecha de nacimiento',
    'linkedin': 'perfil de LinkedIn',
    'family_phone_number': 'teléfono familiar',
    'formation.academic_degree': 'grado académico',
    'formation.career': 'carrera',
    'formation.formation_center': 'centro de formación',
    'location.country': 'país',
    'location.region': 'región',
    'location.province': 'provincia',
    'location.district': 'distrito',
    'location.address': 'dirección',
    'experience.experience_time': 'años de experiencia',
    'experience.other_volunteer_work': 'participación en otros voluntariados'
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

export const translateFieldName = (fieldName) => {
    return translations[fieldName] || fieldName.replace('_', ' ').replace('.', ' - ');
};

export const translateValidationErrors = (errors) => {
    if (!errors || typeof errors !== 'object') return errors;

    const translatedErrors = {};

    Object.keys(errors).forEach(field => {
        const translatedField = translateFieldName(field);
        const messages = Array.isArray(errors[field]) ? errors[field] : [errors[field]];

        translatedErrors[translatedField] = messages.map(message => translateMessage(message));
    });

    return translatedErrors;
};