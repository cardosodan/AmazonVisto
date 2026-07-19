/* ==========================================================================
   TEMPLATE DE SITE INSTITUCIONAL — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade numa função separada e
   independente das outras — se algo aqui der erro, o resto do site
   continua funcionando normalmente.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  ativarMenuMobile();
  ativarSombraDoCabecalhoAoRolar();
  ativarRevelacaoAoRolar();
  ativarLinkAtivoNaNavegacao();
  atualizarAnoDoRodape();
  ativarExpandirServicos();
});

/* --------------------------------------------------------------------------
   1. MENU MOBILE (hambúrguer)
   Abre/fecha o painel de navegação em telas pequenas e fecha sozinho quando
   o visitante clica em algum link (senão o menu ficaria aberto por cima do
   conteúdo depois de navegar).
   -------------------------------------------------------------------------- */
function ativarMenuMobile() {
  const botao = document.getElementById("botaoMenuMobile");
  const navegacao = document.getElementById("navegacao");
  if (!botao || !navegacao) return;

  const fecharMenu = () => {
    navegacao.classList.remove("navegacao--aberta");
    botao.setAttribute("aria-expanded", "false");
    botao.setAttribute("aria-label", "Abrir menu");
  };

  const alternarMenu = () => {
    const abrindo = !navegacao.classList.contains("navegacao--aberta");
    navegacao.classList.toggle("navegacao--aberta", abrindo);
    botao.setAttribute("aria-expanded", String(abrindo));
    botao.setAttribute("aria-label", abrindo ? "Fechar menu" : "Abrir menu");
  };

  botao.addEventListener("click", alternarMenu);

  navegacao.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", fecharMenu);
  });

  // Fecha o menu com a tecla Esc (acessibilidade)
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharMenu();
  });
}

/* --------------------------------------------------------------------------
   2. SOMBRA NO CABEÇALHO AO ROLAR A PÁGINA
   Só um toque visual: dá profundidade ao cabeçalho fixo assim que o
   visitante começa a rolar, para ele não "flutuar" sem contraste sobre o
   conteúdo.
   -------------------------------------------------------------------------- */
function ativarSombraDoCabecalhoAoRolar() {
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;

  const verificarRolagem = () => {
    cabecalho.classList.toggle("cabecalho--rolado", window.scrollY > 12);
  };

  verificarRolagem();
  window.addEventListener("scroll", verificarRolagem, { passive: true });
}

/* --------------------------------------------------------------------------
   3. ANIMAÇÃO DE ENTRADA AO ROLAR (SCROLL REVEAL)
   Usa IntersectionObserver (nativo do navegador, sem biblioteca) para
   adicionar a classe ".reveal--visivel" em elementos ".reveal" assim que
   eles entram na tela. Cada elemento anima uma vez só (unobserve depois).
   -------------------------------------------------------------------------- */
function ativarRevelacaoAoRolar() {
  const elementos = document.querySelectorAll(".reveal");
  if (!elementos.length) return;

  // Quem prefere menos animação já vê tudo visível direto, sem observer
  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefereMenosMovimento || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("reveal--visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("reveal--visivel");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((el) => observador.observe(el));
}

/* --------------------------------------------------------------------------
   4. DESTACAR O LINK ATIVO NO MENU CONFORME A SEÇÃO VISÍVEL
   Ajuda o visitante a se localizar na página enquanto rola.
   -------------------------------------------------------------------------- */
function ativarLinkAtivoNaNavegacao() {
  const secoes = document.querySelectorAll("main section[id]");
  const links = document.querySelectorAll(".navegacao__link");
  if (!secoes.length || !links.length || !("IntersectionObserver" in window)) return;

  const linkPorId = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    linkPorId.set(id, link);
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        const link = linkPorId.get(entrada.target.id);
        if (!link) return;
        if (entrada.isIntersecting) {
          links.forEach((l) => l.classList.remove("navegacao__link--ativo"));
          link.classList.add("navegacao__link--ativo");
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // considera "ativa" a seção perto do meio da tela
  );

  secoes.forEach((secao) => observador.observe(secao));
}

/* --------------------------------------------------------------------------
   5. ANO ATUAL NO RODAPÉ
   Evita ter que lembrar de atualizar o "© 2026" na mão todo ano.
   -------------------------------------------------------------------------- */
function atualizarAnoDoRodape() {
  const spanAno = document.getElementById("anoAtual");
  if (!spanAno) return;
  spanAno.textContent = new Date().getFullYear();
}

/* --------------------------------------------------------------------------
   6. VER MAIS SERVIÇOS
   A vitrine vem com 6 cards visíveis + 6 escondidos (.cartao-produto--extra).
   O botão só alterna uma classe na grade — o CSS cuida de mostrar/esconder.
   -------------------------------------------------------------------------- */
function ativarExpandirServicos() {
  const botao = document.getElementById("botaoVerMaisServicos");
  const grade = document.getElementById("gradeServicos");
  if (!botao || !grade) return;

  botao.addEventListener("click", () => {
    const expandido = grade.classList.toggle("cartoes-grade--expandida");
    botao.setAttribute("aria-expanded", String(expandido));
    botao.querySelector(".botao__texto").textContent = expandido
      ? "Ver menos serviços"
      : "Ver mais serviços";

    // Ao recolher, rola de volta pro início da seção — senão o visitante
    // pode ficar "perdido" longe do botão, olhando pra um card que sumiu.
    if (!expandido) {
      document.getElementById("servicos").scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
}
