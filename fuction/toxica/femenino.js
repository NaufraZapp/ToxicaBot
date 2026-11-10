/*
 ╭───────────── ˚₊‧꒰ა 🎀 ໒꒱ ‧₊˚ ─────────────╮
     𝐓𝐎́𝐗𝐈𝐂𝐀 𝐕𝟏 — Comandos femeninos
     Juegos, medidores, belleza, horóscopo,
     ciclo menstrual, interacciones y más.
     No necesita API: todo funciona offline.
 ╰──────────────────────────────────────────╯
*/

// ───────── utilidades ─────────
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)]
const tag = (jid) => '@' + String(jid || '').split('@')[0]
const hoy = () => {
  const d = new Date()
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
}
// Porcentaje "oficial del día": misma persona + mismo comando = mismo resultado hoy
function porcentajeDelDia(...partes) {
  const s = partes.join('|') + '|' + hoy()
  let h = 2166136261
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) }
  return Math.abs(h) % 101
}
function barra(p) {
  const llenos = Math.round(p / 10)
  return '♥'.repeat(llenos) + '♡'.repeat(10 - llenos)
}
function caja(titulo, cuerpo, pie = '𝙏𝙤́𝙭𝙞𝙘𝙖 𝙑1 🎀') {
  return `˚₊‧꒰ა ${titulo} ໒꒱ ‧₊˚\n╭┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╮\n${cuerpo}\n╰┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈╯\n> ${pie}`
}
function miembros(ctx) {
  return (ctx.groupMembers || []).map(p => p.id || p.jid || p).filter(Boolean)
}
// ¿Este jid es la persona que escribió? (compara número/LID sin dominio)
const base = (j) => String(j || '').split(':')[0].split('@')[0]
const esYo = (ctx, j) => [ctx.sender, ...(ctx.senderAlts || [])].map(base).includes(base(j))
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
const fechaBonita = (d) => `${d.getDate()} de ${MESES[d.getMonth()]}`

// ───────── medidores ─────────
const MEDIDORES = {
  toxica: {
    titulo: '☠️ 𝐓𝐎𝐗𝐈𝐂𝐎́𝐌𝐄𝐓𝐑𝐎', emoji: '☠️', etiqueta: 'tóxica',
    niveles: [
      [20, 'Un angelito 😇 ni sabe qué es revisar el celular ajeno.'],
      [40, 'Tóxica light 🍬 solo pregunta "¿con quién hablas?" de vez en cuando.'],
      [60, 'Tóxica certificada 💅 deja en visto pero exige respuesta en 2 minutos.'],
      [80, 'Peligro 🚨 tiene capturas guardadas desde 2019.'],
      [101, 'NIVEL DIOSA TÓXICA ☠️👑 te bloquea, te desbloquea y te vuelve a bloquear.']
    ]
  },
  diva: {
    titulo: '👑 𝐃𝐈𝐕𝐎́𝐌𝐄𝐓𝐑𝐎', emoji: '👑', etiqueta: 'diva',
    niveles: [
      [20, 'Diva en construcción 🚧 todavía sale en pijama a la tienda.'],
      [40, 'Media diva ✨ tiene su filtro favorito y no lo comparte.'],
      [60, 'Diva oficial 💄 no sale sin delineado ni a sacar la basura.'],
      [80, 'Súper diva 💎 camina como si sonara su canción de fondo.'],
      [101, 'DIVA SUPREMA 👑✨ el grupo debería pagarle por existir.']
    ]
  },
  celosa: {
    titulo: '💚 𝐂𝐄𝐋𝐎𝐒𝐎́𝐌𝐄𝐓𝐑𝐎', emoji: '💚', etiqueta: 'celosa',
    niveles: [
      [20, 'Cero celos 🕊️ confía más que un perrito.'],
      [40, 'Celitos tiernos 🥺 solo pregunta "¿y esa quién es?".'],
      [60, 'Celosa nivel FBI 🕵️‍♀️ ya sabe el nombre, la edad y el signo de la otra.'],
      [80, 'Celosa intensa 🔥 revisa hasta los "me gusta" de hace 3 años.'],
      [101, 'CELOS NIVEL DIOS 💚☠️ se pone celosa hasta de la mamá de él.']
    ]
  },
  intensa: {
    titulo: '🔥 𝐈𝐍𝐓𝐄𝐍𝐒𝐎́𝐌𝐄𝐓𝐑𝐎', emoji: '🔥', etiqueta: 'intensa',
    niveles: [
      [20, 'Súper tranqui 🧘‍♀️ responde audios con un "ok".'],
      [40, 'Un poquito intensa 🌶️ manda 5 mensajes seguidos.'],
      [60, 'Intensa 🔥 ya eligió el nombre de los hijos en la primera cita.'],
      [80, 'Muy intensa 🌋 manda audios de 7 minutos.'],
      [101, 'INTENSIDAD MÁXIMA 🌪️ llora con los comerciales y con las canciones de Shakira.']
    ]
  },
  dramatica: {
    titulo: '🎭 𝐃𝐑𝐀𝐌𝐀́𝐓𝐈𝐂𝐎𝐌𝐄𝐓𝐑𝐎', emoji: '🎭', etiqueta: 'dramática',
    niveles: [
      [20, 'Cero drama 🌿 una santa.'],
      [40, 'Drama de vez en cuando 🎬 pone estados tristes los domingos.'],
      [60, 'Dramática 🎭 llora en la ducha con música de fondo.'],
      [80, 'Drama queen 👸 convierte un "ok" en una telenovela de 200 capítulos.'],
      [101, 'OSCAR A LA MEJOR ACTRIZ 🏆🎭 hace drama hasta cuando se le cae una uña.']
    ]
  },
  chismosa: {
    titulo: '👀 𝐂𝐇𝐈𝐒𝐌𝐎𝐒𝐎́𝐌𝐄𝐓𝐑𝐎', emoji: '👀', etiqueta: 'chismosa',
    niveles: [
      [20, 'Ni se entera 🙈 se entera de todo una semana después.'],
      [40, 'Chismosa casual ☕ escucha pero "no dice nada".'],
      [60, 'Chismosa oficial 👂 sabe quién dejó en visto a quién.'],
      [80, 'Reportera del grupo 📰 tiene fuentes en todos los grupos.'],
      [101, 'DUEÑA DEL CHISME 👀☕ el chisme nace en su celular.']
    ]
  },
  coqueta: {
    titulo: '💋 𝐂𝐎𝐐𝐔𝐄𝐓𝐎́𝐌𝐄𝐓𝐑𝐎', emoji: '💋', etiqueta: 'coqueta',
    niveles: [
      [20, 'Tímida 🙈 se pone roja si le dicen "hola".'],
      [40, 'Coqueta discreta 😊 sabe usar el "jaja" estratégico.'],
      [60, 'Coqueta 💋 domina el arte de la indirecta en estados.'],
      [80, 'Muy coqueta 😏 con una mirada consigue descuento.'],
      [101, 'COQUETA PROFESIONAL 💋🔥 rompe corazones por deporte.']
    ]
  },
  ex: {
    titulo: '💔 ¿𝐕𝐎𝐋𝐕𝐄𝐑𝐈́𝐀𝐒 𝐂𝐎𝐍 𝐓𝐔 𝐄𝐗?', emoji: '💔', etiqueta: 'de volver con su ex',
    niveles: [
      [20, 'Jamás 🚫 ya lo superó y hasta le da risa.'],
      [40, 'Nah 🙄 a veces lo stalkea, pero solo por chisme.'],
      [60, 'Peligroso 😬 con un "hola, ¿cómo estás?" cae.'],
      [80, 'Ya está escribiendo el mensaje 📱 y borrándolo.'],
      [101, 'YA VOLVIÓ 🤡💔 amiga, ¿otra vez?']
    ]
  }
}

