/* ==========================================================================
   TEMPLATE DE SITE INSTITUCIONAL — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade numa função separada e
   independente das outras — se algo aqui der erro, o resto do site
   continua funcionando normalmente.

   Sobre o movimento do site: pouco e com intenção. O único "momento" é o
   carimbo "Visto aprovado" batendo na vitrine do hero (e os carimbos da
   faixa de reconhecimento, no mesmo gesto). O resto é entrada suave ao
   rolar e a linha do processo, que segue o scroll da própria seção. Nada de
   máquina de escrever, título letra por letra, cursor customizado ou brilho
   seguindo o mouse — pra uma assessoria de visto, isso lê como "template",
   não como empresa séria.

   Tudo que lê layout no scroll (getBoundingClientRect) passa por
   "porQuadro": no máximo uma leitura por frame, em vez de uma por evento.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  ativarMenuMobile();
  ativarSombraDoCabecalhoAoRolar();
  ativarRevelacaoAoRolar();
  ativarLinkAtivoNaNavegacao();
  atualizarAnoDoRodape();
  ativarScrollHorizontalServicos();
  ativarContadores();
  ativarVitrineDoHero();
  ativarLinhaDoProcesso();
});

const prefereMenosMovimento = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Agrupa chamadas repetidas (scroll, resize, mousemove) em no máximo uma por
// frame de animação — evita ler/escrever layout dezenas de vezes por frame.
function porQuadro(funcao) {
  let agendado = false;
  return (...args) => {
    if (agendado) return;
    agendado = true;
    requestAnimationFrame(() => {
      agendado = false;
      funcao(...args);
    });
  };
}

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
   2. CABEÇALHO AO ROLAR
   No topo da página o cabeçalho é transparente, por cima do hero escuro
   (texto claro). Assim que o visitante rola, ganha fundo de papel, fio
   inferior e texto escuro — a classe "cabecalho--rolado" controla tudo isso
   no CSS.
   -------------------------------------------------------------------------- */
