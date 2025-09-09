import React from 'react';

// Función para formatear fecha en español
const formatDateInSpanish = () => {
    const now = new Date();
    const day = now.getDate();
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const month = months[now.getMonth()];
    const year = now.getFullYear();
    
    return `${day} de ${month} de ${year}`;
};

// Plantilla base con estilos compartidos - MANTENER IGUAL
const BaseTemplate = ({ children }) => (
    <div style={{ fontFamily: 'Times New Roman, serif', lineHeight: '1.6', color: '#333' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px', borderBottom: '2px solid #02A9A9', paddingBottom: '20px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#02A9A9', marginBottom: '10px' }}>
                EMPATHIC ACTIONS
            </div>
            <h1 style={{ color: '#02A9A9', fontSize: '28px', margin: '0' }}>
                CARTA DE COMPROMISO DEL VOLUNTARIO
            </h1>
            <h2 style={{ color: '#666', fontSize: '18px', margin: '10px 0 0 0' }}>
                Programa de Voluntariado Social
            </h2>
        </div>
        {children}
    </div>
);

// A1. Coordinación Nacional - Basado en PDF 7
const CoordinacionNacionalTemplate = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>
                Yo, <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado(a) con DNI N.° <strong style={{ fontWeight: 'bold' }}>{user?.document_number}</strong>, 
                por la presente, manifiesto mi compromiso formal de asumir las responsabilidades como voluntario durante el <strong style={{ fontWeight: 'bold' }}>2025-II, de agosto a diciembre</strong>, 
                bajo el rol de la Coordinación Nacional del área de <strong style={{ fontWeight: 'bold' }}>{user?.group || '______________________________'}</strong> dentro de la organización Acciones Empáticas.
            </p>

            <p>En mi rol como voluntario manifiesto que mi participación es libre, voluntaria y sin la expectativa de remuneración económica alguna, 
            de acuerdo con la Ley N.º 28238, Ley General del Voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>Me comprometo con lo siguiente:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Desarrollar las actividades encomendadas en el área y rol que se me sea asignado.</li>
                <li>Asistir de las capacitaciones y actividades relacionadas al programa asignado.</li>
                <li>Asistir a las reuniones semanales del área asignada y reuniones mensuales organizacionales.</li>
                <li>Mantener una actitud respetuosa y confidencial en cada interacción con el equipo, beneficiarios y aliados de la organización.</li>
                <li>Cumplir la política de prevención de acoso sexual, política de prevención de discriminación, normativas, Reglamento Interno del Voluntario y el Código de Conducta de Acciones Empáticas.</li>
                <li>Mantener confidencialidad respecto a toda información, actividades, datos o documentos relacionados a los programas, proyectos y organización.</li>
                <li>He de reconocer que la organización Acciones Empáticas puede darme de baja como voluntario tras 3 inasistencias injustificadas a las reuniones del área y organizacionales.</li>
                <li>En caso decida dar por finalizado mi compromiso antes de la fecha estipulada del programa, comunicar al correo acciones.empaticas@grupoempatic.com mi retiro con 15 días de antelación.</li>
                <li>En caso me entreguen materiales, me comprometo a mantenerlos en buen estado, evitar su deterioro, pérdida, uso indebido, y devolverlos una vez finalizadas las actividades.</li>
                <li>He de reconocer que de incumplir las normativas podría ser retirado del programa y de ser necesario se evaluará la posibilidad de aperturar un proceso legal.</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>Asimismo, al firmar autorizo a Acciones Empáticas, así como a sus patrocinadores y aliados:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Recopilar, almacenar, procesar y usar mis datos personales, conforme a la Ley N.° 29733 y su reglamento, a Acciones Empáticas e instituciones aliadas para fines organizacionales y comunicacionales, y reconozco mis derechos ARCO.</li>
                <li>El uso, reproducción y difusión de mi imagen, voz y/o nombre en fotografías, videos y/o cualquier material audiovisual, cediendo los derechos patrimoniales de mi imagen de manera no exclusiva, sin límite territorial ni temporal, y de manera gratuita.</li>
                <li>Cedo todos los derechos patrimoniales de cualquier creación que desarrolle durante mis actividades (documentos, materiales, gráficos, etc.), conforme a la Ley N.° 822.</li>
            </ul>

            <p>Confirmo que he leído, comprendido y me comprometo a cumplir con lo establecido.</p>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>__________________ del 2025, Perú</strong></p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// A2. SkillUp 360 - Basado en PDF 6
const SkillUp360Template = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>
                Yo, <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado(a) con DNI N.° <strong style={{ fontWeight: 'bold' }}>{user?.document_number}</strong>, 
                por la presente, manifiesto mi compromiso formal de asumir las responsabilidades como voluntario durante el <strong style={{ fontWeight: 'bold' }}>2025-II, de agosto a diciembre</strong>, 
                para el programa <strong style={{ fontWeight: 'bold' }}>SkillUp 360°</strong>, dentro de la organización Acciones Empáticas.
            </p>

            <p>En mi rol como voluntario manifiesto que mi participación es libre, voluntaria y sin la expectativa de remuneración económica alguna, 
            de acuerdo con la Ley N.º 28238, Ley General del Voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>Me comprometo con lo siguiente:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Desarrollar las actividades encomendadas en el área y rol que se me sea asignado.</li>
                <li>Asistir de las capacitaciones y actividades relacionadas al programa asignado.</li>
                <li>Asistir a las reuniones semanales del área asignada y reuniones mensuales organizacionales.</li>
                <li>Mantener una actitud respetuosa y confidencial en cada interacción con el equipo, beneficiarios y aliados de la organización.</li>
                <li>Cumplir la política de prevención de acoso sexual, política de prevención de discriminación, normativas, Reglamento Interno del Voluntario y el Código de Conducta de Acciones Empáticas.</li>
                <li>Mantener confidencialidad respecto a toda información, actividades, datos o documentos relacionados a los programas, proyectos y organización.</li>
                <li>He de reconocer que la organización Acciones Empáticas puede darme de baja como voluntario tras 3 inasistencias injustificadas a las reuniones del área y organizacionales.</li>
                <li>En caso decida dar por finalizado mi compromiso antes de la fecha estipulada del programa, comunicar al correo acciones.empaticas@grupoempatic.com mi retiro con 15 días de antelación.</li>
                <li>En caso me entreguen materiales, me comprometo a mantenerlos en buen estado, evitar su deterioro, pérdida, uso indebido, y devolverlos una vez finalizadas las actividades.</li>
                <li>He de reconocer que de incumplir las normativas podría ser retirado del programa y de ser necesario se evaluará la posibilidad de aperturar un proceso legal.</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>Asimismo, al firmar autorizo a Acciones Empáticas, así como a sus patrocinadores y aliados:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Recopilar, almacenar, procesar y usar mis datos personales, conforme a la Ley N.° 29733 y su reglamento, a Acciones Empáticas e instituciones aliadas para fines organizacionales y comunicacionales, y reconozco mis derechos ARCO.</li>
                <li>El uso, reproducción y difusión de mi imagen, voz y/o nombre en fotografías, videos y/o cualquier material audiovisual, cediendo los derechos patrimoniales de mi imagen de manera no exclusiva, sin límite territorial ni temporal, y de manera gratuita.</li>
                <li>Cedo todos los derechos patrimoniales de cualquier creación que desarrolle durante mis actividades (documentos, materiales, gráficos, etc.), conforme a la Ley N.° 822.</li>
            </ul>

            <p>Confirmo que he leído, comprendido y me comprometo a cumplir con lo establecido.</p>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>__________________ del 2025, Perú</strong></p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// A3. Coordinación Programas - Basado en PDF 3
const CoordinacionProgramasTemplate = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>
                Yo, <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado(a) con DNI N.° <strong style={{ fontWeight: 'bold' }}>{user?.document_number}</strong>, 
                por la presente, manifiesto mi compromiso formal de asumir las responsabilidades como voluntario durante el <strong style={{ fontWeight: 'bold' }}>2025-II, de septiembre a noviembre</strong>, 
                bajo el rol de la <strong style={{ fontWeight: 'bold' }}>Coordinación de Proyectos denominado {user?.group || '_______________________'}</strong> dentro de la organización Acciones Empáticas.
            </p>

            <p>En mi rol como voluntario manifiesto que mi participación es libre, voluntaria y sin la expectativa de remuneración económica alguna, 
            de acuerdo con la Ley N.º 28238, Ley General del Voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>Me comprometo con lo siguiente:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Desarrollar las actividades encomendadas en el área y rol que se me sea asignado.</li>
                <li>Asistir de las capacitaciones y actividades relacionadas al programa asignado.</li>
                <li>Asistir a las reuniones semanales del área asignada y reuniones mensuales organizacionales.</li>
                <li>Mantener una actitud respetuosa y confidencial en cada interacción con el equipo, beneficiarios y aliados de la organización.</li>
                <li>Cumplir la política de prevención de acoso sexual, política de prevención de discriminación, normativas, Reglamento Interno del Voluntario y el Código de Conducta de Acciones Empáticas.</li>
                <li>Mantener confidencialidad respecto a toda información, actividades, datos o documentos relacionados a los programas, proyectos y organización.</li>
                <li>He de reconocer que la organización Acciones Empáticas puede darme de baja como voluntario tras 3 inasistencias injustificadas a las reuniones del área y organizacionales.</li>
                <li>En caso decida dar por finalizado mi compromiso antes de la fecha estipulada del programa, comunicar al correo acciones.empaticas@grupoempatic.com mi retiro con 15 días de antelación.</li>
                <li>En caso me entreguen materiales, me comprometo a mantenerlos en buen estado, evitar su deterioro, pérdida, uso indebido, y devolverlos una vez finalizadas las actividades.</li>
                <li>He de reconocer que de incumplir las normativas podría ser retirado del programa y de ser necesario se evaluará la posibilidad de aperturar un proceso legal.</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>Asimismo, al firmar autorizo a Acciones Empáticas, así como a sus patrocinadores y aliados:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Recopilar, almacenar, procesar y usar mis datos personales, conforme a la Ley N.° 29733 y su reglamento, a Acciones Empáticas e instituciones aliadas para fines organizacionales y comunicacionales, y reconozco mis derechos ARCO.</li>
                <li>El uso, reproducción y difusión de mi imagen, voz y/o nombre en fotografías, videos y/o cualquier material audiovisual, cediendo los derechos patrimoniales de mi imagen de manera no exclusiva, sin límite territorial ni temporal, y de manera gratuita.</li>
                <li>Cedo todos los derechos patrimoniales de cualquier creación que desarrolle durante mis actividades (documentos, materiales, gráficos, etc.), conforme a la Ley N.° 822.</li>
            </ul>

            <p>Confirmo que he leído, comprendido y me comprometo a cumplir con lo establecido.</p>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>__________________ del 2025, Perú</strong></p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// A4. Mentores Empáticos - Basado en PDF 2
const MentoresEmpaticosTemplate = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>
                Yo, <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado(a) con DNI N.° <strong style={{ fontWeight: 'bold' }}>{user?.document_number}</strong>, 
                por la presente, manifiesto mi compromiso formal de asumir las responsabilidades como voluntario durante el <strong style={{ fontWeight: 'bold' }}>2025, de septiembre a noviembre</strong>, 
                para el programa de <strong style={{ fontWeight: 'bold' }}>Mentores Empáticos</strong>, dentro de la organización Acciones Empáticas.
            </p>

            <p>En mi rol como voluntario manifiesto que mi participación es libre, voluntaria y sin la expectativa de remuneración económica alguna, 
            de acuerdo con la Ley N.º 28238, Ley General del Voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>Me comprometo con lo siguiente:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Desarrollar las actividades encomendadas en el área y rol que se me sea asignado.</li>
                <li>Asistir de las capacitaciones y actividades relacionadas al programa asignado.</li>
                <li>Asistir a las reuniones semanales del área asignada y reuniones mensuales organizacionales.</li>
                <li>Mantener una actitud respetuosa y confidencial en cada interacción con el equipo, beneficiarios y aliados de la organización.</li>
                <li>Cumplir la política de prevención de acoso sexual, política de prevención de discriminación, normativas, Reglamento Interno del Voluntario y el Código de Conducta de Acciones Empáticas.</li>
                <li>Mantener confidencialidad respecto a toda información, actividades, datos o documentos relacionados a los programas, proyectos y organización.</li>
                <li>He de reconocer que la organización Acciones Empáticas puede darme de baja como voluntario tras 3 inasistencias injustificadas a las reuniones del área y organizacionales.</li>
                <li>En caso decida dar por finalizado mi compromiso antes de la fecha estipulada del programa, comunicar al correo acciones.empaticas@grupoempatic.com mi retiro con 15 días de antelación.</li>
                <li>En caso me entreguen materiales, me comprometo a mantenerlos en buen estado, evitar su deterioro, pérdida, uso indebido, y devolverlos una vez finalizadas las actividades.</li>
                <li>He de reconocer que de incumplir las normativas podría ser retirado del programa y de ser necesario se evaluará la posibilidad de aperturar un proceso legal.</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>Asimismo, al firmar autorizo a Acciones Empáticas, así como a sus patrocinadores y aliados:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Recopilar, almacenar, procesar y usar mis datos personales, conforme a la Ley N.° 29733 y su reglamento, a Acciones Empáticas e instituciones aliadas para fines organizacionales y comunicacionales, y reconozco mis derechos ARCO.</li>
                <li>El uso, reproducción y difusión de mi imagen, voz y/o nombre en fotografías, videos y/o cualquier material audiovisual, cediendo los derechos patrimoniales de mi imagen de manera no exclusiva, sin límite territorial ni temporal, y de manera gratuita.</li>
                <li>Cedo{/* NOTA: En el PDF dice "Cedos" pero es un error tipográfico */} los derechos patrimoniales de cualquier creación que desarrolle durante mis actividades (documentos, materiales, gráficos, etc.), conforme a la Ley N.° 822.</li>
            </ul>

            <p>Confirmo que he leído, comprendido y me comprometo a cumplir con lo establecido.</p>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>__________________ del 2025, Perú</strong></p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// A5. Coordinación Regional - Basado en PDF 5
const CoordinacionRegionalTemplate = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>
                Yo, <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado(a) con DNI N.° <strong style={{ fontWeight: 'bold' }}>{user?.document_number}</strong>, 
                por la presente, manifiesto mi compromiso formal de asumir las responsabilidades como voluntario durante el <strong style={{ fontWeight: 'bold' }}>2025-II, de septiembre a diciembre</strong>, 
                bajo el rol de la <strong style={{ fontWeight: 'bold' }}>Coordinación Regional de la región {user?.group || '__________________________'}</strong> dentro de la organización Acciones Empáticas.
            </p>

            <p>En mi rol como voluntario manifiesto que mi participación es libre, voluntaria y sin la expectativa de remuneración económica alguna, 
            de acuerdo con la Ley N.º 28238, Ley General del Voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>Me comprometo con lo siguiente:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Desarrollar las actividades encomendadas en el área y rol que se me sea asignado.</li>
                <li>Asistir de las capacitaciones y actividades relacionadas al programa asignado.</li>
                <li>Asistir a las reuniones semanales del área asignada y reuniones mensuales organizacionales.</li>
                <li>Mantener una actitud respetuosa y confidencial en cada interacción con el equipo, beneficiarios y aliados de la organización.</li>
                <li>Cumplir la política de prevención de acoso sexual, política de prevención de discriminación, normativas, Reglamento Interno del Voluntario y el Código de Conducta de Acciones Empáticas.</li>
                <li>Mantener confidencialidad respecto a toda información, actividades, datos o documentos relacionados a los programas, proyectos y organización.</li>
                <li>He de reconocer que la organización Acciones Empáticas puede darme de baja como voluntario tras 3 inasistencias injustificadas a las reuniones del área y organizacionales.</li>
                <li>En caso decida dar por finalizado mi compromiso antes de la fecha estipulada del programa, comunicar al correo acciones.empaticas@grupoempatic.com mi retiro con 15 días de antelación.</li>
                <li>En caso me entreguen materiales, me comprometo a mantenerlos en buen estado, evitar su deterioro, pérdida, uso indebido, y devolverlos una vez finalizadas las actividades.</li>
                <li>He de reconocer que de incumplir las normativas podría ser retirado del programa y de ser necesario se evaluará la posibilidad de aperturar un proceso legal.</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>Asimismo, al firmar autorizo a Acciones Empáticas, así como a sus patrocinadores y aliados:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Recopilar, almacenar, procesar y usar mis datos personales, conforme a la Ley N.° 29733 y su reglamento, a Acciones Empáticas e instituciones aliadas para fines organizacionales y comunicacionales, y reconozco mis derechos ARCO.</li>
                <li>El uso, reproducción y difusión de mi imagen, voz y/o nombre en fotografías, videos y/o cualquier material audiovisual, cediendo los derechos patrimoniales de mi imagen de manera no exclusiva, sin límite territorial ni temporal, y de manera gratuita.</li>
                <li>Cedo todos los derechos patrimoniales de cualquier creación que desarrolle durante mis actividades (documentos, materiales, gráficos, etc.), conforme a la Ley N.° 822.</li>
            </ul>

            <p>Confirmo que he leído, comprendido y me comprometo a cumplir con lo establecido.</p>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>__________________ del 2025, Perú</strong></p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// A6. Líderes Que Impactan - Basado en PDF 4
const LideresQueImpactanTemplate = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>
                Yo, <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado(a) con DNI N.° <strong style={{ fontWeight: 'bold' }}>{user?.document_number}</strong>, 
                por la presente, manifiesto mi compromiso formal de asumir las responsabilidades como voluntario durante el <strong style={{ fontWeight: 'bold' }}>2025-II, de septiembre a diciembre</strong>, 
                para el programa <strong style={{ fontWeight: 'bold' }}>Líderes Que Impactan</strong>, dentro de la organización Acciones Empáticas.
            </p>

            <p>En mi rol como voluntario manifiesto que mi participación es libre, voluntaria y sin la expectativa de remuneración económica alguna, 
            de acuerdo con la Ley N.º 28238, Ley General del Voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>Me comprometo con lo siguiente:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Desarrollar las actividades encomendadas en el área y rol que se me sea asignado.</li>
                <li>Asistir de las capacitaciones y actividades relacionadas al programa asignado.</li>
                <li>Asistir a las reuniones semanales del área asignada y reuniones mensuales organizacionales.</li>
                <li>Mantener una actitud respetuosa y confidencial en cada interacción con el equipo, beneficiarios y aliados de la organización.</li>
                <li>Cumplir la política de prevención de acoso sexual, política de prevención de discriminación, normativas, Reglamento Interno del Voluntario y el Código de Conducta de Acciones Empáticas.</li>
                <li>Mantener confidencialidad respecto a toda información, actividades, datos o documentos relacionados a los programas, proyectos y organización.</li>
                <li>He de reconocer que la organización Acciones Empáticas puede darme de baja como voluntario tras 3 inasistencias injustificadas a las reuniones del área y organizacionales.</li>
                <li>En caso decida dar por finalizado mi compromiso antes de la fecha estipulada del programa, comunicar al correo acciones.empaticas@grupoempatic.com mi retiro con 15 días de antelación.</li>
                <li>En caso me entreguen materiales, me comprometo a mantenerlos en buen estado, evitar su deterioro, pérdida, uso indebido, y devolverlos una vez finalizadas las actividades.</li>
                <li>He de reconocer que de incumplir las normativas podría ser retirado del programa y de ser necesario se evaluará la posibilidad de aperturar un proceso legal.</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>Asimismo, al firmar autorizo a Acciones Empáticas, así como a sus patrocinadores y aliados:</strong></p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Recopilar, almacenar, procesar y usar mis datos personales, conforme a la Ley N.° 29733 y su reglamento, a Acciones Empáticas e instituciones aliadas para fines organizacionales y comunicacionales, y reconozco mis derechos ARCO.</li>
                <li>El uso, reproducción y difusión de mi imagen, voz y/o nombre en fotografías, videos y/o cualquier material audiovisual, cediendo los derechos patrimoniales de mi imagen de manera no exclusiva, sin límite territorial ni temporal, y de manera gratuita.</li>
                <li>Cedos{/* NOTA: En el PDF dice "Cedos" como error tipográfico */} los derechos patrimoniales de cualquier creación que desarrolle durante mis actividades (documentos, materiales, gráficos, etc.), conforme a la Ley N.° 822.</li>
            </ul>

            <p>Confirmo que he leído, comprendido y me comprometo a cumplir con lo establecido.</p>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>__________________ del 2025, Perú</strong></p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// A7. Aliados Empáticos - MANTENER COMO ESTABA (no hay PDF específico)
const AliadosEmpaticosTemplate = ({ user }) => (
    <BaseTemplate>
        <div style={{ margin: '30px 0', textAlign: 'justify', fontSize: '14px' }}>
            <p style={{ marginBottom: '20px' }}>Yo <strong style={{ fontWeight: 'bold' }}>{user?.first_name} {user?.last_name}</strong>, identificado/a con <strong style={{ fontWeight: 'bold' }}>{user?.document_type} N° {user?.document_number}</strong>, con domicilio en <strong style={{ fontWeight: 'bold' }}>{user?.location?.name || '_____________________________'}</strong>, mayor de edad, teléfono <strong style={{ fontWeight: 'bold' }}>{user?.phone_number}</strong> y email <strong style={{ fontWeight: 'bold' }}>{user?.email}</strong>, manifiesto expresamente lo siguiente:</p>

            <h3 style={{ color: '#02A9A9', marginTop: '30px', marginBottom: '15px' }}>DECLARACIONES</h3>
            
            <p><strong style={{ fontWeight: 'bold' }}>PRIMERA:</strong> Que deseo participar como voluntario/a en el área de <strong style={{ fontWeight: 'bold' }}>Aliados Empáticos</strong> de EMPATHIC ACTIONS en el periodo <strong style={{ fontWeight: 'bold' }}>2025-II</strong>.</p>

            <p><strong style={{ fontWeight: 'bold' }}>SEGUNDA:</strong> Que conozco la naturaleza de EMPATHIC ACTIONS y sus actividades de responsabilidad social, las cuales respaldo completamente.</p>

            <p><strong style={{ fontWeight: 'bold' }}>TERCERA:</strong> Que mi participación es completamente voluntaria, no percibiendo contraprestación económica alguna.</p>

            <h3 style={{ color: '#02A9A9', marginTop: '30px', marginBottom: '15px' }}>COMPROMISOS</h3>
            
            <p><strong style={{ fontWeight: 'bold' }}>CUARTA:</strong> Me comprometo a:</p>
            <ul style={{ marginLeft: '20px', marginBottom: '15px' }}>
                <li>Cumplir con las actividades asignadas con responsabilidad y puntualidad</li>
                <li>Mantener una conducta ética y profesional en todo momento</li>
                <li>Respetar la confidencialidad de la información a la que tenga acceso</li>
                <li>Representar dignamente los valores y principios de EMPATHIC ACTIONS</li>
                <li>Participar en las capacitaciones y reuniones convocadas</li>
                <li>Comunicar cualquier situación que impida el cumplimiento de mis funciones</li>
            </ul>

            <p><strong style={{ fontWeight: 'bold' }}>QUINTA:</strong> Declaro que no tengo impedimento legal alguno para realizar actividades de voluntariado.</p>

            <p><strong style={{ fontWeight: 'bold' }}>SEXTA:</strong> Autorizo el uso de mi imagen en fotografías y videos tomados durante las actividades, para fines de difusión institucional.</p>

            <p><strong style={{ fontWeight: 'bold' }}>SÉPTIMA:</strong> Autorizo el tratamiento de mis datos personales conforme a la Ley de Protección de Datos Personales N° 29733 y su Reglamento.</p>

            <p><strong style={{ fontWeight: 'bold' }}>OCTAVA:</strong> Cedo a EMPATHIC ACTIONS los derechos de autor sobre cualquier contenido que desarrolle durante mi voluntariado.</p>

            <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderLeft: '4px solid #ffc107', margin: '20px 0' }}>
                <p style={{ margin: '0', fontSize: '12px' }}><strong style={{ fontWeight: 'bold' }}>Importante:</strong> Este documento constituye un compromiso formal. Su incumplimiento podrá dar lugar a la terminación de mi participación como voluntario/a.</p>
            </div>

            <div style={{ textAlign: 'right', marginTop: '30px' }}>
                <p><strong style={{ fontWeight: 'bold' }}>Fecha:</strong> {formatDateInSpanish()}</p>
                <p><strong style={{ fontWeight: 'bold' }}>Lugar:</strong> Lima, Perú</p>
            </div>
        </div>

        <SignatureSection user={user} />
        <Footer />
    </BaseTemplate>
);

