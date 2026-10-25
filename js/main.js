/* ==========================================================================
   AMAZON VISTO — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade numa função separada:
   se uma falhar, o resto do site continua funcionando — e nada fica
   escondido sem JS (o conteúdo só é escondido para entrar quando a classe
   "js" está no <html>, que este arquivo e o <head> colocam).

   O momento da página é o arquivo de pastas ("Escolha o seu destino"):
   tocar numa aba abre a pasta do destino ali mesmo, a ficha desliza para
   fora e o carimbo bate na foto.
   ========================================================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  ativarMenu();
  ativarEntradas();
  atualizarAnoDoRodape();
  ativarDestinos();
  ativarStatus();
  ativarRelogios();
  ativarBotaoFlutuante();
  ativarFotosSuaves();
  ativarContadores();
  ativarPainelDeDestino();
  ativarVideos();
});

const prefereMenosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Roda "fn" na virada de cada minuto do relógio (não a cada 60s a partir de
// agora, que atrasaria até um minuto) e de novo quando a aba volta a ficar
// visível, já que o navegador congela os timers de abas escondidas.
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

/* --------------------------------------------------------------------------
   1. MENU
   O botão "Menu" abre o painel com as seções (em qualquer largura). Fecha
   ao clicar num link ou com Esc. Os rótulos vêm do HTML (data-rotulo-*)
   pra versão em espanhol não ficar com "Abrir menu" em português.
   -------------------------------------------------------------------------- */
function ativarMenu() {
  const botao = document.getElementById("botaoMenuMobile");
  const navegacao = document.getElementById("navegacao");
  if (!botao || !navegacao) return;

  const rotuloAbrir = botao.dataset.rotuloAbrir || "Abrir menu";
  const rotuloFechar = botao.dataset.rotuloFechar || "Fechar menu";

  const definir = (aberto) => {
    navegacao.classList.toggle("navegacao--aberta", aberto);
    botao.setAttribute("aria-expanded", String(aberto));
    botao.setAttribute("aria-label", aberto ? rotuloFechar : rotuloAbrir);
  };

  botao.addEventListener("click", () => definir(!navegacao.classList.contains("navegacao--aberta")));
  navegacao.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => definir(false)));
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape" && navegacao.classList.contains("navegacao--aberta")) {
      definir(false);
      botao.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   2. ENTRADA AO ROLAR
   Cada ".entrada" sobe e aparece uma vez quando entra na tela. Dentro da
   mesma seção, as partes entram em cascata (título, texto, figura) com
   75ms entre uma e outra.
   -------------------------------------------------------------------------- */
function ativarEntradas() {
  const elementos = document.querySelectorAll(".entrada");
  if (!elementos.length) return;

  if (prefereMenosMovimento() || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("entrou"));
    return;
  }

  // Atraso de cada parte = posição dela entre as ".entrada" da seção.
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
   4. ARQUIVO DE PASTAS ("Escolha o seu destino")
   Cada aba é um destino. Escolher (clique, toque ou setas do teclado) abre
   a pasta dele ali mesmo: a aba sobe, a capa da pasta tomba para a frente,
   a ficha de papel desliza para fora e o carimbo do destino bate na foto.
   A primeira pasta abre sozinha quando o arquivo aparece na tela. Abas
   acessíveis no padrão WAI-ARIA (setas, Home/End, tabindex móvel). Sem JS,
   todas as pastas ficam abertas.
   -------------------------------------------------------------------------- */
function ativarDestinos() {
  const raiz = document.getElementById("destinos");
  if (!raiz) return;

  const abas = Array.from(raiz.querySelectorAll('[role="tab"]'));
  if (!abas.length) return;

  // "puxando": a cerimônia inteira (capa, ficha, carimbo), só na primeira
  // vez. "trocando": a troca rápida de aba (~0,3s). Sem modo: instantâneo,
  // para as setas do teclado, que a pessoa aperta em sequência.
  const animar = (pasta, modo) => {
    pasta.classList.remove("puxando", "trocando");
    if (!modo || prefereMenosMovimento()) return;
    void pasta.offsetWidth; // reinicia a animação
    pasta.classList.add(modo);
  };

  let primeiraVez = true;
  let observador = null;

  const abrir = (aba, modo, focar) => {
    if (aba.getAttribute("aria-selected") === "true" && !focar) return;
    primeiraVez = false;
    if (observador) observador.disconnect();
    abas.forEach((a) => {
      const ativa = a === aba;
      a.setAttribute("aria-selected", String(ativa));
      a.tabIndex = ativa ? 0 : -1;
      const pasta = document.getElementById(a.getAttribute("aria-controls"));
      if (!pasta) return;
      pasta.classList.toggle("e-aberta", ativa);
      animar(pasta, ativa ? modo : null);
    });
    if (focar) aba.focus();
  };

  if ("IntersectionObserver" in window) {
    observador = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting || !primeiraVez) return;
        const aberta = raiz.querySelector(".pasta-servico.e-aberta");
        if (aberta) animar(aberta, "puxando");
        primeiraVez = false;
        observador.disconnect();
      },
      { threshold: 0.35 }
    );
    observador.observe(raiz.querySelector(".arquivo__pastas") || raiz);
  }

  abas.forEach((aba, i) => {
    aba.addEventListener("click", () => abrir(aba, "trocando", false));
    aba.addEventListener("keydown", (evento) => {
      const mapa = { ArrowRight: i + 1, ArrowDown: i + 1, ArrowLeft: i - 1, ArrowUp: i - 1, Home: 0, End: abas.length - 1 };
      if (!(evento.key in mapa)) return;
      evento.preventDefault();
      abrir(abas[(mapa[evento.key] + abas.length) % abas.length], null, true);
    });
  });
}