function ativarSombraDoCabecalhoAoRolar() {
  const cabecalho = document.getElementById("cabecalho");
  if (!cabecalho) return;

  const verificarRolagem = () => {
    cabecalho.classList.toggle("cabecalho--rolado", window.scrollY > 12);
  };

  verificarRolagem();
  window.addEventListener("scroll", porQuadro(verificarRolagem), { passive: true });
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
  if (prefereMenosMovimento() || !("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("reveal--visivel"));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          const elemento = entrada.target;

          // Atraso extra pra quem tem outros ".reveal" irmãos (mesmo pai) —
          // dá um efeito de cascata em grades (diferenciais, passos do
          // processo, carimbos) sem precisar numerar nada no HTML.
          const irmaosRevelaveis = elemento.parentElement
            ? Array.from(elemento.parentElement.children).filter((el) =>
                el.classList.contains("reveal")
              )
            : [];
          const indice = irmaosRevelaveis.indexOf(elemento);
          if (indice > 0) {
            elemento.style.transitionDelay = `${Math.min(indice * 0.09, 0.45)}s`;
          }

          elemento.classList.add("reveal--visivel");
          observer.unobserve(elemento);
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
  if (!secoes.length || !("IntersectionObserver" in window)) return;

  const linkPorId = new Map();
  links.forEach((link) => {
    const id = link.getAttribute("href").replace("#", "");
    linkPorId.set(id, link);
  });

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;

        const link = linkPorId.get(entrada.target.id);
        if (link) {
          links.forEach((l) => {
            l.classList.remove("navegacao__link--ativo");
            l.removeAttribute("aria-current");
          });
          link.classList.add("navegacao__link--ativo");
          link.setAttribute("aria-current", "true");
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
   6. SCROLL HORIZONTAL "PINADO" DOS SERVIÇOS
   Em vez do típico "scrollytelling" com GSAP/ScrollTrigger, replica o
   mesmo resultado com CSS position:sticky puro: a seção ganha uma altura
   extra (igual à distância horizontal que a trilha de cards precisa
   percorrer) e, enquanto o visitante rola essa sobra vertical, a trilha
   desliza pra esquerda proporcionalmente — o scroll vertical normal "pilota"
   o deslocamento horizontal, sem tomar o controle da rolagem do visitante
   (ele sempre pode continuar rolando pra baixo normalmente, sem trava).
   Em telas pequenas e para quem prefere menos movimento, vira uma faixa
   comum com rolagem horizontal nativa (mais previsível no touch e sem
   nenhum "sequestro" de scroll).
   -------------------------------------------------------------------------- */
function ativarScrollHorizontalServicos() {
  const secao = document.querySelector(".servicos-scroll");
  // A "pista" é só o miolo que cria a sobra de altura (o texto de cabeçalho
  // da seção fica FORA dela, rolando normal; isso evita que os cards fiquem
  // espremidos/cortados embaixo da tela, já que o pin só precisa caber os
  // cards, não cabeçalho + cards juntos).
  const pista = document.getElementById("pistaServicos");
  const pin = document.querySelector(".servicos-scroll__pin");
  const trilha = document.getElementById("trilhaServicos");
  if (!secao || !pista || !pin || !trilha) return;

  const semTelaGrande = window.matchMedia("(max-width: 1023px)").matches;

  if (semTelaGrande || prefereMenosMovimento()) {
    secao.classList.add("servicos-scroll--simples");
    trilha.classList.add("servicos-scroll__trilha--nativa");
    return;
  }

  const recalcularAltura = () => {
    const distanciaHorizontal = Math.max(0, trilha.scrollWidth - window.innerWidth);
    pista.style.height = `${pin.offsetHeight + distanciaHorizontal}px`;
  };

  const atualizarPosicao = () => {
    const distanciaHorizontal = trilha.scrollWidth - window.innerWidth;
    if (distanciaHorizontal <= 0) {
      trilha.style.transform = "translateX(0)";
      return;
    }
    const caixa = pista.getBoundingClientRect();
    const percurso = caixa.height - pin.offsetHeight;
    const progresso = percurso > 0 ? -caixa.top / percurso : 0;
    const progressoLimitado = Math.min(1, Math.max(0, progresso));
    trilha.style.transform = `translateX(-${progressoLimitado * distanciaHorizontal}px)`;
  };

  recalcularAltura();
  atualizarPosicao();
  window.addEventListener("scroll", porQuadro(atualizarPosicao), { passive: true });
  window.addEventListener(
    "resize",
    porQuadro(() => {
      recalcularAltura();
      atualizarPosicao();
    })
  );
}

/* --------------------------------------------------------------------------
   7. CONTADOR ANIMADO (carimbo de seguidores)
   Conta de 0 até o valor de cada "[data-contar]" assim que ele entra na
   tela, preservando o formato original (casa decimal com vírgula, sufixo
   tipo " mil" ou "x") — o texto no HTML já é o valor final real, então
   funciona mesmo se o JS falhar ou o navegador não suportar
   IntersectionObserver (só não anima, mostra o valor certo direto). Só vai
   em quantidade de verdade — ano não "conta" (não faz sentido ver 1580).
   -------------------------------------------------------------------------- */
function ativarContadores() {
  const elementos = document.querySelectorAll("[data-contar]");
  if (!elementos.length) return;

  if (prefereMenosMovimento() || !("IntersectionObserver" in window)) return;

  const observador = new IntersectionObserver(
    (entradas, observer) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          contarAte(entrada.target);
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  elementos.forEach((el) => observador.observe(el));
}

function contarAte(elemento) {
  const textoOriginal = elemento.textContent.trim();
  const correspondencia = textoOriginal.match(/^([\d.,]+)/);
  if (!correspondencia) return; // nada numérico no início — deixa o texto como está

  const numeroTexto = correspondencia[1];
  const sufixo = textoOriginal.slice(numeroTexto.length);
  const temDecimal = numeroTexto.includes(",");
  const valorFinal = parseFloat(numeroTexto.replace(/\./g, "").replace(",", "."));
  if (Number.isNaN(valorFinal)) return;

  const formatador = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: temDecimal ? 1 : 0,
    maximumFractionDigits: temDecimal ? 1 : 0,
  });

  const duracao = 1400;
  const inicio = performance.now();

  const passo = (agora) => {
    const progresso = Math.min(1, (agora - inicio) / duracao);
    const suavizado = 1 - Math.pow(1 - progresso, 3); // ease-out cúbico
    elemento.textContent = formatador.format(valorFinal * suavizado) + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

/* --------------------------------------------------------------------------
   8. VITRINE DE DESTINOS DO HERO (leque de fotos + selo "aprovado")
   Revela o leque com um pequeno atraso (depois do título entrar) — as
   fotos abrem em leque e, por último, o carimbo "bate" por cima. Paralaxe
   bem leve: cada foto se desloca alguns pixels conforme o mouse anda pela
   seção (só transform, uma vez por frame).
   -------------------------------------------------------------------------- */
function ativarVitrineDoHero() {
  const vitrine = document.getElementById("vitrineHero");
  if (!vitrine) return;

  if (prefereMenosMovimento()) {
    vitrine.classList.add("hero__vitrine--revelada");
    return;
  }

  setTimeout(() => vitrine.classList.add("hero__vitrine--revelada"), 450);
  ativarParallaxDaVitrine(vitrine);
}

function ativarParallaxDaVitrine(vitrine) {
  const hero = document.getElementById("inicio");
  const semMouseDeVerdade = window.matchMedia("(pointer: coarse)").matches;
  if (!hero || semMouseDeVerdade) return;

  const cartoes = vitrine.querySelectorAll(".hero__selo");
  const carimbo = vitrine.querySelector(".hero__carimbo");

  hero.addEventListener(
    "mousemove",
    porQuadro((evento) => {
      const centroX = window.innerWidth / 2;
      const centroY = window.innerHeight / 2;
      const deslocamentoX = (evento.clientX - centroX) / centroX;
      const deslocamentoY = (evento.clientY - centroY) / centroY;

      cartoes.forEach((cartao, indice) => {
        const profundidade = (indice + 1) * 3;
        cartao.style.setProperty("--px", `${deslocamentoX * profundidade}px`);
        cartao.style.setProperty("--py", `${deslocamentoY * profundidade}px`);
      });

      if (carimbo) {
        carimbo.style.setProperty("--px", `${deslocamentoX * 5}px`);
        carimbo.style.setProperty("--py", `${deslocamentoY * 5}px`);
      }
    })
  );
}

/* --------------------------------------------------------------------------
   9. LINHA DO PROCESSO PREENCHENDO COM O SCROLL
   A variável fica no wrapper (.processo__percurso), não na <ol>: assim ela
   chega tanto à linha (::after da lista) quanto ao avião, que é irmão da
   lista. Cada passo ganha "--alcancado" quando o avião passa por ele. Só
   existe dentro da própria seção — não afeta o resto do scroll da página.
   -------------------------------------------------------------------------- */
function ativarLinhaDoProcesso() {
  const percurso = document.getElementById("percursoProcesso");
  if (!percurso) return;
  const passos = percurso.querySelectorAll(".processo__passo");

  if (prefereMenosMovimento()) {
    percurso.style.setProperty("--progresso-processo", "1");
    passos.forEach((passo) => passo.classList.add("processo__passo--alcancado"));
    return;
  }

  const atualizar = () => {
    const caixa = percurso.getBoundingClientRect();
    const alturaJanela = window.innerHeight;
    // 0 quando o topo da lista chega a 85% da tela, 1 quando ela chega a
    // 35% — a viagem acontece enquanto a seção está bem à vista.
    const progresso = (alturaJanela * 0.85 - caixa.top) / (alturaJanela * 0.5);
    const limitado = Math.min(1, Math.max(0, progresso));
    percurso.style.setProperty("--progresso-processo", String(limitado));
    passos.forEach((passo, i) => {
      const marco = passos.length > 1 ? i / (passos.length - 1) : 0;
      passo.classList.toggle("processo__passo--alcancado", limitado >= marco - 0.001);
    });
  };

  atualizar();
  window.addEventListener("scroll", porQuadro(atualizar), { passive: true });
  window.addEventListener("resize", porQuadro(atualizar));
}