function medidor(ctx, clave) {
  const m = MEDIDORES[clave]
  const objetivo = ctx.menc_os2 || ctx.sender
  const p = porcentajeDelDia(clave, objetivo)
  const texto = m.niveles.find(n => p < n[0])[1]
  const cuerpo = `┊ ${m.emoji} ${tag(objetivo)} es *${p}%* ${m.etiqueta}\n┊ ${barra(p)}\n┊\n┊ ${texto}`
  return { text: caja(m.titulo, cuerpo, 'Resultado oficial del día 💅'), mentions: [objetivo] }
}

// ───────── listas de contenido ─────────
const L = {
  piropo: [
    'Si la belleza fuera delito, ya tendrías cadena perpetua 💖',
    'Tu sonrisa debería estar en el menú, porque es lo más rico del día 🍓',
    'No eres Google, pero tienes todo lo que estoy buscando ✨',
    '¿Eres wifi? Porque siento una conexión 📶💗',
    'Brillas tanto que el sol te pide consejos ☀️',
    'Si fueras flor, serías la más bonita del jardín 🌷',
    'Contigo hasta los lunes son bonitos 🥰',
    'Tus ojos tienen más luz que mi pantalla al 100% 💡',
    'Eres como el café: me despiertas el corazón ☕💞',
    '¿Tienes un mapa? Me perdí en tu mirada 🗺️💫'
  ],
  indirecta: [
    'No es que te extrañe, es que me acordé de lo tonta que fui 💅',
    'Tranqui, que ya encontré a alguien que sí sabe responder mensajes 📱',
    'Te deseo lo mejor… porque lo mejor ya lo tuviste y lo perdiste 💋',
    'No estoy enojada, solo estoy guardando información 🗂️',
    'Me cambiaste por otra, y yo te cambié por paz mental 🧘‍♀️',
    'Si me vas a buscar, búscame bien; si no, ni te molestes 🙄',
    'No fue mala suerte, fue mal gusto el tuyo 😌',
    'Ojalá te quieran como yo… pero no creo, nadie es tan buena 👑',
    'Le das like a todas pero a mí me escribes en privado. Qué curioso 🤔',
    'Yo no bloqueo, yo dejo que mires lo bien que estoy 📸✨'
  ],
  frasetoxica: [
    '¿Quién es ella? No, no estoy celosa, solo pregunto 🙂🔪',
    'Si me dejas en visto, te dejo en el pasado 💅',
    'Yo no soy tóxica, tú eres muy sensible 🤷‍♀️',
    'Responde rápido o pongo estado de indirecta 📲',
    '¿Por qué te conectaste y no me escribiste? Explícate 😤',
    'Te perdono, pero lo voy a recordar en cada pelea 🗂️',
    'No me pasa nada… pero ya deberías saber qué me pasa 🙃',
    'Si le das like a otra, yo le doy like a tu ex 😈',
    'Mi celular es privado; el tuyo es de las dos 📱',
    'Haz lo que quieras… pero si lo haces, ya verás 🙂'
  ],
  amorpropio: [
    'Eres suficiente tal como eres. No te achiques para caber en lugares pequeños 🌸',
    'Tu valor no baja porque alguien no lo vea 💎',
    'Florece donde estés, y si no te riegan, múdate de maceta 🪴',
    'La persona más importante de tu vida te mira desde el espejo 🪞💗',
    'No eres demasiado: es que ellos son muy poco ✨',
    'Descansar también es productivo, reina 🛁',
    'Tu paz vale más que cualquier discusión 🕊️',
    'Hoy elige quererte un poquito más que ayer 💞',
    'No necesitas permiso para brillar ☀️',
    'Una corona no se cae si caminas con la frente en alto 👑'
  ],
  consejo: [
    'Si te hace dudar, ya es un no. Confía en tu intuición 🔮',
    'Nunca le escribas borracha a tu ex. Nunca 🍷🚫',
    'Toma agua, usa bloqueador y bloquea a quien te quita la paz 💧☀️',
    'No le expliques tu valor a quien no lo quiere ver 💅',
    'Ahorra un poquito de cada sueldo: la independencia es el mejor accesorio 💰',
    'Las amigas de verdad se celebran, no se compiten 👭',
    'Si no te prioriza, no lo pongas de primera opción 📉',
    'Duerme bien: el mejor skincare es el descanso 😴✨',
    'Antes de comprar algo caro, espera 24 horas. Si lo sigues queriendo, es tuyo 🛍️',
    'Di "no" sin culpa. Es una oración completa 🙅‍♀️'
  ],
  pregunta: [
    'Sí, reina, sin duda 💅', 'Obvio que sí ✨', 'Mmm… ni lo sueñes 🙄', 'Ay amiga, no 💔',
    'Pregúntame cuando tengas tu café ☕', 'Las cartas dicen que sí 🔮', 'Las cartas dicen que ni loca 🃏',
    'Tal vez… si te pones linda 💄', 'Eso ni se pregunta, claro que sí 👑', 'Dale un tiempito, se viene 🌙',
    'Mejor no te digo para no herirte 🙊', '100% sí, confía 💗'
  ],
  verdad: [
    '¿Cuál es el chisme más fuerte que te sabes de alguien del grupo? (sin nombres 👀)',
    '¿A quién stalkeaste por última vez?',
    '¿Alguna vez revisaste el celular de tu pareja?',
    '¿Cuál es tu crush famoso imposible?',
    '¿Qué es lo más tóxico que has hecho por celos?',
    '¿Le has escrito a tu ex estando triste?',
    '¿Qué es lo que más te gusta de ti?',
    '¿Cuál es tu mayor inseguridad?',
    '¿Has fingido que no viste un mensaje?',
    '¿A quién del grupo le contarías un secreto?',
    '¿Cuál ha sido tu peor cita?',
    '¿Qué es lo más caro que compraste por impulso?'
  ],
  reto: [
    'Manda la última foto de tu galería (si te atreves) 📸',
    'Pon de estado "Estoy enamorada 💘" por 1 hora',
    'Mándale un audio a tu crush diciendo "hola" con voz sexy 🎙️',
    'Escribe un piropo a la persona de arriba 💌',
    'Cambia tu foto de perfil por un meme por 30 minutos 🤡',
    'Manda un audio cantando tu canción favorita 🎤',
    'Dile a alguien del grupo algo bonito que nunca le has dicho 🌸',
    'Escribe con los ojos cerrados "soy la más bonita del grupo" 🙈',
    'Imita a tu ex en un audio de 10 segundos 😂',
    'Manda un selfie haciendo tu mejor cara de diva 💅',
    'Escríbele "te extraño" a la última persona con la que hablaste (y explícale después) 😈'
  ],
  yonunca: [
    'Yo nunca nunca he stalkeado a la nueva novia de mi ex 👀',
    'Yo nunca nunca he llorado por alguien que no valía la pena 💧',
    'Yo nunca nunca he fingido estar ocupada para no salir 🛋️',
    'Yo nunca nunca he usado ropa de mi amiga sin pedirla 👗',
    'Yo nunca nunca he enviado un mensaje al chat equivocado 📱',
    'Yo nunca nunca he dicho "ya voy" cuando ni me había bañado 🚿',
    'Yo nunca nunca me he cortado el flequillo sola y me arrepentí ✂️',
    'Yo nunca nunca he dejado a alguien en visto a propósito 💅',
    'Yo nunca nunca me he enamorado de un amigo 💘',
    'Yo nunca nunca he gastado más de lo que tenía en maquillaje 💄',
    'Yo nunca nunca he hecho una cuenta falsa para stalkear 🕵️‍♀️'
  ],
  prefieres: [
    '¿Prefieres maquillaje ilimitado 💄 o ropa ilimitada 👗?',
    '¿Prefieres saber lo que piensa tu crush 💭 o que tu crush sepa lo que piensas tú?',
    '¿Prefieres un novio celoso 😤 o uno que no te preste atención 🙄?',
    '¿Prefieres viajar sola por el mundo ✈️ o con tu mejor amiga a un solo lugar 👭?',
    '¿Prefieres no volver a usar maquillaje 🚫💄 o no volver a usar tacones 🚫👠?',
    '¿Prefieres pelo perfecto siempre 💁‍♀️ o piel perfecta siempre ✨?',
    '¿Prefieres que tu ex vuelva rogando 🥺 o que te vea feliz con otro 😌?',
    '¿Prefieres leer el chat de tu pareja 📱 o que él lea el tuyo?',
    '¿Prefieres ser famosa 🌟 o millonaria en secreto 💰?',
    '¿Prefieres una cita en la playa 🏖️ o una noche de pelis en casa 🍿?'
  ],
  chisme: [
    'le habla a sus plantas y les pone nombre 🪴',
    'tiene 37 selfies iguales y no sabe cuál subir 🤳',
    'se enamora de todos los protagonistas de las novelas coreanas 💘',
    'dice que está a dieta pero se comió un postre a escondidas 🍰',
    'ensaya sus discusiones en la ducha 🚿',
    'le escribió "jajaja" a un mensaje sin leerlo 😂',
    'se hace la dormida para no contestar llamadas 😴',
    'tiene una playlist llamada "para llorar bonito" 🎧',
    'compró algo online solo porque estaba en oferta 🛒',
    'revisa quién vio su estado cada 5 minutos 👀',
    'se cambió de ropa 4 veces para ir a la tienda 👗'
  ],
  redflag: [
    'contesta "jaja" a todo 🚩', 'nunca se acuerda de tu cumpleaños 🚩', 'tiene 5 "mejores amigas" que no conoces 🚩',
    'te deja en visto pero sube estados 🚩', 'dice que todas sus ex están locas 🚩', 'no comparte la comida 🚩',
    'le da like a todas las fotos de su ex 🚩', 'pone música en altavoz en el bus 🚩', 'no sabe decir "perdón" 🚩',
    'se ríe de sus propios chistes antes de contarlos 🚩'
  ],
  greenflag: [
    'siempre pregunta si llegaste bien a casa 💚', 'recuerda tus comidas favoritas 💚', 'te defiende cuando no estás 💚',
    'te manda memes que le recuerdan a ti 💚', 'celebra tus logros como si fueran suyos 💚', 'pide perdón cuando se equivoca 💚',
    'te escucha sin mirar el celular 💚', 'respeta tus tiempos 💚', 'comparte su postre 💚', 'te presenta a sus amigas 💚'
  ],
  mood: [
    '💅 Mood: diva intocable', '🥺 Mood: necesito mimos', '😴 Mood: no me hablen hasta el café', '🔥 Mood: hoy no me para nadie',
    '🎧 Mood: escuchando canciones tristes a propósito', '🍫 Mood: chocolate y series', '😈 Mood: ligeramente tóxica',
    '🌸 Mood: soft girl', '💪 Mood: productiva y empoderada', '🛍️ Mood: quiero gastar todo mi sueldo'
  ],
  outfit: [
    'Jean mom, top blanco básico, blazer oversize y zapatillas blancas 🤍 — clásico que nunca falla.',
    'Vestido floral midi, sandalias trenzadas y bolso de mimbre 🌼 — vibra de verano.',
    'Total black: pantalón recto, body negro, botas y aretes dorados 🖤 — elegante y misteriosa.',
    'Falda plisada, suéter pastel y medias largas 🎀 — estilo coquette.',
    'Jogger, crop top y chaqueta de jean 💙 — cómoda pero con onda.',
    'Vestido slip satinado, chaqueta de cuero y botines 🖤✨ — para salir de noche.',
    'Pantalón de lino beige, camisa blanca anudada y sandalias 🤎 — clean girl.',
    'Mini falda de jean, polo baby tee y zapatillas plataforma 💗 — estilo Y2K.',
    'Conjunto deportivo rosa, cola alta y gorra 🩷 — sporty chic.',
    'Vestido rojo, labios rojos y tacones nude ❤️ — para que nadie te olvide.'
  ],
  unas: [
    'French tip clásico con un toque de brillo ✨',
    'Uñas nude con un corazoncito rojo en el anular ❤️',
    'Efecto "glazed donut" (perlado) 🍩',
    'Degradado rosa a blanco (baby boomer) 🌸',
    'Rojo cereza intenso, cortas y cuadradas 🍒',
    'Lila pastel con florecitas blancas 💜',
    'Negro mate con detalles dorados 🖤✨',
    'Chrome plateado tipo espejo 🪞',
    'Cada uña de un color pastel distinto 🌈',
    'Animal print sutil en dos uñas 🐆'
  ],
  maquillaje: [
    'Clean girl: piel glowy, cejas peinadas, rubor en crema y lip oil ✨',
    'Delineado de gato bien marcado y labios nude 🐱',
    'Look coquette: rubor rosado en nariz y mejillas, pestañas definidas y gloss 🎀',
    'Labios rojos clásicos y piel mate impecable 💋',
    'Smokey eye marrón y labio color chocolate 🍫',
    'Sombra brillante en el lagrimal y mucho iluminador 💎',
    'Look natural "sin maquillaje": corrector, máscara y bálsamo 🌿',
    'Ojos con sombra lila y labios rosados 💜',
    'Glitter en los párpados para salir de noche 🪩'
  ],
  peinado: [
    'Cola alta bien pulida (slick back) 💁‍♀️',
    'Ondas suaves con plancha 🌊',
    'Moño desordenado con mechones sueltos 🎀',
    'Media cola con un lazo grande 🎀',
    'Trenzas boxeadoras 🥊',
    'Pelo suelto con raya al medio y brillo ✨',
    'Dos moñitos tipo space buns 🪐',
    'Trenza francesa de lado 🌸',
    'Cola baja con pañuelo de seda 🧣'
  ],
  cita: [
    'Picnic en el parque con frutas, sanduchitos y una playlist romántica 🧺',
    'Noche de pelis en casa con palomitas y mantita 🍿',
    'Ir por helado y caminar viendo el atardecer 🍦🌅',
    'Clase de cocina juntos y cenar lo que preparen 🍝',
    'Karaoke y cantar canciones de despecho 🎤',
    'Ir a un café bonito y tomarse mil fotos ☕📸',
    'Ver las estrellas desde un mirador 🌌',
    'Pintar cuadros juntos con vino (o jugo) 🎨🍷',
    'Ir a la feria y ganar un peluche 🧸'
  ],
  nombreNina: ['Valentina', 'Isabella', 'Camila', 'Luciana', 'Sofía', 'Emilia', 'Antonella', 'Martina', 'Renata', 'Victoria', 'Mía', 'Aitana', 'Abril', 'Alessia', 'Julieta'],
  nombreNino: ['Mateo', 'Santiago', 'Thiago', 'Liam', 'Gael', 'Leonardo', 'Sebastián', 'Dante', 'Emiliano', 'Lucas', 'Benjamín', 'Joaquín', 'Bastián', 'Adrián', 'Matías']
}

