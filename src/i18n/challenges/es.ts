// Spanish challenge texts.
// Keys must match ids in src/data/challengesMeta.ts
// For "never have I ever": write the thing they DID (who drinks).
// {{player}} = random player name (injected at runtime).
// {sips} amount is defined in meta, not here.

const challengesES: Record<string, string> = {
  // ── Suau ─────────────────────────────────────────────────────────────────────
  c_s_001: 'Yo nunca nunca... he mentido sobre mi edad',
  c_s_002: 'Yo nunca nunca... me he quedado dormido/a en clase o en el trabajo',
  c_s_003: 'Yo nunca nunca... he cantado en la ducha',
  c_s_004: 'Yo nunca nunca... he olvidado el nombre de alguien justo después de conocerlo',
  c_s_005: 'Yo nunca nunca... he comido algo caído al suelo aplicando la regla de los 5 segundos',
  c_s_006: 'Yo nunca nunca... he enviado un mensaje al contacto equivocado',
  c_s_007: 'Yo nunca nunca... he fingido no ver a alguien en la calle para no saludarlo',
  c_s_008: 'Yo nunca nunca... me he hecho el/la dormido/a para no contestar el teléfono',
  c_s_009: 'Yo nunca nunca... he llorado con una película de animación',
  c_s_010: 'Yo nunca nunca... he tenido mascota',
  c_s_011: 'Imita a alguien del grupo. Si te adivinan, bebes tú. Si no, beben ellos.',
  c_s_012: 'Di tres verdades y una mentira sobre ti. El grupo vota cuál es la mentira. Si aciertan, bebes.',
  c_s_013: 'Habla con acento extranjero durante 2 minutos. Si te ríes, bebes.',
  c_s_014: '¿Cuál es tu peor habilidad? El grupo decide si es verdad. Si no os creen, bebéis todos.',
  c_s_015: '¿Cuál es la canción más vergonzosa que tienes en tu playlist?',
  c_s_016: '¿A quién del grupo llamarías si estuvieras en problemas a las 3 de la mañana?',
  c_s_017: 'Nueva regla: el último en beber en cada turno tiene que beber dos veces.',
  c_s_018: 'Nueva regla: cada vez que alguien diga "beber" tiene que señalar al techo.',
  c_s_019: 'Haz un trabalenguas sin equivocarte. Si fallas, bebes.',
  c_s_020: 'Cuenta un chiste. Si nadie se ríe, bebes.',

  // ── Mig ──────────────────────────────────────────────────────────────────────
  c_m_001: 'Yo nunca nunca... he enviado un mensaje que no debía',
  c_m_002: 'Yo nunca nunca... he fingido estar enfermo/a para no ir a trabajar o estudiar',
  c_m_003: 'Yo nunca nunca... he stalkeado a alguien en redes sociales',
  c_m_004: 'Yo nunca nunca... me he metido en una discusión de internet',
  c_m_005: 'Yo nunca nunca... he hecho algo que mis padres nunca sabrán',
  c_m_006: 'Yo nunca nunca... he salido de fiesta sin dormir nada el día anterior',
  c_m_007: 'Yo nunca nunca... he cancelado planes con alguien poniendo excusas falsas',
  c_m_008: 'Yo nunca nunca... me he despertado sin saber dónde estaba',
  c_m_009: 'Llama a alguien que no está aquí y dile que le echas de menos. Si cuelgas antes de 30 segundos, bebes.',
  c_m_010: 'Muestra la última foto que tienes en el carrete. Si no la enseñas, bebes 3.',
  c_m_011: 'Baila 30 segundos solo/a sin música. Si paras antes, bebes.',
  c_m_012: 'Haz 10 sentadillas. Por cada una que falles, bebes.',
  c_m_013: '¿Cuál es la cosa más vergonzosa que has hecho estando borracho/a?',
  c_m_014: '¿Has hablado mal de alguien de este grupo? Se sincero/a. Si niegas y alguien dice que sí, bebes.',
  c_m_015: 'Nueva regla: nadie puede decir "no". El primero que lo diga bebe.',
  c_m_016: 'Nueva regla: cada vez que alguien consulte el móvil, bebe.',
  c_m_017: 'Pon la pantalla del móvil en el centro. El grupo elige qué historia o conversación debes enseñar.',
  c_m_018: 'Cambia tu foto de perfil de WhatsApp a la que elija el grupo durante 10 minutos.',
  c_m_019: 'Di algo positivo de cada persona del grupo. Por cada persona que saltes, bebes.',
  c_m_020: 'Cuenta algo que nadie de aquí sepa de ti. Si el grupo cree que ya lo saben, bebes.',

  // ── Picant ───────────────────────────────────────────────────────────────────
  c_p_001: 'Yo nunca nunca... he besado a más de una persona en la misma noche',
  c_p_002: 'Yo nunca nunca... he tenido un crush con alguien de este grupo',
  c_p_003: 'Yo nunca nunca... he enviado una foto comprometida',
  c_p_004: 'Yo nunca nunca... me he acostado con alguien cuyo nombre no sabía',
  c_p_005: 'Yo nunca nunca... he coqueteado con alguien que estaba en pareja',
  c_p_006: 'Yo nunca nunca... he mentido a una pareja',
  c_p_007: 'Muestra el último mensaje enviado a tu crush o ligue. Si no lo enseñas, bebes 4.',
  c_p_008: 'El grupo elige a dos personas. Tienen que hacerse un dare que el grupo decide.',
  c_p_009: 'Elige a alguien del grupo y describe la primera impresión que te dio. Sin filtros.',
  c_p_010: 'Verdad o reto: el grupo decide por ti. Si rechazas cualquiera de los dos, bebes y pasas.',
  c_p_011: '¿Cuál es tu mayor inseguridad? El grupo decide si es creíble.',
  c_p_012: 'Confiesa algo que nunca le dirías a tus padres.',
  c_p_013: 'Nueva regla: durante las próximas 3 rondas, el que pierda tiene que hacer lo que diga el grupo.',
  c_p_014: 'Envía un audio de voz a la persona que te gusta ahora mismo diciendo "hola, estoy pensando en ti". Si no lo envías, bebes.',
  c_p_015: 'Clasifica a los presentes del más al menos atractivo. Si te niegas, bebes.',
  c_p_016: 'Muestra la última búsqueda en Google. Si no la enseñas, bebes.',
  c_p_017: 'Escribe un mensaje romántico al contacto que el grupo elija. Tienes que enviarlo o bebes.',
  c_p_018: 'El grupo te hace 3 preguntas que tienes que responder con total honestidad o beber.',
  c_p_019: 'Yo nunca nunca... he hecho algo ilegal (menor)',
  c_p_020: 'Reenvia el último meme que recibiste por privado. Si no lo haces, bebes.',
};

export default challengesES;
