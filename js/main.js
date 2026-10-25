/* ==========================================================================
   AMAZON VISTO — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade numa função separada:
   se uma falhar, o resto do site continua funcionando — e nada fica
   escondido sem JS (o conteúdo só é escondido para entrar quando a classe
   "js" está no <html>, que este arquivo e o <head> colocam).

   O momento da página é o "Escolha o seu destino": passar o mouse num
   destino mostra a foto dele; escolher faz o carimbo bater na foto e leva
   o serviço para a mensagem do WhatsApp.
   ========================================================================== */

document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  ativarMenu();
  ativarEntradas();
  atualizarAnoDoRodape();
  ativarDestinos();
  ativarContadores();
  ativarPainelDeServicos();
  ativarPainelDeDestino();
  ativarVideos();
});

const prefereMenosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
   4. "ESCOLHA O SEU DESTINO" (abas dos serviços)
   - Escolher um destino (clique, toque ou setas do teclado): troca o painel
     de texto e a foto, e o carimbo daquele destino bate por cima.
   - Passar o mouse num destino (só com mouse de verdade): mostra a foto
     dele como prévia; ao sair do índice volta para o escolhido.
   Abas acessíveis no padrão WAI-ARIA (setas, Home/End, tabindex móvel).
   -------------------------------------------------------------------------- */
function ativarDestinos() {
  const raiz = document.getElementById("destinos");
  if (!raiz) return;

  const abas = Array.from(raiz.querySelectorAll('[role="tab"]'));
  const fotos = Array.from(raiz.querySelectorAll(".destinos__foto"));
  const indice = raiz.querySelector(".destinos__indice");
  if (!abas.length) return;

  const fotoDe = (servico) => fotos.find((f) => f.dataset.servico === servico);
  let escolhido = abas.find((a) => a.getAttribute("aria-selected") === "true") || abas[0];

  const mostrarFoto = (servico, carimbar) => {
    fotos.forEach((f) => f.classList.toggle("e-ativa", f.dataset.servico === servico));
    const foto = fotoDe(servico);
    if (carimbar && foto && !prefereMenosMovimento()) {
      foto.classList.remove("carimbando");
      void foto.offsetWidth; // reinicia a animação
      foto.classList.add("carimbando");
    }
  };

  const escolher = (aba, focar) => {
    escolhido = aba;
    abas.forEach((a) => {
      const ativa = a === aba;
      a.setAttribute("aria-selected", String(ativa));
      a.tabIndex = ativa ? 0 : -1;
      const painel = document.getElementById(a.getAttribute("aria-controls"));
      if (painel) painel.classList.toggle("e-ativo", ativa);
    });
    mostrarFoto(aba.dataset.servico, true);
    if (focar) aba.focus();
  };

  abas.forEach((aba, i) => {
    aba.addEventListener("click", () => escolher(aba, false));
    aba.addEventListener("keydown", (evento) => {
      const mapa = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: abas.length - 1 };
      if (!(evento.key in mapa)) return;
      evento.preventDefault();
      escolher(abas[(mapa[evento.key] + abas.length) % abas.length], true);
    });
  });

  // Prévia ao passar o mouse (rápida e exata, sem atraso).
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && indice) {
    abas.forEach((aba) => aba.addEventListener("pointerenter", () => mostrarFoto(aba.dataset.servico, false)));
    indice.addEventListener("pointerleave", () => mostrarFoto(escolhido.dataset.servico, false));
  }
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
   6. PAINEL "O QUE ESTÁ INCLUSO"
   Um único <dialog> reaproveitado: o <template id="incluso-..."> do serviço
   é copiado para dentro e o painel abre com showModal() (prende o foco,
   fecha com Esc, devolve o foco ao botão). Os botões começam "hidden" e só
   aparecem se o navegador suportar <dialog>.
   -------------------------------------------------------------------------- */
function ativarPainelDeServicos() {
  const painel = document.getElementById("painelServico");
  const corpo = document.getElementById("painelCorpo");
  const botoes = document.querySelectorAll("[data-painel]");
  if (!painel || !corpo || !botoes.length || typeof painel.showModal !== "function") return;

  botoes.forEach((botao) => {
    const modelo = document.getElementById(`incluso-${botao.dataset.painel}`);
    if (!modelo) return;
    botao.hidden = false;
    botao.addEventListener("click", () => {
      corpo.replaceChildren(modelo.content.cloneNode(true));
      painel.showModal();
      painel.querySelector(".painel__caixa").scrollTop = 0;
    });
  });

  painel.querySelector(".painel__fechar")?.addEventListener("click", () => painel.close());
  painel.addEventListener("click", (evento) => {
    if (evento.target === painel) painel.close();
  });
}

/* --------------------------------------------------------------------------
   7. PAINEL DE AEROPORTO NO CARTÃO DE EMBARQUE
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
   8. VÍDEO (nuvens pela janela do avião)
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