const TAROT = [
  ['🌟 La Estrella', 'Esperanza y sanación. Lo que deseas viene en camino, sigue brillando.'],
  ['☀️ El Sol', 'Éxito y alegría. Hoy todo te sale bonito, aprovecha.'],
  ['🌙 La Luna', 'Ojo con las apariencias. No todo lo que te dicen es verdad.'],
  ['💞 Los Enamorados', 'Una decisión del corazón. Elige lo que te haga sentir en paz.'],
  ['👑 La Emperatriz', 'Abundancia y belleza. Tu energía femenina está en su punto.'],
  ['🔮 La Sacerdotisa', 'Confía en tu intuición. Ya sabes la respuesta.'],
  ['🎡 La Rueda de la Fortuna', 'Cambios inesperados a tu favor. Suelta el control.'],
  ['⚡ La Torre', 'Algo se rompe para que llegue algo mejor. No tengas miedo.'],
  ['💪 La Fuerza', 'Eres más fuerte de lo que crees. Tu calma es tu poder.'],
  ['🌍 El Mundo', 'Cierre de ciclo. Celebra todo lo que lograste.'],
  ['🃏 El Loco', 'Nuevos comienzos. Atrévete a lo que te da miedito.'],
  ['⚖️ La Justicia', 'Lo que das, regresa. El karma está trabajando.']
]
const AURAS = [
  ['💗 Rosa', 'amorosa, tierna y con un corazón enorme'],
  ['💜 Lila', 'intuitiva, misteriosa y muy espiritual'],
  ['❤️ Roja', 'apasionada, intensa y con mucha energía'],
  ['💛 Dorada', 'brillante, alegre y la que anima a todas'],
  ['💙 Azul', 'tranquila, sabia y la mejor consejera'],
  ['💚 Verde', 'sanadora, leal y con mucha paz'],
  ['🤍 Blanca', 'pura, sincera y muy noble'],
  ['🖤 Negra', 'misteriosa, poderosa y un poquito tóxica'],
  ['🧡 Naranja', 'creativa, divertida y aventurera']
]
const FLORES = [
  ['🌹 Rosa roja', 'apasionada y elegante, pero con espinas si la provocan'],
  ['🌷 Tulipán', 'dulce y sencilla, alegra cualquier lugar'],
  ['🌻 Girasol', 'siempre buscando la luz, contagia buena vibra'],
  ['🌸 Flor de cerezo', 'delicada y soñadora, belleza que deja huella'],
  ['🪷 Loto', 'renace de todo, fuerte y espiritual'],
  ['💮 Margarita', 'auténtica y divertida, la amiga que todas quieren'],
  ['🌺 Hibisco', 'exótica y alegre, alma de fiesta'],
  ['🥀 Rosa marchita', 'dramática y poética, pero siempre bonita'],
  ['💐 Lavanda', 'calmada y relajante, trae paz a todos']
]

