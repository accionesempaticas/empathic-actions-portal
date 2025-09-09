// Estructura de áreas y grupos basada en la organización
export const areasAndGroups = {
  'Coordinación Nacional': [
    'Gestión del Talento',
    'Comunicaciones',
    'Intervención Social',
    'Tecnología e Innovación',
    'Fondos y Alianzas'
  ],
  'SkillUp 360': [
    'Gestión del Talento',
    'Comunicaciones', 
    'Intervención Social',
    'Tecnología e Innovación',
    'Fondos y Alianzas'
  ],
  'Coordinación Programas': [
    'Sostengo',
    'Aulas Empáticas',
    'Finanzas Inclusivas'
  ],
  'Mentores Empáticos': [
    'Sostengo',
    'Aulas Empáticas', 
    'Finanzas Inclusivas'
  ],
  'Coordinación Regional': [
    'Región Amazonas',
    'Región Áncash',
    'Región Apurímac',
    'Región Arequipa',
    'Región Ayacucho',
    'Región Cajamarca',
    'Región Cusco',
    'Región Huancavelica',
    'Región Huánuco',
    'Región Ica',
    'Región Junín',
    'Región La Libertad',
    'Región Lambayeque',
    'Región Lima',
    'Región Loreto',
    'Región Madre de Dios',
    'Región Moquegua',
    'Región Pasco',
    'Región Piura',
    'Región Puno',
    'Región San Martín',
    'Región Tacna',
    'Región Tumbes',
    'Región Ucayali'
  ],
  'Líderes Que Impactan': [
    'Región Amazonas',
    'Región Áncash',
    'Región Apurímac',
    'Región Arequipa',
    'Región Ayacucho',
    'Región Cajamarca',
    'Región Cusco',
    'Región Huancavelica',
    'Región Huánuco',
    'Región Ica',
    'Región Junín',
    'Región La Libertad',
    'Región Lambayeque',
    'Región Lima',
    'Región Loreto',
    'Región Madre de Dios',
    'Región Moquegua',
    'Región Pasco',
    'Región Piura',
    'Región Puno',
    'Región San Martín',
    'Región Tacna',
    'Región Tumbes',
    'Región Ucayali'
  ],
  'Aliados Empáticos': [
    'Expertos',
    'Embajadores'
  ]
};

// Función para obtener las áreas disponibles
export const getAreas = () => {
  return Object.keys(areasAndGroups);
};

// Función para obtener los grupos de un área específica
export const getGroupsByArea = (area) => {
  return areasAndGroups[area] || [];
};

// Plantillas de carta por área
export const letterTemplatesByArea = {
  'Coordinación Nacional': 'coordinacion-nacional',
  'SkillUp 360': 'skillup-360',
  'Coordinación Programas': 'coordinacion-programas', 
  'Mentores Empáticos': 'mentores-empaticos',
  'Coordinación Regional': 'coordinacion-regional',
  'Líderes Que Impactan': 'lideres-que-impactan',
  'Aliados Empáticos': 'aliados-empaticos'
};

export default areasAndGroups;