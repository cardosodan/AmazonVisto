// Gera es.html (versão em espanhol) a partir do index.html.
//
// Uso (na pasta do projeto):  node scripts/gerar-es.mjs
//
// Rode de novo sempre que mudar o index.html; assim as duas versões nunca
// saem de sincronia. Se aparecer um texto novo em português, adicione o par
// [português, espanhol] na lista TEXTOS abaixo. No fim, o script avisa as
// traduções que não acharam o texto e os trechos que ainda parecem
// português no es.html.
import { readFileSync, writeFileSync } from "node:fs";

const raiz = new URL("..", import.meta.url);
let h = readFileSync(new URL("index.html", raiz), "utf8");
const nl = h.includes("\r\n") ? "\r\n" : "\n";
h = h.replace(/\r\n/g, "\n");

// --------------------------------------------------------------------------
// Nomes dos serviços dentro das mensagens prontas do WhatsApp. Os mais
// longos primeiro, para "Intercâmbio" não pegar antes do nome completo.
// --------------------------------------------------------------------------
const SERVICOS = [
  ["Intercâmbio: Estudo e Trabalho", "Intercambio: Estudio y Trabajo"],
  ["Passaporte Brasileiro", "Pasaporte Brasileño"],
  ["Visto Americano", "Visa Americana"],
  ["Visto Canadense", "Visa Canadiense"],
  ["Visto Chinês", "Visa China"],
  ["Visto Peruano", "Visa Peruana"],
  ["Intercâmbio", "Intercambio"],
];

// --------------------------------------------------------------------------
// Links de WhatsApp com mensagem: na versão em espanhol todos vão para o
// número do Peru (+51), com a mensagem traduzida.
// --------------------------------------------------------------------------
const WHATSAPP_PT = "5592981265897";
const WHATSAPP_ES = "51939125188";

function traduzirMensagem(pt) {
  let m = pt;
  for (const [a, b] of SERVICOS) m = m.split(a).join(b);
  const mapa = [
    ["Olá! Vim pelo site e gostaria de mais informações sobre visto.", "¡Hola! Vengo del sitio web y me gustaría más información sobre visas."],
    ["Olá! Vim pelo site e quero fazer a consulta inicial gratuita.", "¡Hola! Vengo del sitio web y quiero hacer la consulta inicial gratuita."],
    ["Olá! Vim pelo site e tenho uma dúvida.", "¡Hola! Vengo del sitio web y tengo una duda."],
  ];
  for (const [a, b] of mapa) if (m === a) return b;
  const r = m.match(/^Olá! Vim pelo site e gostaria de mais informações sobre (.+)\.$/);
  if (r) return `¡Hola! Vengo del sitio web y me gustaría más información sobre ${r[1]}.`;
  throw new Error(`Mensagem de WhatsApp sem tradução: "${pt}"`);
}

h = h.replace(new RegExp(`https://wa\\.me/${WHATSAPP_PT}\\?text=([^"]+)`, "g"), (m, texto) => {
  const es = traduzirMensagem(decodeURIComponent(texto));
  return `https://wa.me/${WHATSAPP_ES}?text=${encodeURIComponent(es)}`;
});