const SIGNOS = {
  aries: 'fuego', leo: 'fuego', sagitario: 'fuego',
  tauro: 'tierra', virgo: 'tierra', capricornio: 'tierra',
  geminis: 'aire', libra: 'aire', acuario: 'aire',
  cancer: 'agua', escorpio: 'agua', escorpion: 'agua', piscis: 'agua'
}
const normalizar = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim()

// ───────── interacciones ─────────
const INTERACCIONES = {
  abrazar: { e: '🤗', sola: 'se dio un abracito a sí misma 🤍', con: 'le dio un abrazo apapachador a' },
  besar: { e: '💋', sola: 'se mandó un beso al espejo 💋', con: 'le dio un besito a' },
  mimos: { e: '🥺', sola: 'quiere mimos… ¿alguien? 🥺', con: 'le está dando mimos a' },
  cachetada: { e: '👋', sola: 'se dio una cachetada para despertar 😵', con: 'le dio una cachetada de diva a' },
  pellizco: { e: '🤏', sola: 'se pellizcó para ver si no está soñando 🤏', con: 'le pellizcó el cachete a' },
  apapachar: { e: '🧸', sola: 'se acurrucó con su peluche 🧸', con: 'está apapachando a' },
  celar: { e: '😤', sola: 'está celosa y no dice de quién 😤', con: 'está celando a' },
  peinar: { e: '💇‍♀️', sola: 'se está peinando frente al espejo 💁‍♀️', con: 'le está haciendo trencitas a' },
  chismear: { e: '☕', sola: 'está chismeando sola, qué triste 😂', con: 'se fue a chismear con' }
}
const ALIAS_INTER = {
  abrazo: 'abrazar', beso: 'besar', mimo: 'mimos', apapacho: 'apapachar', celos: 'celar', trenzas: 'peinar', chismecito: 'chismear'
}
const KAOMOJI = ['(づ｡◕‿‿◕｡)づ', '(✿◡‿◡)', '૮(˶ᵔᵕᵔ˶)ა', '(っ˘̩╭╮˘̩)っ', '(*≧ω≦)', '(˶˃ ᵕ ˂˶)', '(ˊᗜˋ*)']