/* --------------------------------------------------------------------------
   4b. STATUS DO ATENDIMENTO NA CAPA
   "Aberto agora" ou "Fechado agora", pela hora de Manaus, com o horário
   escrito no HTML (segunda a sexta, 9h às 18h). Atualiza a cada minuto.
   Os textos vêm de data-aberto / data-fechado (a versão em espanhol traduz
   lá). Sem JS, fica a frase fixa com o horário.
   -------------------------------------------------------------------------- */
function ativarStatus() {
  const status = document.getElementById("statusAtendimento");
  if (!status || !window.Intl) return;

  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Manaus",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });
  const fixo = status.textContent.trim();

  const atualizar = () => {
    const p = Object.fromEntries(partes.formatToParts(new Date()).map((x) => [x.type, x.value]));
    const dia = p.weekday.toLowerCase().replace(".", "");
    const util = !["sáb", "dom"].includes(dia);
    const hora = Number(p.hour) + Number(p.minute) / 60;
    const aberto = util && hora >= 9 && hora < 18;
    status.classList.toggle("e-aberto", aberto);
    // A hora de Manaus está no painel de horários; aqui só o estado.
    status.textContent = `${aberto ? status.dataset.aberto : status.dataset.fechado} · ${fixo}`;
  };

  atualizar();
  aCadaMinuto(atualizar);
}

/* --------------------------------------------------------------------------
   4c. PAINEL DE HORÁRIOS DA CAPA
   Como o painel de embarque: a hora de Manaus em destaque, com a data, e
   cada destino em uma linha com a hora local e a diferença para Manaus
   (calculada agora, então respeita horário de verão). Ao aparecer, as
   plaquetas giram até assentar; depois só vira a que mudou, na virada do
   minuto. Sem JS (ou sem Intl), o painel continua escondido.
   -------------------------------------------------------------------------- */