// --------------------------------------------------------------------------
// Trocas de estrutura (atributos, idioma, números dos formulários).
// --------------------------------------------------------------------------
const ESTRUTURA = [
  [`<html lang="pt-BR">`, `<html lang="es">`],
  [`<meta property="og:locale" content="pt_BR" />`, `<meta property="og:locale" content="es_LA" />`],
  [`<meta property="og:url" content="https://www.amazonvisto.com.br/" />`, `<meta property="og:url" content="https://www.amazonvisto.com.br/es.html" />`],
  // O seletor de idioma, na barra e no rodapé, passa a levar ao português.
  [
    `<a class="barra__idioma" href="es.html" hreflang="es" lang="es">Español</a>`,
    `<a class="barra__idioma" href="index.html" hreflang="pt-BR" lang="pt-BR">Português</a>`,
  ],
  [
    `<li><a href="es.html" hreflang="es" lang="es">Versión en español</a></li>`,
    `<li><a href="index.html" hreflang="pt-BR" lang="pt-BR">Versão em português</a></li>`,
  ],
  // Os formulários (conversa da capa e cupom) enviam para o número do Peru.
  [`action="https://wa.me/${WHATSAPP_PT}"`, `action="https://wa.me/${WHATSAPP_ES}"`],
  [`data-whatsapp="${WHATSAPP_PT}"`, `data-whatsapp="${WHATSAPP_ES}"`],
  [`data-rotulo-abrir="Abrir menu"`, `data-rotulo-abrir="Abrir menú"`],
  [`data-rotulo-fechar="Fechar menu"`, `data-rotulo-fechar="Cerrar menú"`],
  [`aria-label="Navegação principal"`, `aria-label="Navegación principal"`],
  [`aria-label="Falar no WhatsApp"`, `aria-label="Hablar por WhatsApp"`],
  [`aria-label="Escolha o seu caso"`, `aria-label="Elige tu caso"`],
  [`<nav aria-label="Serviços">`, `<nav aria-label="Servicios">`],
  [`<nav aria-label="A empresa">`, `<nav aria-label="La empresa">`],
  // A presença no topo da conversa, com a abreviação do próprio WhatsApp em espanhol ("últ. vez").
  [`data-online="online agora"`, `data-online="en línea ahora"`],
  [`data-visto="visto por último {dia} às 18:00"`, `data-visto="últ. vez {dia} a las 18:00"`],
  [`data-hoje="hoje"`, `data-hoje="hoy"`],
  [`data-ontem="ontem"`, `data-ontem="ayer"`],
  [`data-sexta="sexta"`, `data-sexta="el viernes"`],
  [`<strong>R$ TROCAR</strong>`, `<strong>TROCAR</strong>`],
];