// ───────── comandos ─────────
const H = {}

for (const k of Object.keys(MEDIDORES)) H[k] = (ctx) => medidor(ctx, k)

H.bff = (ctx) => {
  const a = (ctx.menc_jid2 && ctx.menc_jid2[1]) ? ctx.menc_jid2[0] : ctx.sender
  const b = (ctx.menc_jid2 && ctx.menc_jid2[1]) ? ctx.menc_jid2[1] : ctx.menc_os2
  if (!b) return `👭 Menciona a tu amiga (o a dos amigas) para medir su amistad.\nEj: *${ctx.prefix}bff @amiga*`
  const p = porcentajeDelDia('bff', [a, b].sort().join())
  const frase = p < 30 ? 'Amigas de "hola y chao" 👋' : p < 60 ? 'Buenas amigas, comparten memes 💌' : p < 85 ? 'Mejores amigas, se cuentan TODO 👀' : 'ALMAS GEMELAS 👯‍♀️ si una cae, la otra cae riéndose'
  return { text: caja('👭 𝐌𝐄𝐃𝐈𝐃𝐎𝐑 𝐃𝐄 𝐀𝐌𝐈𝐒𝐓𝐀𝐃', `┊ ${tag(a)} 💞 ${tag(b)}\n┊ *${p}%* de amistad\n┊ ${barra(p)}\n┊\n┊ ${frase}`), mentions: [a, b] }
}

