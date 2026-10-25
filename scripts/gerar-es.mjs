// Gera es.html (versão em espanhol) a partir do index.html.
//
// Uso (na pasta do projeto):  node scripts/gerar-es.mjs
//
// Rode de novo sempre que mudar o index.html — assim as duas versões nunca
// saem de sincronia. Se aparecer um texto novo em português, adicione o par
// [português, espanhol] na lista TEXTOS abaixo. No fim, o script avisa se
// sobrou algum trecho que parece português no es.html.
import { readFileSync, writeFileSync } from "node:fs";

const raiz = new URL("..", import.meta.url);
let h = readFileSync(new URL("index.html", raiz), "utf8");
const nl = h.includes("\r\n") ? "\r\n" : "\n";
h = h.replace(/\r\n/g, "\n");

// --------------------------------------------------------------------------
// Nomes dos serviços (usados em títulos, legendas, alt, mensagens).
// Os mais longos primeiro, pra "Intercâmbio" não pegar antes do nome completo.
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
// Mensagens prontas do WhatsApp — na versão em espanhol todos os botões vão
// pro número do Peru (+51), com a mensagem traduzida.
// --------------------------------------------------------------------------
const WHATSAPP_PT = "5592981265897";
const WHATSAPP_ES = "51939125188";

function traduzirMensagem(pt) {
  let m = pt;
  for (const [a, b] of SERVICOS) m = m.split(a).join(b);
  const mapa = [
    ["Olá! Vim pelo site e gostaria de mais informações sobre visto.", "¡Hola! Vengo del sitio web y me gustaría más información sobre visas."],
    ["Olá! Vim pelo site e gostaria de mais informações sobre os serviços.", "¡Hola! Vengo del sitio web y me gustaría más información sobre los servicios."],
    ["Olá! Vim pelo site e quero fazer a consulta inicial gratuita.", "¡Hola! Vengo del sitio web y quiero hacer la consulta inicial gratuita."],
    ["Olá! Vim pelo site e tenho uma dúvida.", "¡Hola! Vengo del sitio web y tengo una duda."],
  ];
  for (const [a, b] of mapa) if (m === a) return b;
  let r = m.match(/^Olá! Vim pelo site e gostaria de mais informações sobre (.+)\.$/);
  if (r) return `¡Hola! Vengo del sitio web y me gustaría más información sobre ${r[1]}.`;
  r = m.match(/^Olá! Vim pelo site e quero contratar: (.+)\.$/);
  if (r) return `¡Hola! Vengo del sitio web y quiero contratar: ${r[1]}.`;
  throw new Error(`Mensagem de WhatsApp sem tradução: "${pt}"`);
}

h = h.replace(new RegExp(`https://wa\\.me/${WHATSAPP_PT}\\?text=([^"]+)`, "g"), (m, texto) => {
  const es = traduzirMensagem(decodeURIComponent(texto));
  return `https://wa.me/${WHATSAPP_ES}?text=${encodeURIComponent(es)}`;
});

