import {useForm, useLoading} from '@/hooks';

const EliminarForm = ({onSubmit, onClose}) => {

    return (
        <>
            <h3 className="text-xl font-semibold text-gray-800 mb-4"></h3>
            <p className="text-gray-600 mb-6">¿Estás seguro de que quieres eliminar este usuario? Esta acción no se
                puede deshacer.</p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onClose}
                    className="px-6 py-3 bg-gray-300 text-gray-800 font-medium rounded-md shadow-sm hover:bg-gray-400 transition duration-300 ease-in-out"
                >
                    Cancelar
                </button>
                <button
                    onClick={onSubmit}
                    className="px-6 py-3 bg-red-600 text-white font-medium rounded-md shadow-sm hover:bg-red-700 transition duration-300 ease-in-out"
                >
                    Eliminar
                </button>
            </div>
        </>
    );
};

export default EliminarForm;