H.crush = (ctx) => {
  if (!ctx.isGroup) return '👭 Esto solo funciona en grupos, amiga.'
  const lista = miembros(ctx).filter(j => !esYo(ctx, j))
  if (!lista.length) return '🥺 No encontré a nadie más en el grupo.'
  const c = pick(lista)
  return { text: caja('💘 𝐓𝐔 𝐂𝐑𝐔𝐒𝐇 𝐒𝐄𝐂𝐑𝐄𝐓𝐎', `┊ ${tag(ctx.sender)}, tu crush del grupo es…\n┊\n┊ 💘 ${tag(c)} 💘\n┊\n┊ ${pick(['Ya díselo, no seas tímida 🙈', 'Se nota en cómo le reaccionas 👀', 'El destino ya habló 🔮', 'Dicen que es mutuo… 😏'])}`), mentions: [ctx.sender, c] }
}

H.pareja = (ctx) => {
  if (!ctx.isGroup) return '👭 Esto solo funciona en grupos, amiga.'
  const lista = miembros(ctx)
  if (lista.length < 2) return '🥺 Necesito al menos 2 personas en el grupo.'
  const a = pick(lista); let b = pick(lista); let t = 0
  while (b === a && t++ < 20) b = pick(lista)
  return { text: caja('💑 𝐏𝐀𝐑𝐄𝐉𝐀 𝐃𝐄𝐋 𝐃𝐈́𝐀', `┊ ${tag(a)} 💞 ${tag(b)}\n┊\n┊ ${pick(['Hacen linda pareja, ¿o no? 🥰', 'Ya pongan fecha de boda 💍', 'El grupo los shipea 🛳️', 'Esto huele a romance 🌹'])}`), mentions: [a, b] }
}

H.top = (ctx) => {
  if (!ctx.isGroup) return '👭 Esto solo funciona en grupos, amiga.'
  const cualidad = ctx.q || 'divas'
  const lista = miembros(ctx).sort(() => Math.random() - 0.5).slice(0, 5)
  if (!lista.length) return '🥺 No hay suficientes personas.'
  const medallas = ['👑', '💎', '🌸', '🎀', '✨']
  const cuerpo = lista.map((j, i) => `┊ ${medallas[i]} ${i + 1}. ${tag(j)}`).join('\n')
  return { text: caja(`🏆 𝐓𝐎𝐏 𝟓 𝐌𝐀́𝐒 ${cualidad.toUpperCase()}`, cuerpo), mentions: lista }
}

H.redflag = (ctx) => {
  const o = ctx.menc_os2 || ctx.sender
  return { text: caja('🚩 𝐑𝐄𝐃 𝐅𝐋𝐀𝐆', `┊ ${tag(o)} ${pick(L.redflag)}`), mentions: [o] }
}
H.greenflag = (ctx) => {
  const o = ctx.menc_os2 || ctx.sender
  return { text: caja('💚 𝐆𝐑𝐄𝐄𝐍 𝐅𝐋𝐀𝐆', `┊ ${tag(o)} ${pick(L.greenflag)}`), mentions: [o] }
}
H.chisme = (ctx) => {
  if (!ctx.isGroup) return '👭 Esto solo funciona en grupos, amiga.'
  const o = ctx.menc_os2 || pick(miembros(ctx))
  return { text: caja('☕ 𝐂𝐇𝐈𝐒𝐌𝐄𝐒𝐈𝐓𝐎', `┊ Dicen por ahí que ${tag(o)}\n┊ ${pick(L.chisme)}\n┊\n┊ _(es broma, no se peleen 🤭)_`), mentions: [o] }
}
H.piropo = (ctx) => {
  const o = ctx.menc_os2
  return o ? { text: `💌 ${tag(o)}\n\n${pick(L.piropo)}`, mentions: [o] } : `💌 ${pick(L.piropo)}`
}

