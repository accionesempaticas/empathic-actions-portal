"use client"
import React, { useState, useEffect } from 'react';

const mockDocumentApi = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 'doc-123',
        title: 'Contrato de Arrendamiento',
        content: `
          <div className="p-8 shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Contrato de Arrendamiento</h1>
            <p className="mb-2">Entre:</p>
            <p className="mb-2"><strong>[Nombre del Arrendador]</strong>, con DNI [DNI Arrendador], en adelante "El Arrendador".</p>
            <p className="mb-4">Y</p>
            <p className="mb-2"><strong>[Nombre del Arrendatario]</strong>, con DNI [DNI Arrendatario], en adelante "El Arrendatario".</p>

            <h2 className="text-xl font-semibold mt-6 mb-3">Cláusulas:</h2>
            <ol className="list-decimal list-inside">
              <li className="mb-2"><strong>Objeto del Contrato:</strong> El Arrendador cede en arrendamiento al Arrendatario el inmueble ubicado en [Dirección del Inmueble].</li>
              <li className="mb-2"><strong>Duración:</strong> El presente contrato tendrá una duración de [Número] años, a partir del [Fecha de Inicio].</li>
              <li className="mb-2"><strong>Renta:</strong> La renta mensual será de [Monto] euros, pagaderos los primeros cinco días de cada mes.</li>
              <li className="mb-2"><strong>Fianza:</strong> El Arrendatario entrega en este acto la cantidad de [Monto Fianza] euros en concepto de fianza.</li>
              <li className="mb-2"><strong>Uso del Inmueble:</strong> El inmueble será destinado exclusivamente a vivienda.</li>
              <li className="mb-2"><strong>Mantenimiento:</strong> El Arrendatario se compromete a mantener el inmueble en buen estado de conservación.</li>
              <li className="mb-2"><strong>Resolución:</strong> El incumplimiento de cualquiera de las cláusulas será causa de resolución del contrato.</li>
            </ol>

            <p className="mt-8">En fe de lo cual, las partes firman el presente contrato en [Ciudad], a [Día] de [Mes] de [Año].</p>

            <div className="mt-12 flex justify-around">
              <div className="text-center">
                <p>_________________________</p>
                <p>El Arrendador</p>
              </div>
              <div className="text-center">
                <p>_________________________</p>
                <p>El Arrendatario</p>
              </div>
            </div>
          </div>
        `,
        signed: false,
      });
    }, 1000);
  });
};

export default function DocumentSigningPage() {
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [signing, setSigning] = useState(false);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const data = await mockDocumentApi();
        setDocument(data);
      } catch (err) {
        setError('Error al cargar el documento.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  const handleSignDocument = async () => {
    setSigning(true);
    // Simulate API call for signing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setDocument(prevDoc => ({ ...prevDoc, signed: true }));
    setSigning(false);
    alert('Documento firmado exitosamente!');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Cargando documento...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-red-600">{error}</p>
      </div>
    );
  }

  if (!document) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">No se encontró el documento.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">{document.title}</h1>
      <div
        className="document-content border border-gray-300 p-8 rounded-md overflow-y-auto max-h-[60vh] bg-gray-100"
        dangerouslySetInnerHTML={{ __html: document.content }}
      ></div>

      <div className="mt-8 text-center">
        {document.signed ? (
          <p className="text-[#00A8A8] font-semibold text-xl">¡Documento ya firmado!</p>
        ) : (
          <button
            onClick={handleSignDocument}
            disabled={signing}
            className={`px-8 py-3 rounded-md text-white font-semibold text-lg ${signing ? 'bg-[#00A8A8] opacity-50 cursor-not-allowed' : 'bg-[#00A8A8] hover:bg-[#008C8C] focus:outline-none focus:ring-2 focus:ring-[#00A8A8] focus:ring-offset-2'}`}
          >
            {signing ? 'Firmando...' : 'Firmar Documento'}
          </button>
        )}
      </div>
    </div>
  );
}