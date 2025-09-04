import { useForm, useLoading } from '@/hooks';

const PersonaForm = ({ onSubmit, onCancel, initialData = null }) => {
  const { loading, withLoading } = useLoading();
  const { values, handleChange, handleSubmit, errors } = useForm(
    initialData || {
      dni: '',
      first_name: '',
      last_name: '',
      gender: '',
      phone_number: '',
      email: '',
      date_of_birth: '',
      nationality: '',
      family_phone_number: '',
      linkedin: ''
    },
    async (formData) => {
      console.log('Datos del formulario a enviar:', formData); // Debug
      console.log('DNI específicamente:', formData.dni); // Debug específico del DNI
      await withLoading(async () => {
        await onSubmit(formData);
      });
    }
  );

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      {/*       <h2 className="text-2xl font-bold mb-6">
        {initialData ? 'Editar Persona' : 'Nueva Persona'}
      </h2> */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Identification */}
        <div>
          <label htmlFor="dni" className="block text-sm font-medium text-gray-700">
            DNI
          </label>
          <input
            type="text"
            name="dni"
            id="dni"
            value={values.dni ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={8}
            required
          />
        </div>

        {/* Name Fields */}
        <div>
          <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            value={values.first_name ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={50}
            required
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            value={values.last_name ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={50}
            required
          />
        </div>

        {/* Contact Information */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Correo Electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={values.email ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={100}
            required
          />
        </div>

        <div>
          <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
            Número de Teléfono
          </label>
          <input
            type="tel"
            name="phone_number"
            id="phone_number"
            value={values.phone_number ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={15}
          />
        </div>

        {/* Personal Information */}
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
            Género
          </label>
          <select
            name="gender"
            id="gender"
            value={values.gender ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="">Seleccionar género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>

        <div>
          <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700">
            Fecha de Nacimiento
          </label>
          <input
            type="date"
            name="date_of_birth"
            id="date_of_birth"
            value={values.date_of_birth ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700">
            Nacionalidad
          </label>
          <input
            type="text"
            name="nationality"
            id="nationality"
            value={values.nationality ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={30}
          />
        </div>

        {/* Additional Contact */}
        <div>
          <label htmlFor="family_phone_number" className="block text-sm font-medium text-gray-700">
            Teléfono Familiar
          </label>
          <input
            type="tel"
            name="family_phone_number"
            id="family_phone_number"
            value={values.family_phone_number ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={15}
          />
        </div>

        <div>
          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
            Perfil de LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            id="linkedin"
            value={values.linkedin ?? ''}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            maxLength={70}
            placeholder="https://linkedin.com/in/usuario"
          />
        </div>
      </div>

      {errors.submit && (
        <div className="text-red-600 text-sm">{errors.submit}</div>
      )}

      <div className="flex justify-end space-x-3 mt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default PersonaForm; 