const simple = (titulo, lista) => () => caja(titulo, `┊ ${pick(lista)}`)
H.indirecta = simple('💅 𝐈𝐍𝐃𝐈𝐑𝐄𝐂𝐓𝐀 𝐏𝐀𝐑𝐀 𝐓𝐔 𝐄𝐒𝐓𝐀𝐃𝐎', L.indirecta)
H.frasetoxica = simple('☠️ 𝐅𝐑𝐀𝐒𝐄 𝐓𝐎́𝐗𝐈𝐂𝐀', L.frasetoxica)
H.amorpropio = simple('🌸 𝐀𝐌𝐎𝐑 𝐏𝐑𝐎𝐏𝐈𝐎', L.amorpropio)
H.consejo = simple('💌 𝐂𝐎𝐍𝐒𝐄𝐉𝐎 𝐃𝐄 𝐀𝐌𝐈𝐆𝐀', L.consejo)
H.verdad = simple('🙊 𝐕𝐄𝐑𝐃𝐀𝐃', L.verdad)
H.reto = simple('🔥 𝐑𝐄𝐓𝐎', L.reto)
H.yonunca = simple('🍷 𝐘𝐎 𝐍𝐔𝐍𝐂𝐀 𝐍𝐔𝐍𝐂𝐀', L.yonunca)
H.prefieres = simple('🤔 ¿𝐐𝐔𝐄́ 𝐏𝐑𝐄𝐅𝐈𝐄𝐑𝐄𝐒?', L.prefieres)
H.mood = simple('🫧 𝐓𝐔 𝐌𝐎𝐎𝐃 𝐃𝐄 𝐇𝐎𝐘', L.mood)
H.outfit = simple('👗 𝐎𝐔𝐓𝐅𝐈𝐓 𝐃𝐄𝐋 𝐃𝐈́𝐀', L.outfit)
H.unas = simple('💅 𝐔𝐍̃𝐀𝐒 𝐃𝐄𝐋 𝐃𝐈́𝐀', L.unas)
H.maquillaje = simple('💄 𝐋𝐎𝐎𝐊 𝐃𝐄 𝐌𝐀𝐐𝐔𝐈𝐋𝐋𝐀𝐉𝐄', L.maquillaje)
H.peinado = simple('💇‍♀️ 𝐏𝐄𝐈𝐍𝐀𝐃𝐎 𝐃𝐄𝐋 𝐃𝐈́𝐀', L.peinado)
H.cita = simple('🌹 𝐈𝐃𝐄𝐀 𝐃𝐄 𝐂𝐈𝐓𝐀', L.cita)

H.pregunta = (ctx) => {
  if (!ctx.q) return `🔮 Hazme una pregunta de sí o no.\nEj: *${ctx.prefix}pregunta ¿me extraña?*`
  return caja('🔮 𝐋𝐀 𝐁𝐎𝐋𝐀 𝐓𝐎́𝐗𝐈𝐂𝐀', `┊ ❓ ${ctx.q}\n┊\n┊ 💬 ${pick(L.pregunta)}`)
}

H.tarot = (ctx) => {
  const [carta, sig] = TAROT[porcentajeDelDia('tarot', ctx.sender) % TAROT.length]
  return { text: caja('🃏 𝐓𝐔 𝐂𝐀𝐑𝐓𝐀 𝐃𝐄𝐋 𝐃𝐈́𝐀', `┊ ${tag(ctx.sender)}\n┊ Te salió: *${carta}*\n┊\n┊ ${sig}`, 'Una carta por día, reina 🔮'), mentions: [ctx.sender] }
}
H.aura = (ctx) => {
  const o = ctx.menc_os2 || ctx.sender
  const [c, d] = AURAS[porcentajeDelDia('aura', o) % AURAS.length]
  return { text: caja('✨ 𝐂𝐎𝐋𝐎𝐑 𝐃𝐄 𝐀𝐔𝐑𝐀', `┊ El aura de ${tag(o)} es *${c}*\n┊ Eso significa que es ${d}.`), mentions: [o] }
}
H.flor = (ctx) => {
  const o = ctx.menc_os2 || ctx.sender
  const [f, d] = FLORES[porcentajeDelDia('flor', o) % FLORES.length]
  return { text: caja('🌷 ¿𝐐𝐔𝐄́ 𝐅𝐋𝐎𝐑 𝐄𝐑𝐄𝐒?', `┊ ${tag(o)} es una *${f}*\n┊ ${d}.`), mentions: [o] }
}

H.compatibles = (ctx) => {
  const [s1, s2] = (ctx.args || []).map(normalizar)
  if (!SIGNOS[s1] || !SIGNOS[s2]) return `♈ Escribe dos signos.\nEj: *${ctx.prefix}compatibles leo escorpio*\n\nSignos: aries, tauro, géminis, cáncer, leo, virgo, libra, escorpio, sagitario, capricornio, acuario, piscis`
  const e1 = SIGNOS[s1], e2 = SIGNOS[s2]
  const buena = (e1 === 'fuego' && e2 === 'aire') || (e1 === 'aire' && e2 === 'fuego') || (e1 === 'tierra' && e2 === 'agua') || (e1 === 'agua' && e2 === 'tierra')
  const base = e1 === e2 ? 80 : buena ? 70 : 35
  const p = Math.min(100, base + (porcentajeDelDia('signos', [s1, s2].sort().join()) % 21))
  const frase = p >= 85 ? 'Almas gemelas 💍 el universo los quiere juntos.' : p >= 70 ? 'Muy buena química 🔥 se entienden con una mirada.' : p >= 50 ? 'Puede funcionar 🌗 si ponen de su parte.' : 'Uff… mucho drama 🎭 pero a veces lo difícil es lo más rico.'
  return caja('♈ 𝐂𝐎𝐌𝐏𝐀𝐓𝐈𝐁𝐈𝐋𝐈𝐃𝐀𝐃 𝐙𝐎𝐃𝐈𝐀𝐂𝐀𝐋', `┊ ${s1} (${e1}) 💞 ${s2} (${e2})\n┊ *${p}%* compatibles\n┊ ${barra(p)}\n┊\n┊ ${frase}`)
}

H.nombrebebe = (ctx) => {
  const t = normalizar(ctx.q)
  const lista = t.startsWith('nino') ? L.nombreNino : t.startsWith('nina') ? L.nombreNina : L.nombreNina.concat(L.nombreNino)
  const nombres = [...lista].sort(() => Math.random() - 0.5).slice(0, 3)
  return caja('👶 𝐍𝐎𝐌𝐁𝐑𝐄𝐒 𝐃𝐄 𝐁𝐄𝐁𝐄́', nombres.map(n => `┊ 🍼 ${n}`).join('\n'), `Usa ${ctx.prefix}nombrebebe niña / niño 🎀`)
}

