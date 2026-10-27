/* ==========================================================================
   AMAZON VISTO: JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade numa função separada:
   se uma falhar, o resto do site continua funcionando: e nada fica
   escondido sem JS (o conteúdo só é escondido para entrar quando a classe
   "js" está no <html>, que o <head> coloca).

   O momento da página é a conversa da capa: escolher o caso faz a Amazon
   Visto "digitar" e responder, o tique duplo da mensagem do visitante fica
   "visto" e a mensagem sai pronta para o WhatsApp. Os documentos da viagem
   também se mexem: o painel de partidas mostra a hora de cada destino, e o
   cartão de embarque troca o destino conforme o serviço escolhido.
   ========================================================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  ativarMenu();
  ativarEntradas();
  atualizarAnoDoRodape();
  ativarConversa();
  ativarServicos();
  ativarPainel();
  ativarDuvidas();
  ativarJanela();
  ativarEmbarque();
  ativarContadores();
  ativarObturador();
  ativarVideos();
  ativarMapa();
  ativarBotaoFlutuante();
  ativarFotosSuaves();
});

const prefereMenosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Hora de Manaus agora: dia da semana (0 = domingo), hora, minuto e "HH:MM".
function horaDeManaus() {
  const partes = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", { timeZone: "America/Manaus", weekday: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" })
      .formatToParts(new Date())
      .map((p) => [p.type, p.value])
  );
  const dia = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(partes.weekday);
  return { dia, hora: Number(partes.hour), minuto: Number(partes.minute), texto: `${partes.hour}:${partes.minute}` };
}

// Roda "fn" na virada de cada minuto do relógio e de novo quando a aba volta
// a ficar visível (o navegador congela os timers de abas escondidas).
function aCadaMinuto(fn) {
  const agendar = () => setTimeout(() => {
    fn();
    agendar();
  }, 60000 - (Date.now() % 60000) + 40);
  agendar();
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) fn();
  });
}

function abrirWhatsApp(numero, texto) {
  window.open(`https://wa.me/${numero}?text=${encodeURIComponent(texto)}`, "_blank", "noopener");
}

// Troca o texto de um grupo de plaquetas (.placas), uma letra por plaqueta,
// como no painel do aeroporto: cada plaqueta que muda vira (rotateX), uma
// depois da outra. Na primeira vez, e com menos movimento, só escreve.
function virarPlacas(grupo, texto) {
  const letras = Array.from(texto);
  while (grupo.children.length < letras.length) grupo.appendChild(document.createElement("span"));
  while (grupo.children.length > letras.length) grupo.lastElementChild.remove();
  Array.from(grupo.children).forEach((placa, i) => {
    const letra = letras[i];
    placa.classList.toggle("placas__sep", letra === ":");
    if (placa.textContent === letra) return;
    if (!placa.textContent || prefereMenosMovimento()) {
      placa.textContent = letra;
      return;
    }
    setTimeout(() => {
      placa.classList.remove("virando");
      void placa.offsetWidth; // recomeça a virada
      placa.classList.add("virando");
      setTimeout(() => (placa.textContent = letra), 170);
    }, i * 90);
  });
}

// Gira um grupo de plaquetas por uma lista de códigos, a cada 2,8s, só
// enquanto ele está na tela. Devolve um interruptor: ligar(false) para.
function girarCodigos(grupo, codigos) {
  if (codigos.length < 2 || prefereMenosMovimento() || !("IntersectionObserver" in window)) return () => {};
  let atual = codigos.indexOf(grupo.textContent.trim());
  let intervalo = null;
  let visivel = false;
  let ligado = true;
  const passo = () => {
    atual = (atual + 1) % codigos.length;
    virarPlacas(grupo, codigos[atual]);
  };
  const rever = () => {
    const rodar = ligado && visivel;
    if (rodar && !intervalo) intervalo = setInterval(passo, 2800);
    else if (!rodar && intervalo) {
      clearInterval(intervalo);
      intervalo = null;
    }
  };
  new IntersectionObserver(([entrada]) => {
    visivel = entrada.isIntersecting;
    rever();
  }).observe(grupo);
  return (ligar) => {
    ligado = ligar;
    rever();
  };
}

/* --------------------------------------------------------------------------
   1. MENU (celular)
   O botão "Menu" abre o painel com as seções (e passa a dizer "Fechar").
   Fecha ao tocar num link ou com Esc. Os rótulos vêm do HTML (data-rotulo-*
   e data-texto-fechar), para a versão em espanhol não ficar em português.
   -------------------------------------------------------------------------- */