// --------------------------------------------------------------------------
// Trocas de estrutura (atributos, seletor de idioma, meta tags).
// --------------------------------------------------------------------------
const ESTRUTURA = [
  [`<html lang="pt-BR">`, `<html lang="es">`],
  [`<meta property="og:locale" content="pt_BR" />`, `<meta property="og:locale" content="es_LA" />`],
  [`<meta property="og:url" content="https://www.amazonvisto.com.br/" />`, `<meta property="og:url" content="https://www.amazonvisto.com.br/es.html" />`],
  // Seletor de idioma: no topo e no rodapé, o link passa a levar ao português.
  [
    `<a class="barra__idioma" href="es.html" hreflang="es" lang="es">Español</a>`,
    `<a class="barra__idioma" href="index.html" hreflang="pt-BR" lang="pt-BR">Português</a>`,
  ],
  [
    `<li><a href="es.html" hreflang="es" lang="es">Versión en español</a></li>`,
    `<li><a href="index.html" hreflang="pt-BR" lang="pt-BR">Versão em português</a></li>`,
  ],
  [
    `aria-label="Abrir menu"`,
    `aria-label="Abrir menú"
        data-rotulo-abrir="Abrir menú"
        data-rotulo-fechar="Cerrar menú"`,
  ],
  [`aria-label="Navegação principal"`, `aria-label="Navegación principal"`],
  [`aria-label="Seções do site"`, `aria-label="Secciones del sitio"`],
  [`aria-label="Falar no WhatsApp"`, `aria-label="Hablar por WhatsApp"`],
  [`aria-label="Vista das nuvens pela janela do avião"`, `aria-label="Vista de las nubes desde la ventana del avión"`],
  [`<button type="button" class="painel__fechar" aria-label="Fechar">`, `<button type="button" class="painel__fechar" aria-label="Cerrar">`],
  [`<strong>R$ TROCAR</strong>`, `<strong>TROCAR</strong>`],
  [`<!-- TROCAR: valor "a partir de" deste serviço -->`, `<!-- TROCAR: valor "desde" y moneda de este servicio -->`],
  [`data-rotulo="Por conta própria"`, `data-rotulo="Por tu cuenta"`],
  [`data-rotulo="Com a Amazon Visto"`, `data-rotulo="Con Amazon Visto"`],
  [
    `data-destinos="JFK:Para Nova York|YYZ:Para Toronto|PEK:Para Pequim|LIM:Para Lima"`,
    `data-destinos="JFK:A Nueva York|YYZ:A Toronto|PEK:A Pekín|LIM:A Lima"`,
  ],
];