H.miciclo = (ctx) => {
  const m = String(ctx.args && ctx.args[0] || '').match(/^(\d{1,2})[\/\-.](\d{1,2})(?:[\/\-.](\d{2,4}))?$/)
  if (!m) return caja('🩸 𝐂𝐀𝐋𝐂𝐔𝐋𝐀𝐃𝐎𝐑𝐀 𝐃𝐄 𝐂𝐈𝐂𝐋𝐎', `┊ Escribe la fecha en que empezó tu última regla\n┊ y (opcional) cada cuántos días te viene.\n┊\n┊ Ej: *${ctx.prefix}miciclo 25/10/2026 28*\n┊ Ej: *${ctx.prefix}miciclo 25/10*`)
  const ahora = new Date()
  let anio = m[3] ? Number(m[3].length === 2 ? '20' + m[3] : m[3]) : ahora.getFullYear()
  const inicio = new Date(anio, Number(m[2]) - 1, Number(m[1]))
  if (isNaN(inicio) || inicio.getMonth() !== Number(m[2]) - 1) return '💔 Esa fecha no es válida, reina. Usa DD/MM o DD/MM/AAAA.'
  if (!m[3] && inicio > ahora) inicio.setFullYear(anio - 1)
  if (inicio > ahora) return '💔 La fecha no puede ser del futuro, amiga.'
  let ciclo = Number(ctx.args[1]) || 28
  if (ciclo < 21 || ciclo > 45) return '💔 El ciclo debe estar entre 21 y 45 días.'
  const dia = 86400000
  let proxima = new Date(inicio.getTime() + ciclo * dia)
  while (proxima < new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate())) proxima = new Date(proxima.getTime() + ciclo * dia)
  const ovulacion = new Date(proxima.getTime() - 14 * dia)
  const fertilIni = new Date(ovulacion.getTime() - 5 * dia)
  const fertilFin = new Date(ovulacion.getTime() + 1 * dia)
  const faltan = Math.ceil((proxima - ahora) / dia)
  const cuerpo = `┊ 📅 Última regla: *${fechaBonita(inicio)}*\n┊ 🔁 Ciclo: *${ciclo} días*\n┊\n┊ 🩸 Próxima regla: *${fechaBonita(proxima)}*\n┊    (faltan ~${faltan} día${faltan === 1 ? '' : 's'})\n┊ 🌸 Ventana fértil: *${fechaBonita(fertilIni)} – ${fechaBonita(fertilFin)}*\n┊ 🥚 Ovulación aprox.: *${fechaBonita(ovulacion)}*\n┊\n┊ 💡 Ten a mano toallitas y chocolate 🍫`
  return caja('🩸 𝐓𝐔 𝐂𝐈𝐂𝐋𝐎', cuerpo, 'Es solo un estimado, no sirve como anticonceptivo. Ante dudas, consulta a tu ginecóloga 💗')
}

H.menutoxica = (ctx) => {
  try {
    delete require.cache[require.resolve('../../settings/Bot/Js/menu.js')]
    return require('../../settings/Bot/Js/menu.js').menuToxica(ctx.prefix)
  } catch (e) { return '💔 No pude cargar el menú de chicas.' }
}

H.interaccion = (ctx, clave) => {
  const it = INTERACCIONES[clave]
  const o = ctx.menc_os2
  if (!o || esYo(ctx, o)) return { text: `${it.e} ${tag(ctx.sender)} ${it.sola} ${pick(KAOMOJI)}`, mentions: [ctx.sender] }
  return { text: `${it.e} ${tag(ctx.sender)} ${it.con} ${tag(o)} ${pick(KAOMOJI)}`, mentions: [ctx.sender, o] }
}

// alias de comandos → handler
const ALIAS = {
  toxicometro: 'toxica', tóxica: 'toxica', toxicómetro: 'toxica',
  divometro: 'diva', celosometro: 'celosa', dramaqueen: 'dramatica', dramática: 'dramatica',
  bestie: 'bff', amigas: 'bff', mejoramiga: 'bff',
  'uñas': 'unas', nails: 'unas', makeup: 'maquillaje',
  quepreferis: 'prefieres', quéprefieres: 'prefieres', queprefieres: 'prefieres',
  'tarotdia': 'tarot', amorpropia: 'amorpropio', autoestima: 'amorpropio',
  bola: 'pregunta', '8ball': 'pregunta', yonuncanunca: 'yonunca', signos: 'compatibles',
  periodo: 'miciclo', ciclo: 'miciclo', bebe: 'nombrebebe', topdivas: 'top', menuchicas: 'menutoxica', menufemenino: 'menutoxica'
}

const COMANDOS = [...new Set([
  ...Object.keys(H).filter(k => k !== 'interaccion'),
  ...Object.keys(ALIAS).filter(k => ALIAS[k]),
  ...Object.keys(INTERACCIONES), ...Object.keys(ALIAS_INTER)
])]

async function ejecutar(ctx) {
  const cmd = String(ctx.command || '').toLowerCase()
  let clave = H[cmd] && cmd !== 'interaccion' ? cmd : ALIAS[cmd]
  let res
  if (clave && H[clave]) {
    res = await H[clave](ctx)
  } else {
    const inter = INTERACCIONES[cmd] ? cmd : ALIAS_INTER[cmd]
    if (!inter) return false
    res = H.interaccion(ctx, inter)
  }
  if (!res) return true
  const msg = typeof res === 'string' ? { text: res } : res
  try { if (ctx.reagir) ctx.reagir(ctx.from, pick(['🎀', '💅', '💗', '✨', '👑', '💋'])) } catch {}
  await ctx.sandro.sendMessage(ctx.from, msg, { quoted: ctx.info })
  return true
}

module.exports = { ejecutar, comandos: COMANDOS }