function ativarMenu() {
  const botao = document.getElementById("botaoMenu");
  const painel = document.getElementById("navegacao");
  if (!botao || !painel) return;

  const textoAbrir = botao.textContent;
  const definir = (aberto) => {
    painel.classList.toggle("e-aberta", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? botao.dataset.rotuloFechar : botao.dataset.rotuloAbrir);
    botao.textContent = aberto ? botao.dataset.textoFechar || textoAbrir : textoAbrir;
  };

  botao.addEventListener("click", () => definir(!painel.classList.contains("e-aberta")));
  painel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => definir(false)));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && painel.classList.contains("e-aberta")) {
      definir(false);
      botao.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   2. ENTRADA AO ROLAR
   Cada ".entrada" sobe e aparece uma vez quando entra na tela; dentro da
   mesma seção, as partes entram em cascata (75ms entre uma e outra).
   -------------------------------------------------------------------------- */
function ativarEntradas() {
  const elementos = document.querySelectorAll(".entrada");
  if (!elementos.length) return;

  if (prefereMenosMovimento() || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("entrou"));
    return;
  }

  document.querySelectorAll("section, footer").forEach((secao) => {
    secao.querySelectorAll(".entrada").forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i * 0.075, 0.45)}s`;
    });
  });

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("entrou");
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   3. ANO NO RODAPÉ
   -------------------------------------------------------------------------- */
function atualizarAnoDoRodape() {
  const ano = document.getElementById("anoAtual");
  if (ano) ano.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   4. A CONVERSA DA CAPA
   - Presença: "online agora" no horário de atendimento (segunda a sexta,
     9h às 18h, hora de Manaus); fora dele, "visto por último … às 18:00".
     Os textos vêm dos data-* do HTML (a versão em espanhol traduz lá).
   - As mensagens mostram a hora de Manaus.
   - Escolher um caso: a mensagem do visitante sai com o tique duplo, a Amazon Visto
     "digita", o tique duplo fica "visto" e chega a resposta daquele caso; o texto
     do compositor vira a mensagem pronta para o WhatsApp.
   - Enviar abre o WhatsApp com o texto do compositor (sem JS, o formulário
     faz o mesmo sozinho).
   -------------------------------------------------------------------------- */
function ativarConversa() {
  const conversa = document.getElementById("conversa");
  if (!conversa || !window.Intl) return;

  const presenca = document.getElementById("presenca");
  const lista = document.getElementById("mensagens");
  const compositor = document.getElementById("compositor");
  const campo = document.getElementById("mensagem");
  const respostas = Array.from(conversa.querySelectorAll(".resposta"));
  const roteiro = conversa.querySelector(".conversa__roteiro");
  const digitando = roteiro ? roteiro.querySelector("[data-digitando]") : null;
  const iconeVisto = '<svg aria-hidden="true" focusable="false"><use href="#visto" /></svg>';

  const atualizarPresenca = () => {
    if (!presenca) return;
    const agora = horaDeManaus();
    const util = agora.dia >= 1 && agora.dia <= 5;
    if (util && agora.hora >= 9 && agora.hora < 18) {
      presenca.textContent = presenca.dataset.online;
      return;
    }
    // Último dia de atendimento: hoje (depois das 18h), ontem ou sexta.
    let dia = presenca.dataset.ontem;
    if (util && agora.hora >= 18) dia = presenca.dataset.hoje;
    else if (agora.dia === 0 || (agora.dia === 1 && agora.hora < 9)) dia = presenca.dataset.sexta;
    presenca.textContent = presenca.dataset.visto.replace("{dia}", dia);
  };

  const carimbarHora = (el) => {
    const hora = el.querySelector(".msg__hora");
    if (hora && !hora.firstChild) hora.textContent = horaDeManaus().texto;
  };

  atualizarPresenca();
  aCadaMinuto(atualizarPresenca);
  lista.querySelectorAll(".msg").forEach(carimbarHora);

  const novaMensagem = (classe, html) => {
    const li = document.createElement("li");
    li.className = `msg ${classe}`;
    li.innerHTML = html;
    if (!prefereMenosMovimento()) li.classList.add("chegando");
    lista.appendChild(li);
    return li;
  };

  let rodada = 0;
  respostas.forEach((botao) => {
    botao.setAttribute("aria-pressed", "false");
    botao.addEventListener("click", () => {
      const fala = roteiro && roteiro.querySelector(`[data-resposta="${botao.dataset.servico}"]`);
      if (!fala) return;
      const esta = ++rodada;

      respostas.forEach((b) => b.setAttribute("aria-pressed", String(b === botao)));
      // Fica só a saudação e a conversa desta escolha.
      lista.querySelectorAll(".msg:not(:first-child)").forEach((m) => m.remove());

      const hora = horaDeManaus().texto;
      const minha = novaMensagem("msg--minha", `<p></p><span class="msg__hora">${hora} ${iconeVisto}</span>`);
      minha.querySelector("p").textContent = botao.textContent.trim();
      campo.value = fala.dataset.mensagem;

      const responder = () => {
        if (esta !== rodada) return;
        minha.classList.add("e-vista");
        // Com a resposta, aparece o compositor com a mensagem pronta.
        conversa.classList.add("e-respondida");
        lista.querySelectorAll(".msg--digitando").forEach((m) => m.remove());
        const dela = novaMensagem("msg--deles", `<p></p><span class="msg__hora" aria-hidden="true">${hora}</span>`);
        dela.querySelector("p").textContent = fala.textContent.trim();
      };

      if (prefereMenosMovimento()) {
        responder();
        return;
      }
      setTimeout(() => {
        if (esta !== rodada) return;
        minha.classList.add("e-vista");
        const pontos = novaMensagem("msg--deles msg--digitando", "<p><span></span><span></span><span></span></p>");
        pontos.setAttribute("aria-label", digitando ? digitando.textContent : "");
        setTimeout(responder, 1100);
      }, 450);
    });
  });

  if (compositor && campo) {
    compositor.addEventListener("submit", (evento) => {
      evento.preventDefault();
      const texto = campo.value.trim();
      if (!texto) {
        campo.focus();
        return;
      }
      abrirWhatsApp(compositor.dataset.whatsapp, texto);
    });
  }
}

/* --------------------------------------------------------------------------
   5. SERVIÇOS: AS LINHAS DO PAINEL ABREM A FICHA
   Cada linha do painel de partidas é um link para a ficha do serviço
   (#visto-americano). Com JS, só a ficha escolhida aparece: tocar numa
   linha troca a ficha (a página entra em 0,32s e o carimbo bate), marca a
   linha com o tique duplo e leva até ela. Links do rodapé e o endereço na
   barra (#visto-canadense) abrem a ficha certa.
   -------------------------------------------------------------------------- */
function ativarServicos() {
  const fichas = Array.from(document.querySelectorAll(".ficha"));
  if (!fichas.length) return;
  const ladrilhos = Array.from(document.querySelectorAll(".destino[data-servico]"));

  const abrir = (id, { animar = true, rolar = false } = {}) => {
    const alvo = fichas.find((f) => f.id === id) || fichas[0];
    fichas.forEach((f) => {
      const esta = f === alvo;
      f.classList.toggle("e-aberta", esta);
      f.classList.remove("trocando");
    });
    if (animar && !prefereMenosMovimento()) {
      void alvo.offsetWidth; // reinicia a animação
      alvo.classList.add("trocando");
    }
    ladrilhos.forEach((l) => l.setAttribute("aria-current", String(l.dataset.servico === alvo.id)));
    // Trocar de ficha à mão mostra a foto já aberta (o obturador é só da
    // primeira vez que a vitrine aparece ao rolar).
    if (animar) alvo.querySelector(".obturador")?.classList.add("e-aberto");
    // Só rola quando a ficha não está à vista (no celular ela fica abaixo
    // do painel; no desktop, ao lado, e a página fica parada).
    const topo = alvo.getBoundingClientRect().top;
    if (rolar && (topo < 0 || topo > window.innerHeight * 0.6)) {
      alvo.scrollIntoView({ behavior: prefereMenosMovimento() ? "auto" : "smooth", block: "start" });
    }
    return alvo;
  };

  const doEndereco = () => location.hash.slice(1);
  abrir(doEndereco(), { animar: false });

  ladrilhos.forEach((ladrilho) => {
    ladrilho.addEventListener("click", (evento) => {
      evento.preventDefault();
      const alvo = abrir(ladrilho.dataset.servico, { rolar: true });
      history.replaceState(null, "", `#${alvo.id}`);
    });
  });

  window.addEventListener("hashchange", () => {
    if (fichas.some((f) => f.id === doEndereco())) abrir(doEndereco(), { rolar: true });
  });
}