// --------------------------------------------------------------------------
// Textos visíveis. Espaços no português casam com qualquer quebra de linha
// ou indentação do HTML, então dá pra colar o texto "corrido".
// Frases que CONTÊM outros trechos da lista vêm antes deles (senão o trecho
// menor é traduzido primeiro e a frase inteira não casa mais).
// --------------------------------------------------------------------------
const TEXTOS = [
  // Contêm trechos traduzidos mais abaixo ("em até 10x sem juros no cartão",
  // "Como funciona"), por isso vêm primeiro.
  [
    "Resolvemos tudo pelo WhatsApp, com total segurança dos seus dados, e você parcela em até 10x sem juros no cartão, em português ou español.",
    "Resolvemos todo por WhatsApp, con total seguridad de tus datos, y pagas en hasta 10 cuotas sin intereses con tarjeta, en portugués o español.",
  ],
  [
    "Os honorários podem ser parcelados em até 10x sem juros no cartão.",
    "Los honorarios se pueden pagar en hasta 10 cuotas sin intereses con tarjeta.",
  ],
  ["Como funciona o pagamento?", "¿Cómo funciona el pago?"],

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
    "Visto Americano, Canadense, Chinês, Peruano e Passaporte — sem sair de casa, parcelado em até 10x. Líder de mercado no Norte.",
    "Visa americana, canadiense, china, peruana y pasaporte, sin salir de casa y en hasta 10 cuotas. Líder del mercado en el Norte de Brasil.",
  ],

  // Barra e menu
  ["Pular para o conteúdo", "Saltar al contenido"],
  [`<span class="barra__menu-texto">Menu</span>`, `<span class="barra__menu-texto">Menú</span>`],
  [">Fale conosco</a>", ">Hablemos</a>"],
  [`class="navegacao__link">Serviços</a>`, `class="navegacao__link">Servicios</a>`],
  [`class="navegacao__link">Sobre nós</a>`, `class="navegacao__link">Nosotros</a>`],
  [`class="navegacao__link">Dúvidas</a>`, `class="navegacao__link">Preguntas</a>`],
  [`class="navegacao__link">Contato</a>`, `class="navegacao__link">Contacto</a>`],
  ["Fale com um especialista", "Habla con un especialista"],

  // Capa e pastas
  [
    "Assessoria de vistos e passaporte em Manaus, Brasília e 100% online. Parcele em até 10x sem juros.",
    "Asesoría de visas y pasaporte en Manaus, Brasilia y 100% en línea. Paga en hasta 10 cuotas sin intereses.",
  ],
  [`<span class="pasta__aba">Contato</span>`, `<span class="pasta__aba">Contacto</span>`],
  [`<span class="pasta__aba">Dúvidas</span>`, `<span class="pasta__aba">Preguntas</span>`],
  [`<span class="pasta__aba">Sobre nós</span>`, `<span class="pasta__aba">Nosotros</span>`],
  [`aria-hidden="true">Serviços</span>`, `aria-hidden="true">Servicios</span>`],
  ["Como funciona", "Cómo funciona"],

  // Rodapé (vem antes porque contém "Empresa do Ano 2025 e Empresa Destaque 2026")
  [
    "Assessoria completa em vistos, passaporte e intercâmbio. Líder de mercado no Norte do Brasil, Empresa do Ano 2025 e Empresa Destaque 2026, com atendimento 100% online para todo o país.",
    "Asesoría completa en visas, pasaporte e intercambio. Líder del mercado en el Norte de Brasil, Empresa del Año 2025 y Empresa Destacada 2026, con atención 100% en línea.",
  ],

  // Serviços
  ["Empresa do Ano 2025 e Empresa Destaque 2026", "Empresa del Año 2025 y Empresa Destacada 2026"],
  ["Escolha o seu destino", "Elige tu destino"],
  [
    "Novo visto ou renovação, para turismo ou negócios, sem sair de casa.",
    "Visa nueva o renovación, para turismo o negocios, sin salir de casa.",
  ],
  [
    "Visto de turista para o Canadá, com assessoria completa do início ao fim.",
    "Visa de turista para Canadá, con asesoría completa de principio a fin.",
  ],
  [
    "Turismo e negócios na China, com parcelamento em até 10x sem juros.",
    "Turismo y negocios en China, en hasta 10 cuotas sin intereses.",
  ],
  [
    "Assessoria para o visto de entrada no Peru, com atendimento em português e español.",
    "Asesoría para la visa de entrada a Perú, con atención en portugués y español.",
  ],
  [
    "Emissão e renovação pelo WhatsApp: zero burocracia, rapidez e comodidade.",
    "Emisión y renovación por WhatsApp: cero burocracia, rapidez y comodidad.",
  ],
  [
    "Orientação completa para quem quer estudar ou trabalhar fora do Brasil.",
    "Orientación completa para quien quiere estudiar o trabajar fuera de Brasil.",
  ],
  ["Consultar no WhatsApp", "Consultar por WhatsApp"],
  [">O que está incluso<", ">Qué incluye<"],

  // Painel "o que está incluso"
  ["A partir de <strong>", "Desde <strong>"],
  ["em até 10x sem juros no cartão", "en hasta 10 cuotas sin intereses con tarjeta"],
  ["Lista exata de documentos para o seu caso específico, sem enrolação.", "Lista exacta de documentos para tu caso específico, sin rodeos."],
  ["Lista exata de documentos para o seu caso", "Lista exacta de documentos para tu caso"],
  ["Consulta inicial gratuita para entender o seu objetivo", "Consulta inicial gratuita para entender tu objetivo"],
  ["Acompanhamento do processo junto ao consulado ou embaixada", "Acompañamiento del trámite ante el consulado o la embajada"],
  ["Acompanhamento de cada etapa da emissão ou renovação", "Acompañamiento de cada etapa de la emisión o renovación"],
  ["Orientação completa para estudar ou trabalhar fora do Brasil", "Orientación completa para estudiar o trabajar fuera de Brasil"],
  ["Atualizações a cada etapa, pelo WhatsApp", "Novedades en cada etapa, por WhatsApp"],
  ["TROCAR: itens específicos deste serviço", "TROCAR: ítems específicos de este servicio"],
  ["<dt>Prazo médio</dt>", "<dt>Plazo promedio</dt>"],
  ["Quero este serviço", "Quiero este servicio"],

  // Como funciona
  ["Primeiro, a conversa", "Primero, la conversación"],
  [
    "Você conta o seu objetivo (turismo, estudo ou trabalho) e recebe uma análise gratuita pelo WhatsApp.",
    "Nos cuentas tu objetivo (turismo, estudio o trabajo) y recibes un análisis gratuito por WhatsApp.",
  ],
  ["A sala da Amazon Visto no Centro de Manaus", "La oficina de Amazon Visto en el Centro de Manaus"],
  ["Depois, os documentos", "Después, los documentos"],
  [
    "A nossa equipe monta a lista exata de documentos para o seu caso, sem enrolação.",
    "Nuestro equipo arma la lista exacta de documentos para tu caso, sin rodeos.",
  ],
  ["Carimbo de entrada numa página de passaporte", "Sello de entrada en una página de pasaporte"],
  ["Então, o consulado", "Luego, el consulado"],
  [
    "Cuidamos do processo junto ao consulado ou à embaixada e avisamos você a cada etapa.",
    "Nos encargamos del trámite ante el consulado o la embajada y te avisamos en cada etapa.",
  ],
  ["Passaporte e cartão de embarque sobre a mesa", "Pasaporte y tarjeta de embarque sobre la mesa"],
  ["Por fim, o embarque", "Por último, el embarque"],
  [
    "Visto ou passaporte em mãos, pronto para a viagem que você planejou.",
    "Visa o pasaporte en mano, listo para el viaje que planeaste.",
  ],

  // Sobre nós (carta)
  ["Líder de mercado no Norte do Brasil", "Líder del mercado en el Norte de Brasil"],
  [
    "Somos a Amazon Visto, uma assessoria de vistos, passaporte e intercâmbio. Atendemos presencialmente em Manaus, na Rua Costa Azevedo, 9, sala 901, e em Brasília. E atendemos 100% online todo o Brasil e clientes de língua espanhola em toda a América Latina.",
    "Somos Amazon Visto, una asesoría de visas, pasaporte e intercambio. Atendemos presencialmente en Manaus, en la Rua Costa Azevedo, 9, sala 901, y en Brasilia. Y atendemos 100% en línea a todo Brasil y a clientes de habla hispana en toda América Latina.",
  ],
  [
    "Já ajudamos milhares de clientes a fazer a viagem dos sonhos: para estudar, trabalhar ou simplesmente conhecer o mundo. Com processos descomplicados, seguros e sem burocracia.",
    "Ya ayudamos a miles de clientes a hacer el viaje de sus sueños: para estudiar, trabajar o simplemente conocer el mundo. Con procesos simples, seguros y sin burocracia.",
  ],
  [
    "Fomos reconhecidos como <mark>Empresa do Ano em 2025</mark> e Empresa Destaque em 2026.",
    "Fuimos reconocidos como <mark>Empresa del Año en 2025</mark> y Empresa Destacada en 2026.",
  ],
  [`<span translate="no">Equipe Amazon Visto</span>`, `<span translate="no">Equipo Amazon Visto</span>`],
  ["<span>Manaus e Brasília</span>", "<span>Manaus y Brasilia</span>"],

  // Reconhecimento
  [">Reconhecimento</h2>", ">Reconocimiento</h2>"],
  ["PRÊMIO • EMPRESA DO ANO • PRÊMIO •", "PREMIO • EMPRESA DEL AÑO • PREMIO •"],
  ["EMPRESA DESTAQUE • EMPRESA DESTAQUE •", "EMPRESA DESTACADA • EMPRESA DESTACADA •"],
  ["PARCELAMENTO • SEM JUROS • NO CARTÃO •", "CUOTAS • SIN INTERESES • CON TARJETA •"],
  ["Empresa do Ano 2025&nbsp;·", "Empresa del Año 2025&nbsp;·"],
  ["Empresa Destaque 2026&nbsp;·", "Empresa Destacada 2026&nbsp;·"],
  ["seguidores no Instagram", "seguidores en Instagram"],
  ["Atendimento presencial em Manaus e Brasília&nbsp;·", "Atención presencial en Manaus y Brasilia&nbsp;·"],
  ["Português e español&nbsp;·", "Portugués y español&nbsp;·"],
  ["Até 10x sem juros no cartão", "Hasta 10 cuotas sin intereses con tarjeta"],

  // Sozinho x com a gente
  ["Sozinho ou com a gente", "Solo o con nosotros"],
  [
    "Dá para tirar o visto por conta própria. A diferença está no caminho até lá. Nenhuma assessoria pode garantir a aprovação: a decisão é sempre do consulado. O que fazemos é tirar o peso do caminho.",
    "Puedes tramitar tu visa por tu cuenta. La diferencia está en el camino hasta allí. Ninguna asesoría puede garantizar la aprobación: la decisión es siempre del consulado. Lo que hacemos es quitarte el peso del camino.",
  ],
  ["Começar pela consulta gratuita", "Empezar con la consulta gratuita"],
  [`<th scope="col">Por conta própria</th>`, `<th scope="col">Por tu cuenta</th>`],
  [`Com a <span translate="no">Amazon Visto</span></th>`, `Con <span translate="no">Amazon Visto</span></th>`],
  [`<th scope="row">Processo no consulado</th>`, `<th scope="row">Trámite en el consulado</th>`],
  [`<th scope="row">Acompanhamento</th>`, `<th scope="row">Acompañamiento</th>`],
  [`<th scope="row">Primeiro passo</th>`, `<th scope="row">Primer paso</th>`],
  [`<th scope="row">Atendimento</th>`, `<th scope="row">Atención</th>`],
  [
    "Descobrir sozinho o que cada consulado exige, e torcer para não faltar nada.",
    "Averiguar por tu cuenta lo que exige cada consulado y esperar que no falte nada.",
  ],
  [
    "Navegar por sites, formulários e agendamentos, muitas vezes em outro idioma.",
    "Navegar por sitios web, formularios y citas, muchas veces en otro idioma.",
  ],
  ["Ninguém para tirar dúvidas quando algo trava no meio do caminho.", "Nadie a quien preguntar cuando algo se traba en el camino."],
  ["Horas de pesquisa antes mesmo de começar.", "Horas de investigación antes incluso de empezar."],
  ["Vídeos e fóruns genéricos, que não conhecem o seu caso.", "Videos y foros genéricos que no conocen tu caso."],
  ["Cuidamos do processo junto ao consulado ou embaixada.", "Nos encargamos del trámite ante el consulado o la embajada."],
  ["Você é informado a cada etapa, direto pelo WhatsApp.", "Te mantenemos informado en cada etapa, directo por WhatsApp."],
  [
    "Presencial em Manaus e Brasília ou 100% online, em português ou español.",
    "Presencial en Manaus y Brasilia o 100% en línea, en portugués o español.",
  ],

  // Perguntas frequentes
  ["Perguntas frequentes", "Preguntas frecuentes"],
  ["Segunda a sexta, das 9h às 18h", "De lunes a viernes, de 9 a 18 h"],
  ["Vocês garantem a aprovação do visto?", "¿Garantizan la aprobación de la visa?"],
  [
    "Não, e desconfie de quem garante. A decisão é sempre do consulado ou da embaixada de cada país. O nosso trabalho é reduzir os riscos do caminho: montar a documentação certa para o seu caso e acompanhar cada etapa do processo.",
    "No, y desconfía de quien lo garantice. La decisión es siempre del consulado o de la embajada de cada país. Nuestro trabajo es reducir los riesgos del camino: armar la documentación correcta para tu caso y acompañar cada etapa del trámite.",
  ],
  ["A primeira consulta é paga?", "¿La primera consulta tiene costo?"],
  [
    "Não. Você conta o seu objetivo (turismo, estudo ou trabalho) e recebe uma análise inicial sem custo, pelo WhatsApp.",
    "No. Nos cuentas tu objetivo (turismo, estudio o trabajo) y recibes un análisis inicial sin costo, por WhatsApp.",
  ],
  ["Preciso ir até Manaus ou Brasília?", "¿Tengo que ir a Manaus o Brasilia?"],
  [
    "Não. Temos atendimento presencial em Manaus-AM e Brasília-DF, mas todo o processo com a gente pode ser feito 100% online, de qualquer lugar do Brasil. Quando o consulado exige entrevista ou coleta de biometria, essa etapa é feita pessoalmente pelo solicitante, no posto consular.",
    "No. Tenemos atención presencial en Manaus-AM y Brasilia-DF, pero todo el proceso con nosotros se puede hacer 100% en línea, desde cualquier lugar de Brasil o de América Latina. Cuando el consulado exige entrevista o toma de datos biométricos, esa etapa la hace personalmente el solicitante, en la oficina consular.",
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
  ["Vocês fazem renovação de visto?", "¿Hacen renovación de visa?"],
  [
    "Sim. No visto americano atendemos tanto o primeiro visto quanto a renovação, para turismo ou negócios.",
    "Sí. En la visa americana atendemos tanto la primera visa como la renovación, para turismo o negocios.",
  ],
  ["Vocês atendem em espanhol?", "¿Atienden en español?"],
  [
    "Sí. Para clientes de língua espanhola, o atendimento é pelo WhatsApp",
    "Sí. Para clientes de habla hispana, la atención es por WhatsApp al",
  ],
  ["Pergunte no WhatsApp", "Pregunta por WhatsApp"],
  [">Ver no mapa</a>", ">Ver en el mapa</a>"],

  // Contato
  ["Manaus vista do alto, com a Ponte Rio Negro ao fundo", "Manaus vista desde lo alto, con el Puente Río Negro al fondo"],
  ["Visite a gente", "Visítanos"],
  ["Também em Brasília-DF e 100% online.", "También en Brasilia-DF y 100% en línea."],
  ["<dt>Segunda a sexta</dt>", "<dt>Lunes a viernes</dt>"],
  ["<dd>9h às 18h</dd>", "<dd>9 a 18 h</dd>"],
  ["</a> em português", "</a> en portugués"],
  ["</a> no Instagram", "</a> en Instagram"],
  [">Abrir no mapa</a>", ">Abrir en el mapa</a>"],
  ["Chamar no WhatsApp", "Escribir por WhatsApp"],

  // Cartão de embarque
  [
    "Sua próxima viagem começa com uma conversa. A análise inicial é gratuita, pelo WhatsApp.",
    "Tu próximo viaje empieza con una conversación. El análisis inicial es gratuito, por WhatsApp.",
  ],
  ["Cartão de embarque", "Tarjeta de embarque"],
  [`<span class="embarque__cidade">De Manaus</span>`, `<span class="embarque__cidade">Desde Manaus</span>`],
  [`id="cidadeDestino" aria-hidden="true">Para Nova York</span>`, `id="cidadeDestino" aria-hidden="true">A Nueva York</span>`],
  ["Seu próximo destino", "Tu próximo destino"],
  ["<dt>Passageiro</dt>", "<dt>Pasajero</dt>"],
  ["<dd>Você</dd>", "<dd>Tú</dd>"],
  ["<dt>Portão</dt>", "<dt>Puerta</dt>"],
  ["<dd>Agora</dd>", "<dd>Ahora</dd>"],

  // Rodapé
  ["Boa viagem.", "Buen viaje."],
  ["Reputação no Reclame Aqui", "Reputación en Reclame Aqui"],
  ["Todos os direitos reservados.", "Todos los derechos reservados."],
  ["Desenvolvido por", "Desarrollado por"],
  ["Fotos e vídeo:", "Fotos y video:"],
  [">Ponte Rio Negro</a>", ">Puente Río Negro</a>"],
  [">carimbo de passaporte</a>", ">sello de pasaporte</a>"],
  [">passaporte e cartão de embarque</a>", ">pasaporte y tarjeta de embarque</a>"],
  [">nuvens pela janela do avião</a>", ">nubes desde la ventana del avión</a>"],
];