// Componente de sección de firma reutilizable - ADAPTADO AL FORMATO DE LOS PDFs
const SignatureSection = ({ user }) => (
    <div style={{ marginTop: '60px', borderTop: '1px solid #ddd', paddingTop: '30px' }}>
        <p><strong style={{ fontWeight: 'bold' }}>FIRMA:</strong></p>
        <div style={{ 
            border: '2px dashed #02A9A9', 
            height: '120px', 
            margin: '20px 0', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            backgroundColor: '#f8fffe', 
            color: '#02A9A9', 
            fontStyle: 'italic' 
        }}>
            Área reservada para firma digital
        </div>
        
        {/* NOTA: Manteniendo las variables originales del sistema para compatibilidad */}
        <p>_________________________________</p>
        <p><strong style={{ fontWeight: 'bold' }}>Nombre:</strong> {user?.first_name} {user?.last_name}</p>
        <p><strong style={{ fontWeight: 'bold' }}>Documento:</strong> {user?.document_type} N° {user?.document_number}</p>
        <p><strong style={{ fontWeight: 'bold' }}>Email:</strong> {user?.email}</p>
        {/* NOTA: Los PDFs no incluyen teléfono ni domicilio en la firma, solo en el encabezado */}
    </div>
);

// Componente de footer reutilizable - ACTUALIZADO
const Footer = () => (
    <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '12px', color: '#666', borderTop: '1px solid #ddd', paddingTop: '20px' }}>
        <div style={{ backgroundColor: '#02A9A9', color: 'white', padding: '10px', marginBottom: '10px' }}>
            <strong style={{ fontWeight: 'bold' }}>Acciones Empáticas</strong>
        </div>
        <p>www.empathicactions.org | contacto@empathicactions.org</p>
        <p>Este documento es de carácter legal y constituye un compromiso formal entre las partes.</p>
    </div>
);

// Función principal que selecciona la plantilla según el área - MANTENIENDO NOMBRES ORIGINALES
export const getCommitmentLetterTemplate = (user) => {
    const area = user?.area;
    
    switch (area) {
        case 'A1. Coordinación Nacional':
            return <CoordinacionNacionalTemplate user={user} />;
        case 'A2. SkillUp 360':
            return <SkillUp360Template user={user} />;
        case 'A3. Coordinación Programas':
            return <CoordinacionProgramasTemplate user={user} />;
        case 'A4. Mentores Empáticos':
            return <MentoresEmpaticosTemplate user={user} />;
        case 'A5. Coordinación Regional':
            return <CoordinacionRegionalTemplate user={user} />;
        case 'A6. Líderes Que Impactan':
            return <LideresQueImpactanTemplate user={user} />;
        case 'A7. Aliados Empáticos':
            return <AliadosEmpaticosTemplate user={user} />;
        default:
            // Plantilla genérica como fallback
            return <CoordinacionNacionalTemplate user={user} />;
    }
};