function ativarRelogios() {
  const painel = document.getElementById("relogios");
  if (!painel || !window.Intl) return;

  const idioma = document.documentElement.lang || "pt-BR";
  const origem = "America/Manaus";
  const mesmaHora = painel.dataset.mesma || "mesma hora";
  const numero = new Intl.NumberFormat(idioma, { maximumFractionDigits: 1 });

  // Minutos "de parede" num fuso, para comparar dois fusos no mesmo instante.
  const minutosNoFuso = (fuso, data) => {
    const p = Object.fromEntries(
      new Intl.DateTimeFormat("en-US", { timeZone: fuso, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric" })
        .formatToParts(data)
        .map((x) => [x.type, x.value])
    );
    return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) / 60000;
  };
  const diferenca = (fuso, data) => {
    const horas = (minutosNoFuso(fuso, data) - minutosNoFuso(origem, data)) / 60;
    if (!horas) return mesmaHora;
    return `${horas > 0 ? "+" : "−"}${numero.format(Math.abs(horas))} h`;
  };

  let formatoData = null;
  try {
    formatoData = new Intl.DateTimeFormat(idioma, { timeZone: origem, weekday: "long", day: "numeric", month: "long" });
  } catch {}
  const data = painel.querySelector(".relogios__data");

  const linhas = Array.from(painel.querySelectorAll("[data-fuso]")).map((linha) => {
    const fuso = linha.dataset.fuso;
    let formato;
    try {
      formato = new Intl.DateTimeFormat("pt-BR", { timeZone: fuso, hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    } catch {
      return null;
    }
    const hora = linha.querySelector(".relogios__hora");
    hora.textContent = "";
    // 5 plaquetas: H H : M M
    const placas = Array.from({ length: 5 }, (_, i) => {
      const placa = document.createElement("span");
      placa.className = i === 2 ? "placa relogios__sep" : "placa";
      // pisca alinhado ao segundo de verdade, não ao carregamento da página
      if (i === 2) placa.style.animationDelay = `-${Date.now() % 1000}ms`;
      placa.setAttribute("aria-hidden", "true");
      hora.appendChild(placa);
      return placa;
    });
    const leitura = document.createElement("span");
    leitura.className = "visualmente-oculto";
    hora.appendChild(leitura);
    return { fuso, formato, placas, leitura, rotuloFuso: linha.querySelector(".relogios__fuso") };
  }).filter(Boolean);
  if (!linhas.length) return;

  const virar = (placa, texto, atraso) => {
    if (placa.textContent === texto) return;
    if (prefereMenosMovimento()) {
      placa.textContent = texto;
      return;
    }
    setTimeout(() => {
      placa.classList.remove("virando");
      void placa.offsetWidth;
      placa.classList.add("virando");
      setTimeout(() => (placa.textContent = texto), 170);
    }, atraso);
  };

  const atualizar = (assentar) => {
    const agora = new Date();
    if (data && formatoData) data.textContent = formatoData.format(agora);
    linhas.forEach(({ fuso, formato, placas, leitura, rotuloFuso }, l) => {
      const texto = formato.format(agora).replace(/\D/g, "").padStart(4, "0");
      const chars = [texto[0], texto[1], ":", texto[2], texto[3]];
      leitura.textContent = `${chars[0]}${chars[1]}:${chars[3]}${chars[4]}`;
      if (rotuloFuso) rotuloFuso.textContent = diferenca(fuso, agora);
      placas.forEach((placa, i) => {
        if (i === 2) return void (placa.textContent = ":");
        if (assentar && !prefereMenosMovimento()) {
          // gira por alguns números antes de parar no certo, linha a linha
          for (let k = 0; k < 3; k++) virar(placa, String((Number(chars[i]) + 7 + k * 3) % 10), l * 110 + i * 60 + k * 260);
          setTimeout(() => virar(placa, chars[i], 0), l * 110 + i * 60 + 3 * 260);
        } else {
          virar(placa, chars[i], i * 80);
        }
      });
    });
  };

  painel.hidden = false;
  atualizar(true);
  aCadaMinuto(() => atualizar(false));
}

/* --------------------------------------------------------------------------
   4d. BOTÃO FLUTUANTE DE WHATSAPP
   Fica escondido enquanto a capa (que já tem o botão principal) está na
   tela, e entra quando a pessoa começa a descer. Sem JS, aparece sempre.
   -------------------------------------------------------------------------- */
function ativarBotaoFlutuante() {
  const botao = document.querySelector(".whatsapp-flutuante");
  const capa = document.querySelector(".capa");
  if (!botao || !capa || !("IntersectionObserver" in window)) return;

  botao.classList.add("e-escondido");
  new IntersectionObserver(([entrada]) => botao.classList.toggle("e-escondido", entrada.isIntersecting), {
    rootMargin: "0px 0px -35% 0px",
  }).observe(capa);
}

/* --------------------------------------------------------------------------
   4e. FOTOS QUE CARREGAM DEPOIS
   As fotos com loading="lazy" chegam num fade quando terminam de baixar,
   em vez de aparecerem de repente. A classe "fotos-suaves" só entra aqui,
   então se este arquivo não carregar nenhuma foto fica escondida.
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

/* --------------------------------------------------------------------------
   5. CONTADOR (seguidores no Instagram)
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

  const formato = new Intl.NumberFormat("pt-BR", {
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
   6. PAINEL DE AEROPORTO NO CARTÃO DE EMBARQUE
   O código do destino troca a cada poucos segundos (JFK → YYZ → PEK →
   LIM), virando letra por letra. Destinos e cidades vêm do HTML
   (data-destinos="JFK:Nova York|..."). Só gira enquanto está na tela.
   -------------------------------------------------------------------------- */
function ativarPainelDeDestino() {
  const painel = document.getElementById("painelDestino");
  const cidade = document.getElementById("cidadeDestino");
  if (!painel || !cidade || !("IntersectionObserver" in window) || prefereMenosMovimento()) return;

  const destinos = (painel.dataset.destinos || "")
    .split("|")
    .map((par) => par.split(":"))
    .filter((par) => par.length === 2);
  const letras = painel.querySelectorAll("span");
  if (destinos.length < 2 || !letras.length) return;

  let atual = 0;
  const trocar = () => {
    atual = (atual + 1) % destinos.length;
    const [codigo, nome] = destinos[atual];
    letras.forEach((letra, i) => {
      setTimeout(() => {
        letra.classList.remove("virando");
        void letra.offsetWidth;
        letra.classList.add("virando");
        setTimeout(() => (letra.textContent = codigo[i] || ""), 170);
      }, i * 110);
    });
    cidade.style.opacity = "0";
    setTimeout(() => {
      cidade.textContent = nome;
      cidade.style.opacity = "1";
    }, 320);
  };

  let intervalo = null;
  new IntersectionObserver(([entrada]) => {
    if (entrada.isIntersecting && !intervalo) intervalo = setInterval(trocar, 2800);
    else if (!entrada.isIntersecting && intervalo) {
      clearInterval(intervalo);
      intervalo = null;
    }
  }).observe(painel);
}

/* --------------------------------------------------------------------------
   7. VÍDEO (nuvens pela janela do avião)
   Loop mudo que só toca enquanto está na tela; quem prefere menos
   movimento vê só o quadro parado (poster).
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
    { threshold: 0.25 }
  );
  videos.forEach((v) => {
    v.muted = true;
    observador.observe(v);
  });
}