const escapar = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const comoRegex = (s) => new RegExp(escapar(s).replace(/ +/g, "\\s+"), "g");

for (const [pt, es] of ESTRUTURA) h = h.split(pt).join(es);

const naoUsados = [];
for (const [pt, es] of TEXTOS) {
  const re = comoRegex(pt);
  if (!re.test(h)) naoUsados.push(pt);
  h = h.replace(comoRegex(pt), es);
}

// Nomes de serviço por último (títulos, alt, legendas, faixa, rodapé).
for (const [pt, es] of SERVICOS) h = h.split(pt).join(es);

// Aviso no topo: este arquivo é gerado.
h = h.replace(
  "<head>",
  `<head>
  <!-- ARQUIVO GERADO — não edite à mão. É a versão em espanhol do
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
  .replace(/<a [^>]*lang="pt-BR"[^>]*>[\s\S]*?<\/a>/g, "") // links pro português, de propósito
  .replace(/<[^>]+>/g, "\n");
const suspeitos = visivel
  .split("\n")
  .map((l) => l.trim())
  // Marcas típicas do português que não existem em espanhol (\b não serve
  // pra palavras acentuadas, por isso os espaços explícitos).
  .filter((l) => /ção|ções|ã|õ|você| não | do | da | em | é | para o /i.test(` ${l} `));
if (suspeitos.length) {
  console.log("Trechos que parecem português no es.html:");
  for (const s of [...new Set(suspeitos)]) console.log("  - " + s.slice(0, 100));
} else {
  console.log("es.html gerado sem sobras em português.");
}
