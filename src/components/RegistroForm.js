"use client";
import React, { useState } from 'react';

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    dni: '',
    nombres: '',
    apellidos: '',
    genero: '',
    nacimiento: '',
    correo: '',
    celular: '',
    region: '',
    direccion: '',
    celularFamiliar: '',
    tiktok: '',
    linkedin: '',
    facebook: '',
    disponibilidad: {},
    descripcion: '',
    hobbies: '',
    regalos: '',
  });

  const departamentos = [
    'Amazonas', 'Áncash', 'Apurímac', 'Arequipa', 'Ayacucho', 'Cajamarca', 'Callao',
    'Cusco', 'Huancavelica', 'Huánuco', 'Ica', 'Junín', 'La Libertad', 'Lambayeque',
    'Lima', 'Loreto', 'Madre de Dios', 'Moquegua', 'Pasco', 'Piura', 'Puno',
    'San Martín', 'Tacna', 'Tumbes', 'Ucayali',
  ];

  const dias = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const horas = [
    '8:00 - 10:00',
    '10:00 - 12:00',
    '12:00 - 14:00',
    '14:00 - 16:00',
    '16:00 - 18:00',
    '18:00 - 20:00',
    '20:00 - 22:00',
  ];

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDisponibilidadChange = (dia, hora) => {
    setFormData(prev => ({
      ...prev,
      disponibilidad: {
        ...prev.disponibilidad,
        [dia]: hora,
      },
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-black text-white shadow-md rounded-xl p-8">
      <img src="/portada.jpg" alt="Portada" className="w-full max-h-64 object-cover rounded-t-xl mb-6" />

      <h2 className="text-2xl font-bold mb-6 text-center text-[#00A8A8]">
        Bienvenid@ a Acciones Empáticas - Voluntariado 2025-II🥳
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="DNI" name="dni" value={formData.dni} onChange={handleChange} required />
        <Input label="Nombres" name="nombres" value={formData.nombres} onChange={handleChange} required />
        <Input label="Apellidos" name="apellidos" value={formData.apellidos} onChange={handleChange} required />

        <div>
          <label className="block mb-1 font-medium text-[#00A8A8]">Género</label>
          <div className="flex flex-col space-y-2">
            {['Femenino', 'Masculino', 'Prefiero no decirlo'].map(g => (
              <label key={g} className="inline-flex items-center">
                <input
                  type="radio"
                  name="genero"
                  value={g}
                  checked={formData.genero === g}
                  onChange={handleChange}
                  required
                  className="mr-2"
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        <Input type="date" label="Fecha de Nacimiento" name="nacimiento" value={formData.nacimiento} onChange={handleChange} required />
        <Input label="Correo electrónico actual" name="correo" value={formData.correo} onChange={handleChange} required />
        <Input label="Celular del Voluntario" name="celular" value={formData.celular} onChange={handleChange} required />

        <div>
          <label className="block mb-1 font-medium text-[#00A8A8]">Región de residencia actual</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-600 bg-black text-white rounded"
          >
            <option value="">Seleccione una región</option>
            {departamentos.map(dep => (
              <option key={dep} value={dep}>{dep}</option>
            ))}
          </select>
        </div>

        <Input label="Dirección de residencia actual" name="direccion" value={formData.direccion} onChange={handleChange} required />

        <div>
          <label className="block mb-1 font-medium text-[#00A8A8]">Celular del familiar</label>
          <p className="text-sm text-gray-400 mb-1">En caso se presente alguna urgencia nos comunicaremos con esta persona.</p>
          <input
            type="text"
            name="celularFamiliar"
            value={formData.celularFamiliar}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-black text-white p-2 rounded"
          />
        </div>

        {[
          { label: 'Coloca el enlace de tu TikTok', name: 'tiktok' },
          { label: 'Coloca el enlace de tu LinkedIn', name: 'linkedin' },
          { label: 'Coloca el enlace de tu Facebook', name: 'facebook' },
        ].map(field => (
          <div key={field.name}>
            <label className="block mb-1 font-medium text-[#00A8A8]">{field.label}</label>
            <p className="text-sm text-gray-400 mb-1">En caso no tengas colocar NINGUNO.</p>
            <input
              type="text"
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
              className="w-full border border-gray-600 bg-black text-white p-2 rounded"
            />
          </div>
        ))}

        <div>
          <label className="block mb-1 font-medium text-[#00A8A8] mb-2">
            Actualmente, ¿En qué franjas horarias tienes disponibilidad para las actividades del voluntariado?
          </label>
          <table className="table-auto w-full border text-center text-sm">
            <thead>
              <tr>
                <th className="border p-1 text-left">Día</th>
                {horas.map(h => (
                  <th key={h} className="border p-1">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dias.map(dia => (
                <tr key={dia}>
                  <td className="border p-1 text-left">{dia}</td>
                  {horas.map(hora => (
                    <td key={hora} className="border">
                      <input
                        type="radio"
                        name={`dispo-${dia}`}
                        value={hora}
                        checked={formData.disponibilidad[dia] === hora}
                        onChange={() => handleDisponibilidadChange(dia, hora)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <label className="block mb-1 font-medium text-[#00A8A8]">Descripción breve</label>
          <p className="text-sm text-gray-400 mb-1">
            Describe brevemente en 2 líneas tu perfil profesional y personal, puedes incluir tu experiencia, habilidades,
            intereses, grados académicos, etc. Considera que esta descripción lo utilizaremos para fines comunicacionales.
          </p>
          <input
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-black text-white p-2 rounded"
          />
        </div>

        <Input label="Menciona 3 hobbies o actividades favoritas" name="hobbies" value={formData.hobbies} onChange={handleChange} />
        <Input label="Menciona tres cosas que te gustaría que te regalen" name="regalos" value={formData.regalos} onChange={handleChange} />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

const Input = ({ label, name, type = 'text', value, onChange, required = false }) => (
  <div>
    <label className="block mb-1 font-medium text-[#00A8A8]">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full border border-gray-600 bg-black text-white p-2 rounded"
    />
  </div>
);

export default RegistroForm;