/* --------------------------------------------------------------------------
   6. PAINEL DE PARTIDAS
   Cada linha com data-fuso mostra a hora local de lá agora, em plaquetas
   que viram na troca do minuto; a origem (Manaus) mostra também a data por
   extenso. No intercâmbio, o código gira pelos destinos enquanto o painel
   está na tela. Sem JS, as horas não aparecem.
   -------------------------------------------------------------------------- */
function ativarPainel() {
  const painel = document.getElementById("painel");
  if (!painel || !window.Intl) return;

  const relogios = Array.from(painel.querySelectorAll("[data-fuso]"))
    .map((linha) => {
      try {
        return {
          formato: new Intl.DateTimeFormat("pt-BR", { timeZone: linha.dataset.fuso, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }),
          placas: linha.querySelector(".destino__hora, .painel__hora"),
        };
      } catch {
        return null;
      }
    })
    .filter((relogio) => relogio && relogio.placas);

  const data = painel.querySelector(".painel__data");
  let formatoData = null;
  try {
    formatoData = new Intl.DateTimeFormat(document.documentElement.lang || "pt-BR", { timeZone: "America/Manaus", weekday: "long", day: "numeric", month: "long" });
  } catch {}

  const atualizar = () => {
    const agora = new Date();
    if (data && formatoData) data.textContent = formatoData.format(agora);
    relogios.forEach(({ formato, placas }) => virarPlacas(placas, formato.format(agora)));
  };
  atualizar();
  aCadaMinuto(atualizar);

  painel.querySelectorAll("[data-codigos]").forEach((grupo) => girarCodigos(grupo, grupo.dataset.codigos.split("|")));
}