// --------------------------------------------------------------------------
// Textos. Espaços no português casam com qualquer quebra de linha ou
// indentação do HTML, então dá para colar o texto "corrido". Frases que
// CONTÊM trechos menores da lista vêm antes deles.
// --------------------------------------------------------------------------
const TEXTOS = [
  // <head>
  ["Amazon Visto | Visto Americano, Canadense, Chinês e Passaporte", "Amazon Visto | Visa Americana, Canadiense, China y Pasaporte"],
  [
    "Assessoria completa em vistos (Americano, Canadense, Chinês, Peruano), passaporte brasileiro e intercâmbio. Atendimento presencial em Manaus-AM e Brasília-DF, e 100% online para todo o Brasil. Parcele em até 10x sem juros.",
    "Asesoría completa en visas (americana, canadiense, china, peruana), pasaporte brasileño e intercambio. Atención presencial en Manaus-AM y Brasilia-DF, y 100% en línea para Brasil y América Latina. Hasta 10 cuotas sin intereses.",
  ],
  [
    "visto americano, visto canadense, visto chinês, passaporte, intercâmbio, Manaus, Brasília, assessoria de visto",
    "visa americana, visa canadiense, visa china, visa peruana, pasaporte, intercambio, Manaus, Brasilia, asesoría de visas",
  ],
  ["Amazon Visto | Turismo, Estudo e Trabalho", "Amazon Visto | Turismo, Estudio y Trabajo"],
  [
    "Visto Americano, Canadense, Chinês, Peruano e Passaporte, sem sair de casa, parcelado em até 10x. Líder de mercado no Norte.",
    "Visa americana, canadiense, china, peruana y pasaporte, sin salir de casa y en hasta 10 cuotas. Líder del mercado en el Norte de Brasil.",
  ],

  // Barra
  ["Pular para o conteúdo", "Saltar al contenido"],
  [`<a href="#servicos">Serviços</a>`, `<a href="#servicos">Servicios</a>`],
  [`<a href="#como-funciona">Como funciona</a>`, `<a href="#como-funciona">Cómo funciona</a>`],
  [`<a href="#duvidas">Dúvidas</a>`, `<a href="#duvidas">Preguntas</a>`],
  [`<a href="#sobre">Quem somos</a>`, `<a href="#sobre">Quiénes somos</a>`],
  [">Menu</button>", ">Menú</button>"],

  // Capa e conversa
  ["Seu visto, visto por nós", "Tu visa, vista por nosotros"],
  [
    "Assessoria de visto americano, canadense, chinês e peruano, passaporte e intercâmbio. Em Manaus, Brasília ou 100% online, em até 10x sem juros.",
    "Asesoría de visa americana, canadiense, china y peruana, pasaporte e intercambio. En Manaus, Brasilia o 100% en línea, en hasta 10 cuotas sin intereses.",
  ],
  ["Conversar no WhatsApp", "Conversar por WhatsApp"],
  ["Empresa do Ano 2025 · Empresa Destaque 2026", "Empresa del Año 2025 · Empresa Destacada 2026"],
  ["Atendimento de segunda a sexta, das 9h às 18h", "Atención de lunes a viernes, de 9 a 18 h"],
  [
    "Olá! Qual visto você quer tirar? A primeira análise é por nossa conta.",
    "¡Hola! ¿Qué visa quieres tramitar? El primer análisis corre por nuestra cuenta.",
  ],
  [">Renovação do americano</button>", ">Renovación de la americana</button>"],
  [">Peru</button>", ">Perú</button>"],
  [
    "Ótimo! No visto americano a gente monta a sua lista de documentos, preenche o formulário com você, cuida dos agendamentos e prepara você para a entrevista.",
    "¡Genial! En la visa americana armamos tu lista de documentos, llenamos el formulario contigo, nos encargamos de las citas y te preparamos para la entrevista.",
  ],
  [
    "Dá para renovar sem complicação. A gente confere o que muda no seu caso e cuida do processo do começo ao fim.",
    "Se puede renovar sin complicaciones. Revisamos qué cambia en tu caso y nos encargamos del trámite de principio a fin.",
  ],
  [
    "No visto canadense a gente organiza o pedido online, os documentos e o agendamento da biometria.",
    "En la visa canadiense organizamos la solicitud en línea, los documentos y la cita de biometría.",
  ],
  [
    "No visto chinês a gente prepara o formulário e os documentos e acompanha o pedido até o passaporte voltar.",
    "En la visa china preparamos el formulario y los documentos y acompañamos la solicitud hasta que el pasaporte vuelva.",
  ],
  [
    "No visto peruano a gente orienta cada documento e acompanha o pedido, em português ou español.",
    "En la visa peruana te orientamos con cada documento y acompañamos la solicitud, en portugués o español.",
  ],
  [
    "No passaporte a gente cuida do agendamento na Polícia Federal e da lista do que levar no dia.",
    "En el pasaporte brasileño nos encargamos de la cita en la Policía Federal y de la lista de lo que hay que llevar ese día.",
  ],
  [
    "No intercâmbio a gente ajuda a escolher o caminho para estudar ou trabalhar fora e cuida do visto.",
    "En el intercambio te ayudamos a elegir el camino para estudiar o trabajar en el exterior y nos encargamos de la visa.",
  ],
  ["Olá! Vim pelo site e quero tirar o visto americano.", "¡Hola! Vengo del sitio web y quiero tramitar la visa americana."],
  ["Olá! Vim pelo site e quero renovar o meu visto americano.", "¡Hola! Vengo del sitio web y quiero renovar mi visa americana."],
  ["Olá! Vim pelo site e quero tirar o visto canadense.", "¡Hola! Vengo del sitio web y quiero tramitar la visa canadiense."],
  ["Olá! Vim pelo site e quero tirar o visto chinês.", "¡Hola! Vengo del sitio web y quiero tramitar la visa china."],
  ["Olá! Vim pelo site e quero tirar o visto peruano.", "¡Hola! Vengo del sitio web y quiero tramitar la visa peruana."],
  ["Olá! Vim pelo site e quero tirar ou renovar o meu passaporte.", "¡Hola! Vengo del sitio web y quiero tramitar o renovar mi pasaporte."],
  ["Olá! Vim pelo site e quero saber sobre intercâmbio.", "¡Hola! Vengo del sitio web y quiero saber sobre intercambio."],
  ["digitando…", "escribiendo…"],
  ["Sua mensagem para a Amazon Visto", "Tu mensaje para Amazon Visto"],
  [
    "Olá! Vim pelo site e gostaria de mais informações sobre visto.",
    "¡Hola! Vengo del sitio web y me gustaría más información sobre visas.",
  ],
  ["Enviar pelo WhatsApp", "Enviar por WhatsApp"],

  // Serviços: ladrilhos e fichas
  ["Para onde você vai?", "¿A dónde vas?"],
  [
    "Seis serviços e um jeito só de fazer: análise gratuita, documentos sob medida e acompanhamento até o passaporte voltar.",
    "Seis servicios y una sola forma de hacerlo: análisis gratuito, documentos a medida y acompañamiento hasta que el pasaporte vuelva.",
  ],
  ["Visto americano: primeiro visto e renovação", "Visa americana: primera visa y renovación"],
  ["Visto canadense: visitante, com a biometria agendada", "Visa canadiense: visitante, con la biometría agendada"],
  ["Visto chinês: turismo e negócios", "Visa china: turismo y negocios"],
  ["Visto peruano: em português ou español", "Visa peruana: en portugués o español"],
  ["Brasileiro: emissão e renovação", "Brasileño: emisión y renovación"],
  [`<span class="destino__nome">Peru</span>`, `<span class="destino__nome">Perú</span>`],
  ["Estudo e trabalho fora do Brasil", "Estudio y trabajo fuera de Brasil"],
  ["Passaporte e cartão de embarque sobre a mesa", "Pasaporte y tarjeta de embarque sobre la mesa"],
  ["Toronto ao entardecer, com a CN Tower", "Toronto al atardecer, con la CN Tower"],
  ["A Grande Muralha da China entre montanhas", "La Gran Muralla China entre montañas"],
  ["Machu Picchu, no Peru, entre as montanhas", "Machu Picchu, en Perú, entre las montañas"],
  ["O Rio de Janeiro visto do alto, com as montanhas ao fundo", "Río de Janeiro visto desde lo alto, con las montañas al fondo"],
  ["Estudantes numa sala de aula", "Estudiantes en un aula"],
  ["Novo visto ou renovação, para turismo ou negócios, sem sair de casa.", "Visa nueva o renovación, para turismo o negocios, sin salir de casa."],
  ["Visto de turista para o Canadá, com assessoria completa do início ao fim.", "Visa de turista para Canadá, con asesoría completa de principio a fin."],
  ["Turismo e negócios na China, com parcelamento em até 10x sem juros.", "Turismo y negocios en China, en hasta 10 cuotas sin intereses."],
  [
    "Assessoria para o visto de entrada no Peru, com atendimento em português e español.",
    "Asesoría para la visa de entrada a Perú, con atención en portugués y español.",
  ],
  ["Emissão e renovação pelo WhatsApp: zero burocracia, rapidez e comodidade.", "Emisión y renovación por WhatsApp: cero burocracia, rapidez y comodidad."],
  ["Orientação completa para quem quer estudar ou trabalhar fora do Brasil.", "Orientación completa para quien quiere estudiar o trabajar fuera de Brasil."],
  ["<dt>Modalidade</dt>", "<dt>Modalidad</dt>"],
  ["<dt>Atendimento</dt>", "<dt>Atención</dt>"],
  ["<dt>Pagamento</dt>", "<dt>Pago</dt>"],
  ["<dd>Até 10x sem juros</dd>", "<dd>Hasta 10 cuotas sin intereses</dd>"],
  ["<dd>Peru</dd>", "<dd>Perú</dd>"],
  ["<dd>À sua escolha</dd>", "<dd>A tu elección</dd>"],
  ["<dd>Turismo e negócios (B1/B2)</dd>", "<dd>Turismo y negocios (B1/B2)</dd>"],
  ["<dd>Visto de visitante (TRV)</dd>", "<dd>Visa de visitante (TRV)</dd>"],
  ["<dd>Turismo (L) e negócios (M)</dd>", "<dd>Turismo (L) y negocios (M)</dd>"],
  ["<dd>Visto de entrada</dd>", "<dd>Visa de entrada</dd>"],
  ["<dd>Estudo e trabalho no exterior</dd>", "<dd>Estudio y trabajo en el exterior</dd>"],
  ["<dd>Online ou presencial</dd>", "<dd>En línea o presencial</dd>"],
  ["<dd>Pelo WhatsApp</dd>", "<dd>Por WhatsApp</dd>"],
  [">Em português ou español<", ">En portugués o español<"],
  [">Emissão e renovação<", ">Emisión y renovación<"],
  ["O caminho, com a gente", "El camino, con nosotros"],
  ["<strong>Formulário DS-160</strong> Preenchemos com você, em português.", "<strong>Formulario DS-160</strong> Lo llenamos contigo, en tu idioma."],
  ["<strong>Taxa consular</strong> Explicamos o valor e como pagar.", "<strong>Tasa consular</strong> Te explicamos el valor y cómo pagarla."],
  ["<strong>Fotos e digitais no CASV</strong> Agendamos e dizemos o que levar.", "<strong>Fotos y huellas en el CASV</strong> Agendamos la cita y te decimos qué llevar."],
  ["<strong>Entrevista no consulado</strong> Preparamos você para o dia.", "<strong>Entrevista en el consulado</strong> Te preparamos para ese día."],
  [">O que está incluso<", ">Qué incluye<"],
  ["Consulta inicial gratuita para entender o seu objetivo", "Consulta inicial gratuita para entender tu objetivo"],
  ["Lista exata de documentos para o seu caso", "Lista exacta de documentos para tu caso"],
  ["Acompanhamento do processo junto ao consulado ou embaixada", "Acompañamiento del trámite ante el consulado o la embajada"],
  ["Acompanhamento de cada etapa da emissão ou renovação", "Acompañamiento de cada etapa de la emisión o renovación"],
  ["Orientação completa para estudar ou trabalhar fora do Brasil", "Orientación completa para estudiar o trabajar fuera de Brasil"],
  ["Atualizações a cada etapa, pelo WhatsApp", "Novedades en cada etapa, por WhatsApp"],
  ["TROCAR: itens específicos deste serviço", "TROCAR: ítems específicos de este servicio"],
  ["A partir de <strong>", "Desde <strong>"],
  ["Conversar sobre o visto americano", "Conversar sobre la visa americana"],
  ["Conversar sobre o visto canadense", "Conversar sobre la visa canadiense"],
  ["Conversar sobre o visto chinês", "Conversar sobre la visa china"],
  ["Conversar sobre o visto peruano", "Conversar sobre la visa peruana"],
  ["Conversar sobre o passaporte", "Conversar sobre el pasaporte"],
  ["Conversar sobre intercâmbio", "Conversar sobre intercambio"],
  [">Passaporte brasileiro<", ">Pasaporte brasileño<"],

  // Como funciona
  ["Da papelada ao visto", "Del papeleo a la visa"],
  [
    "Sozinho, o visto é uma pilha de formulários, taxas e agendamentos, muitas vezes em outro idioma. Com a gente, vira uma conversa só.",
    "Solo, la visa es una pila de formularios, tasas y citas, muchas veces en otro idioma. Con nosotros, se vuelve una sola conversación.",
  ],
  ["<h3>Sozinho</h3>", "<h3>Solo</h3>"],
  ["<h3>Com a gente</h3>", "<h3>Con nosotros</h3>"],
  ["<h3>Visto <svg", "<h3>Visa <svg"],
  [
    "Formulário, taxa, agendamento, documentos e entrevista, cada um num site diferente.",
    "Formulario, tasa, citas, documentos y entrevista, cada uno en un sitio distinto.",
  ],
  [
    "Uma conversa no WhatsApp: a gente organiza tudo e avisa você a cada etapa.",
    "Una conversación por WhatsApp: organizamos todo y te avisamos en cada etapa.",
  ],
  [
    "Passaporte de volta e viagem marcada. Quem decide é o consulado; o caminho fica leve.",
    "Pasaporte de vuelta y viaje programado. Quien decide es el consulado; el camino se vuelve liviano.",
  ],

  // Provas (a Amazon Visto conta)
  ["Por que confiar", "Por qué confiar"],
  [
    "Fomos <strong>Empresa do Ano em 2025</strong> e <strong>Empresa Destaque em 2026</strong>.",
    "Fuimos <strong>Empresa del Año en 2025</strong> y <strong>Empresa Destacada en 2026</strong>.",
  ],
  ["O Teatro Amazonas, no Centro de Manaus", "El Teatro Amazonas, en el Centro de Manaus"],
  ["Daqui do Centro de Manaus, atendemos o Brasil inteiro.", "Desde el Centro de Manaus atendemos a todo Brasil y a América Latina."],
  [
    "Já ajudamos milhares de clientes, e <strong><span data-contar>55,7 mil</span> pessoas</strong> acompanham a gente no Instagram.",
    "Ya ayudamos a miles de clientes, y <strong><span data-contar>55,7 mil</span> personas</strong> nos siguen en Instagram.",
  ],
  ["Atendemos em Manaus, em Brasília e 100% online, em português ou español.", "Atendemos en Manaus, en Brasilia y 100% en línea, en portugués o español."],
  ["E você parcela em até <strong>10x sem juros</strong> no cartão.", "Y pagas en hasta <strong>10 cuotas sin intereses</strong> con tarjeta."],

  // Sobre
  ["Líder de mercado no Norte do Brasil", "Líder en el Norte de Brasil"],
  ["A sala da Amazon Visto no Centro de Manaus", "La oficina de Amazon Visto en el Centro de Manaus"],
  ["No Centro de Manaus", "En el Centro de Manaus"],
  [
    "Atendemos na Rua Costa Azevedo, 9, sala 901, no Centro de Manaus, e em Brasília. Quem preferir faz tudo 100% online, de qualquer lugar do Brasil.",
    "Atendemos en la Rua Costa Azevedo, 9, sala 901, en el Centro de Manaus, y en Brasilia. Quien prefiera lo hace todo 100% en línea, desde cualquier lugar de Brasil o de América Latina.",
  ],
  ["Tudo pela conversa", "Todo por la conversación"],
  [
    "Já ajudamos milhares de clientes a estudar, trabalhar ou conhecer o mundo, com total segurança dos seus dados. Entrevista e biometria, quando o consulado pede, são feitas por você, no posto consular.",
    "Ya ayudamos a miles de clientes a estudiar, trabajar o conocer el mundo, con total seguridad de tus datos. La entrevista y la biometría, cuando el consulado las pide, las haces tú, en la oficina consular.",
  ],
  ["Falar com a equipe", "Hablar con el equipo"],

  // Dúvidas
  [">Dúvidas</h2>", ">Preguntas</h2>"],
  ["Vocês garantem a aprovação do visto?", "¿Garantizan la aprobación de la visa?"],
  [
    "Não, e desconfie de quem garante. A decisão é sempre do consulado ou da embaixada de cada país. O nosso trabalho é montar a documentação certa para o seu caso e acompanhar cada etapa do processo, para você chegar preparado.",
    "No, y desconfía de quien lo garantice. La decisión es siempre del consulado o de la embajada de cada país. Nuestro trabajo es armar la documentación correcta para tu caso y acompañar cada etapa del trámite, para que llegues preparado.",
  ],
  ["A primeira consulta é paga?", "¿La primera consulta tiene costo?"],
  [
    "Não. Você conta o seu objetivo (turismo, estudo ou trabalho) e recebe uma análise inicial sem custo, pelo WhatsApp. Os honorários podem ser parcelados em até 10x sem juros no cartão.",
    "No. Nos cuentas tu objetivo (turismo, estudio o trabajo) y recibes un análisis inicial sin costo, por WhatsApp. Los honorarios se pueden pagar en hasta 10 cuotas sin intereses con tarjeta.",
  ],
  ["em até 10x sem juros no cartão", "en hasta 10 cuotas sin intereses con tarjeta"],
  ["Vocês fazem renovação de visto?", "¿Hacen renovación de visa?"],
  [
    "Sim. No visto americano atendemos tanto o primeiro visto quanto a renovação, para turismo ou negócios.",
    "Sí. En la visa americana atendemos tanto la primera visa como la renovación, para turismo o negocios.",
  ],
  ["A taxa consular está incluída no valor?", "¿La tasa consular está incluida en el precio?"],
  [
    "A taxa consular é cobrada pelo governo de cada país e é separada dos honorários da assessoria. Na consulta inicial explicamos o valor da taxa para o seu visto e como ela é paga.",
    "La tasa consular la cobra el gobierno de cada país y es independiente de los honorarios de la asesoría. En la consulta inicial te explicamos el valor de la tasa para tu visa y cómo se paga.",
  ],
  ["Quanto tempo demora para o visto sair?", "¿Cuánto tarda en salir la visa?"],
  [
    "Depende do tipo de visto e da agenda de cada consulado, que muda ao longo do ano. Na consulta inicial passamos a estimativa atualizada para o seu caso.",
    "Depende del tipo de visa y de la agenda de cada consulado, que cambia a lo largo del año. En la consulta inicial te damos la estimación actualizada para tu caso.",
  ],
  ["Vocês atendem em espanhol?", "¿Atienden en español?"],
  [
    "Sí. Para clientes de língua espanhola, o atendimento é pelo WhatsApp",
    "Sí. Para clientes de habla hispana, la atención es por WhatsApp al",
  ],

  // Contato (cupom)
  ["Comece a conversa", "Empieza a conversar"],
  [
    "Preencha e a mensagem sai pronta para o nosso WhatsApp. A análise inicial é gratuita.",
    "Completa los datos y el mensaje sale listo para nuestro WhatsApp. El análisis inicial es gratuito.",
  ],
  [
    "Olá! Meu nome é {nome}, sou de {cidade} e quero ajuda com: {servico} ({situacao}).",
    "¡Hola! Me llamo {nome}, soy de {cidade} y quiero ayuda con: {servico} ({situacao}).",
  ],
  [`placeholder="Seu nome"`, `placeholder="Tu nombre"`],
  [`placeholder="Sua cidade"`, `placeholder="Tu ciudad"`],
  [">Seu nome</label>", ">Tu nombre</label>"],
  [">Serviço</label>", ">Servicio</label>"],
  [">Situação</label>", ">Situación</label>"],
  [">Sua cidade</label>", ">Tu ciudad</label>"],
  ["<option>Renovação do visto americano</option>", "<option>Renovación de la visa americana</option>"],
  ["<option value=\"primeira vez\">Primeira vez</option>", "<option value=\"primera vez\">Primera vez</option>"],
  ["<option value=\"já tive antes\">Já tive antes</option>", "<option value=\"ya la tuve antes\">Ya la tuve antes</option>"],
  ["<option value=\"ainda não sei\">Ainda não sei</option>", "<option value=\"todavía no sé\">Todavía no sé</option>"],

  // Rodapé
  ["<h2>Serviços</h2>", "<h2>Servicios</h2>"],
  ["<h2>A empresa</h2>", "<h2>La empresa</h2>"],
  ["<h2>Fale com a gente</h2>", "<h2>Habla con nosotros</h2>"],
  ["<h2>Onde estamos</h2>", "<h2>Dónde estamos</h2>"],
  ["Também em Brasília-DF", "También en Brasilia-DF"],
  ["Segunda a sexta, das 9h às 18h", "De lunes a viernes, de 9 a 18 h"],
  ["Reputação no Reclame Aqui", "Reputación en Reclame Aqui"],
  ["Todos os direitos reservados.", "Todos los derechos reservados."],
  ["Desenvolvido por", "Desarrollado por"],
  ["Fotos e vídeo:", "Fotos y video:"],
  [">passaporte e cartão de embarque</a>", ">pasaporte y tarjeta de embarque</a>"],
  [">nuvens pela janela do avião</a>", ">nubes desde la ventana del avión</a>"],
  ["Fonte Chillax, da Indian Type Foundry, via Fontshare.", "Fuente Chillax, de Indian Type Foundry, vía Fontshare."],
  ["Voltar ao início", "Volver al inicio"],

  // Nomes curtos dos serviços (ladrilhos, botões da conversa, títulos das
  // fichas, opções do cupom, rodapé): por último, depois das frases que os
  // contêm.
  [">Visto americano<", ">Visa americana<"],
  [">Visto canadense<", ">Visa canadiense<"],
  [">Visto chinês<", ">Visa china<"],
  [">Visto peruano<", ">Visa peruana<"],
  [">Passaporte<", ">Pasaporte<"],
  [">Intercâmbio<", ">Intercambio<"],
];

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const comoRegex = (s) => new RegExp(escapar(s).replace(/ +/g, "\\s+"), "g");