/* --------------------------------------------------------------------------
   7. DÚVIDAS: A CONVERSA DAS PERGUNTAS
   Tocar numa pergunta (o balão do cliente) abre a resposta da Amazon Visto
   e o tique duplo fica "visto". Uma aberta por vez; a primeira começa
   aberta. Sem JS, todas aparecem.
   -------------------------------------------------------------------------- */
function ativarDuvidas() {
  const abas = Array.from(document.querySelectorAll(".pergunta__balao"));
  if (!abas.length) return;

  const definir = (aba) => {
    abas.forEach((a) => {
      const aberta = a === aba;
      a.setAttribute("aria-expanded", String(aberta));
      const resposta = document.getElementById(a.getAttribute("aria-controls"));
      if (resposta) resposta.hidden = !aberta;
    });
  };

  definir(abas.find((a) => a.getAttribute("aria-expanded") === "true") || abas[0]);
  abas.forEach((aba) =>
    aba.addEventListener("click", () => definir(aba.getAttribute("aria-expanded") === "true" ? null : aba))
  );
}

/* --------------------------------------------------------------------------
   7b. A JANELA DO AVIÃO
   A chegada até a janela é do CSS: @keyframes presas à rolagem
   (animation-timeline), que o navegador roda na placa de vídeo. Aqui se
   liga a cena e se mede, a cada tamanho de tela, a escala que leva o vidro
   para fora dela (--janela-aberta): a menor em que os quatro cantos do
   palco caem dentro do vão de cantos redondos. Onde não há
   animation-timeline, a rolagem é medida uma vez por quadro e passada para
   as mesmas animações (currentTime), que só mexem em transform e opacity.
   Com menos movimento, nada disso roda: só o céu e as falas.
   -------------------------------------------------------------------------- */