for (const [pt, es] of ESTRUTURA) {
  if (!h.includes(pt)) console.log("Estrutura sem correspondência: " + pt.slice(0, 80));
  h = h.split(pt).join(es);
}

const naoUsados = [];
for (const [pt, es] of TEXTOS) {
  const re = comoRegex(pt);
  if (!re.test(h)) naoUsados.push(pt);
  h = h.replace(comoRegex(pt), es);
}

// Aviso no topo: este arquivo é gerado.
h = h.replace(
  "<head>",
  `<head>
  <!-- ARQUIVO GERADO, não edite à mão. É a versão em espanhol do
       index.html, gerada por "node scripts/gerar-es.mjs". Mude o index.html
       (e, se preciso, as traduções no script) e rode o script de novo. -->`
);

writeFileSync(new URL("es.html", raiz), h.replace(/\n/g, nl));

// Relatório: traduções que não acharam o texto (index.html mudou?) e
// trechos visíveis que ainda parecem português.
if (naoUsados.length) {
  console.log("Traduções sem correspondência no index.html:");
  for (const t of naoUsados) console.log("  - " + t.slice(0, 80));
}
const visivel = h
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/<script[\s\S]*?<\/script>/g, "")
  .replace(/<svg[\s\S]*?<\/svg>/g, "")
  .replace(/<a [^>]*lang="pt-BR"[^>]*>[\s\S]*?<\/a>/g, "") // links para o português, de propósito
  .replace(/<[^>]+>/g, "\n");
const suspeitos = visivel
  .split("\n")
  .map((l) => l.trim())
  // Marcas típicas do português que não existem em espanhol (\b não serve
  // para palavras acentuadas, por isso os espaços explícitos).
  .filter((l) => /ção|ções|ã|õ|você| não | do | da | em | é | para o | ou | com | pelo | seu | sua /i.test(` ${l} `));
if (suspeitos.length) {
  console.log("Trechos que parecem português no es.html:");
  for (const s of [...new Set(suspeitos)]) console.log("  - " + s.slice(0, 100));
} else {
  console.log("es.html gerado sem sobras em português.");
}