function ativarJanela() {
  const janela = document.getElementById("janela");
  if (!janela || prefereMenosMovimento() || !janela.getAnimations) return;
  janela.classList.add("e-viva");

  const palco = janela.querySelector(".janela__palco");
  const aviao = janela.querySelector(".janela__aviao");
  let escala = 0;
  const medirAbertura = () => {
    const p = palco.getBoundingClientRect();
    const v = aviao.getBoundingClientRect();
    // O vão: metade da largura e da altura do vidro e o raio dos cantos
    // (110 de 250, o mesmo do desenho).
    const a = v.width / 2;
    const b = v.height / 2;
    const r = v.width * 0.44;
    const x = v.left - p.left + a;
    const y = v.top - p.top + b;
    const cantos = [[x, y], [p.width - x, y], [x, p.height - y], [p.width - x, p.height - y]];
    const cabe = (s) =>
      cantos.every(([cx, cy]) => {
        const qx = cx / s - (a - r);
        const qy = cy / s - (b - r);
        if (qx <= 0) return cy / s <= b;
        if (qy <= 0) return cx / s <= a;
        return qx * qx + qy * qy <= r * r;
      });
    let menor = 1;
    let maior = 40;
    for (let i = 0; i < 24; i++) {
      const meio = (menor + maior) / 2;
      if (cabe(meio)) maior = meio;
      else menor = meio;
    }
    // Um pouco além, para a vedação também sair da tela; só regrava se
    // mudar de verdade (a barra do celular aparecendo não muda nada).
    const nova = maior * 1.04;
    if (Math.abs(nova - escala) > nova * 0.01) {
      escala = nova;
      janela.style.setProperty("--janela-aberta", nova.toFixed(3));
    }
  };
  medirAbertura();
  window.addEventListener("resize", medirAbertura);
  if (window.CSS && CSS.supports("animation-timeline: view()")) return;

  const animacoes = Array.from(janela.querySelectorAll(".janela__palco *")).flatMap((el) => el.getAnimations());
  if (!animacoes.length) return janela.classList.remove("e-viva");

  let pedido = 0;
  const medir = () => {
    pedido = 0;
    const caixa = janela.getBoundingClientRect();
    const curso = caixa.height - window.innerHeight;
    const abre = curso > 0 ? Math.min(1, Math.max(0, -caixa.top / curso)) : 1;
    animacoes.forEach((animacao) => (animacao.currentTime = abre * 1000));
  };
  const pedir = () => {
    if (!pedido) pedido = requestAnimationFrame(medir);
  };
  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir);
  medir();
}

/* --------------------------------------------------------------------------
   8. CARTÃO DE EMBARQUE DO CONTATO
   - O destino do cartão segue o serviço escolhido (data-destino de cada
     opção: "JFK:Para Nova York"), virando as plaquetas; passaporte e
     intercâmbio não têm um destino só: o cartão diz "Para o mundo" e o
     código gira pelos destinos (data-mundo).
   - Enviar monta a mensagem com nome, cidade, serviço e situação (o modelo
     fica no data-modelo do HTML) e abre o WhatsApp.
   -------------------------------------------------------------------------- */
function ativarEmbarque() {
  const cartao = document.getElementById("embarque");
  if (!cartao) return;
  const painel = document.getElementById("painelDestino");
  const cidade = document.getElementById("cidadeDestino");
  const servico = cartao.elements.servico;
  const mundo = ((painel && painel.dataset.mundo) || "").split("|").filter(Boolean);

  const mostrarCidade = (nome) => {
    if (!cidade || !nome || cidade.textContent === nome) return;
    if (prefereMenosMovimento()) {
      cidade.textContent = nome;
      return;
    }
    cidade.style.opacity = "0";
    setTimeout(() => {
      cidade.textContent = nome;
      cidade.style.opacity = "1";
    }, 200);
  };

  let girar = () => {};
  if (painel && mundo.length) {
    girar = girarCodigos(painel, mundo);
    girar(false);
  }

  const escolher = () => {
    const opcao = servico && servico.selectedOptions[0];
    const destino = opcao && opcao.dataset.destino ? opcao.dataset.destino.split(":") : null;
    if (destino && destino.length === 2) {
      girar(false);
      if (painel) virarPlacas(painel, destino[0]);
      mostrarCidade(destino[1]);
    } else {
      mostrarCidade(cidade && cidade.dataset.varios);
      girar(true);
    }
  };
  if (servico) servico.addEventListener("change", escolher);

  cartao.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const valor = (nome) => (cartao.elements[nome] ? cartao.elements[nome].value.trim() : "");
    const cidadeDigitada = valor("cidade");
    let texto = cartao.dataset.modelo;
    if (!cidadeDigitada) texto = texto.replace(/,[^,{]*\{cidade\}/, "");
    texto = texto
      .replace("{nome}", valor("nome"))
      .replace("{cidade}", cidadeDigitada)
      .replace("{servico}", valor("servico"))
      .replace("{situacao}", valor("situacao"));
    abrirWhatsApp(cartao.dataset.whatsapp, texto);
  });
}

/* --------------------------------------------------------------------------
   9. CONTADOR (seguidores no Instagram)
   Conta de 0 até o valor escrito no HTML, uma vez, quando entra na tela.
   O texto no HTML já é o valor final, então sem JS aparece certo.
   -------------------------------------------------------------------------- */
function ativarContadores() {
  const elementos = document.querySelectorAll("[data-contar]");
  if (!elementos.length || prefereMenosMovimento() || !("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        contarAte(entrada.target);
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.6 }
  );
  elementos.forEach((el) => observador.observe(el));
}

function contarAte(elemento) {
  const texto = elemento.textContent.trim();
  const numero = texto.match(/^([\d.,]+)/);
  if (!numero) return;
  const sufixo = texto.slice(numero[1].length);
  const temDecimal = numero[1].includes(",");
  const final = parseFloat(numero[1].replace(/\./g, "").replace(",", "."));
  if (Number.isNaN(final)) return;

  const formato = new Intl.NumberFormat(document.documentElement.lang || "pt-BR", {
    minimumFractionDigits: temDecimal ? 1 : 0,
    maximumFractionDigits: temDecimal ? 1 : 0,
  });
  const inicio = performance.now();
  const passo = (agora) => {
    const t = Math.min(1, (agora - inicio) / 1400);
    elemento.textContent = formato.format(final * (1 - Math.pow(1 - t, 3))) + sufixo;
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

/* --------------------------------------------------------------------------
   10. OBTURADOR
   A foto-vitrine (a ficha do visto americano) abre de baixo para cima uma
   vez, quando aparece na tela, e o carimbo bate em seguida (CSS). Observa o
   bloco da foto, não a foto: um elemento recortado por clip-path não conta
   como visível.
   -------------------------------------------------------------------------- */
function ativarObturador() {
  const fotos = document.querySelectorAll(".obturador");
  if (!fotos.length) return;
  if (prefereMenosMovimento() || !("IntersectionObserver" in window)) {
    fotos.forEach((f) => f.classList.add("e-aberto"));
    return;
  }
  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        entrada.target.querySelector(".obturador")?.classList.add("e-aberto");
        obs.unobserve(entrada.target);
      });
    },
    { threshold: 0.2 }
  );
  fotos.forEach((f) => observador.observe(f.parentElement));
}

/* --------------------------------------------------------------------------
   11. VÍDEO (as nuvens da janela do avião)
   Loop mudo que só toca enquanto está na tela; quem prefere menos movimento
   vê só o quadro parado.
   -------------------------------------------------------------------------- */
function ativarVideos() {
  const videos = document.querySelectorAll("video[muted]");
  if (!videos.length || prefereMenosMovimento() || !("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const video = entrada.target;
        if (entrada.isIntersecting) {
          video.preload = "auto";
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.15 }
  );
  videos.forEach((v) => {
    v.muted = true;
    observador.observe(v);
  });
}

/* --------------------------------------------------------------------------
   11b. O MAPA DO "VISITE A GENTE"
   A imagem do OpenStreetMap vira o Google Maps interativo só quando a
   pessoa pede: o link, que sem JS abre o Google Maps numa aba nova, aqui
   carrega o mapa no lugar da imagem e passa o foco para ele. Com Ctrl,
   Cmd, Shift ou o botão do meio, continua abrindo numa aba nova.
   -------------------------------------------------------------------------- */
function ativarMapa() {
  const link = document.querySelector("[data-mapa]");
  if (!link) return;
  link.addEventListener("click", (evento) => {
    if (evento.button !== 0 || evento.ctrlKey || evento.metaKey || evento.shiftKey || evento.altKey) return;
    evento.preventDefault();
    const mapa = document.createElement("iframe");
    mapa.src = link.dataset.mapa;
    mapa.title = link.dataset.titulo;
    mapa.referrerPolicy = "no-referrer-when-downgrade";
    mapa.allowFullscreen = true;
    link.parentElement.replaceChildren(mapa);
    mapa.focus();
  });
}

/* --------------------------------------------------------------------------
   12. BOTÃO FLUTUANTE DE WHATSAPP
   Escondido enquanto está na tela uma parte que já tem o próprio enviar (a
   capa, com a conversa, e o cartão de embarque), na cena da janela e no
   rodapé, para não cobrir os botões, as falas nem os textos de lá.
   -------------------------------------------------------------------------- */
function ativarBotaoFlutuante() {
  const botao = document.querySelector(".flutuante");
  const partes = Array.from(document.querySelectorAll(".capa, .janela, .embarque-secao, .rodape"));
  if (!botao || !partes.length || !("IntersectionObserver" in window)) return;

  const visiveis = new Set();
  botao.classList.add("e-escondido");
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => (entrada.isIntersecting ? visiveis.add(entrada.target) : visiveis.delete(entrada.target)));
      botao.classList.toggle("e-escondido", visiveis.size > 0);
    },
    { rootMargin: "0px 0px -35% 0px" }
  );
  partes.forEach((parte) => observador.observe(parte));
}

/* --------------------------------------------------------------------------
   13. FOTOS QUE CARREGAM DEPOIS
   As fotos com loading="lazy" chegam num fade. A classe "fotos-suaves" só
   entra aqui, então se este arquivo não carregar nenhuma foto fica escondida.
   -------------------------------------------------------------------------- */
function ativarFotosSuaves() {
  const fotos = document.querySelectorAll('img[loading="lazy"]');
  if (!fotos.length || prefereMenosMovimento()) return;

  document.documentElement.classList.add("fotos-suaves");
  fotos.forEach((foto) => {
    const marcar = () => foto.classList.add("carregou");
    if (foto.complete) marcar();
    else {
      foto.addEventListener("load", marcar, { once: true });
      foto.addEventListener("error", marcar, { once: true });
    }
  });
}
