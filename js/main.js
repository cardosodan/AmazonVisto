/* ==========================================================================
   TEMPLATE DE SITE INSTITUCIONAL — JAVASCRIPT
   ==========================================================================
   JS puro, sem dependências. Cada responsabilidade numa função separada e
   independente das outras — se algo aqui der erro, o resto do site
   continua funcionando normalmente.

   Sobre o movimento do site: nada de cursor customizado, ímã em botão
   perseguindo o mouse pela tela toda, ou tilt 3D — pra um negócio sério
   (assessoria de visto/passaporte), isso lê como pouco confiável. Os
   efeitos abaixo são todos CONTIDOS: o brilho do card só existe dentro do
   próprio card, o zoom da foto é no fundo do hero, a linha do processo
   segue o scroll da seção onde já está. Nada "solto" por cima da página.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  ativarMenuMobile();
  ativarSombraDoCabecalhoAoRolar();
  ativarRevelacaoAoRolar();
  ativarLinkAtivoNaNavegacao();
  atualizarAnoDoRodape();
  ativarScrollHorizontalServicos();
  ativarTypewriterDeServicos();
  ativarContadores();
  ativarTituloEmLetras();
  ativarBrilhoNosCards();
  ativarLinhaDoProcesso();
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
          const elemento = entrada.target;

          // Atraso extra pra quem tem outros ".reveal" irmãos (mesmo pai) —
          // dá um efeito de cascata em grades (cards de serviço,
          // diferenciais, passos do processo) sem precisar numerar nada
          // manualmente no HTML.
          const irmaosRevelaveis = elemento.parentElement
            ? Array.from(elemento.parentElement.children).filter((el) =>
                el.classList.contains("reveal")
              )
            : [];
          const indice = irmaosRevelaveis.indexOf(elemento);
          if (indice > 0) {
            elemento.style.transitionDelay = `${Math.min(indice * 0.08, 0.4)}s`;
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
   nenhum "sequestro" de scroll). -------------------------------------------------------------------------- */
function ativarScrollHorizontalServicos() {
  const secao = document.querySelector(".servicos-scroll");
  const trilha = document.getElementById("trilhaServicos");
  if (!secao || !trilha) return;

  const semTelaGrande = window.matchMedia("(max-width: 1023px)").matches;
  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (semTelaGrande || prefereMenosMovimento) {
    secao.classList.add("servicos-scroll--simples");
    trilha.classList.add("servicos-scroll__trilha--nativa");
    return;
  }

  const alturaCabecalho = 72; // mesmo valor do "top" do .servicos-scroll__pin no CSS

  const recalcularAltura = () => {
    const distanciaHorizontal = Math.max(0, trilha.scrollWidth - window.innerWidth);
    secao.style.height = `${window.innerHeight - alturaCabecalho + distanciaHorizontal}px`;
  };

  const atualizarPosicao = () => {
    const distanciaHorizontal = trilha.scrollWidth - window.innerWidth;
    if (distanciaHorizontal <= 0) {
      trilha.style.transform = "translateX(0)";
      return;
    }
    const caixa = secao.getBoundingClientRect();
    const percurso = caixa.height - window.innerHeight;
    const progresso = percurso > 0 ? -caixa.top / percurso : 0;
    const progressoLimitado = Math.min(1, Math.max(0, progresso));
    trilha.style.transform = `translateX(-${progressoLimitado * distanciaHorizontal}px)`;
  };

  recalcularAltura();
  atualizarPosicao();
  window.addEventListener("scroll", atualizarPosicao, { passive: true });
  window.addEventListener("resize", () => {
    recalcularAltura();
    atualizarPosicao();
  });
}

/* --------------------------------------------------------------------------
   7. TYPEWRITER COM OS SERVIÇOS (eyebrow do hero)
   Digita e apaga cada serviço em loop, letra por letra — reforça logo no
   primeiro segundo da página que a empresa cobre vários tipos de visto,
   sem precisar de mais espaço no layout. O texto completo (lista inteira)
   também existe fixo e "visualmente-oculto" pra leitor de tela, já que o
   span animado é aria-hidden. Quem prefere menos movimento vê só o
   primeiro serviço, fixo, sem digitar/apagar.
   -------------------------------------------------------------------------- */
function ativarTypewriterDeServicos() {
  const alvo = document.getElementById("typewriterServico");
  if (!alvo) return;

  const servicos = [
    "Visto Americano",
    "Visto Canadense",
    "Visto Chinês",
    "Visto Peruano",
    "Passaporte Brasileiro",
    "Intercâmbio",
  ];

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    alvo.textContent = servicos[0];
    return;
  }

  const VELOCIDADE_DIGITACAO = 70;
  const VELOCIDADE_APAGAR = 35;
  const PAUSA_PALAVRA_COMPLETA = 1700;
  const PAUSA_ENTRE_PALAVRAS = 350;

  let indicePalavra = 0;
  let indiceLetra = 0;
  let apagando = false;

  const passo = () => {
    const palavraAtual = servicos[indicePalavra];

    if (!apagando) {
      indiceLetra++;
      alvo.textContent = palavraAtual.slice(0, indiceLetra);
      if (indiceLetra === palavraAtual.length) {
        apagando = true;
        setTimeout(passo, PAUSA_PALAVRA_COMPLETA);
        return;
      }
      setTimeout(passo, VELOCIDADE_DIGITACAO);
    } else {
      indiceLetra--;
      alvo.textContent = palavraAtual.slice(0, indiceLetra);
      if (indiceLetra === 0) {
        apagando = false;
        indicePalavra = (indicePalavra + 1) % servicos.length;
        setTimeout(passo, PAUSA_ENTRE_PALAVRAS);
        return;
      }
      setTimeout(passo, VELOCIDADE_APAGAR);
    }
  };

  setTimeout(passo, 900);
}

/* --------------------------------------------------------------------------
   8. CONTADOR ANIMADO (faixa de números/prêmios)
   Conta de 0 até o valor de cada "[data-contar]" assim que ele entra na
   tela, preservando o formato original (casa decimal com vírgula, sufixo
   tipo " mil" ou "x") — o texto no HTML já é o valor final real, então
   funciona mesmo se o JS falhar ou o navegador não suportar
   IntersectionObserver (só não anima, mostra o valor certo direto). É o
   único efeito de "prova" do site — dado real, não decoração.
   -------------------------------------------------------------------------- */
function ativarContadores() {
  const elementos = document.querySelectorAll("[data-contar]");
  if (!elementos.length) return;

  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefereMenosMovimento || !("IntersectionObserver" in window)) return;

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

  const duracao = 1400;
  const inicio = performance.now();

  const passo = (agora) => {
    const progresso = Math.min(1, (agora - inicio) / duracao);
    const suavizado = 1 - Math.pow(1 - progresso, 3); // ease-out cúbico
    const valorAtual = valorFinal * suavizado;
    elemento.textContent = formatarNumeroContado(valorAtual, temDecimal) + sufixo;
    if (progresso < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
}

function formatarNumeroContado(valor, comDecimal) {
  if (comDecimal) {
    return valor.toFixed(1).replace(".", ",");
  }
  return Math.round(valor).toString();
}

/* --------------------------------------------------------------------------
   9. TÍTULO DO HERO EM LETRAS
   Divide "Amazon Visto" em uma letra por <span> e revela em cascata — texto
   real é preservado via aria-label pra leitor de tela, os spans individuais
   ficam aria-hidden. Sem lib nenhuma (nada de SplitText pago). Pra quem
   prefere menos movimento, o texto nem é dividido — fica normal, direto.
   -------------------------------------------------------------------------- */
function ativarTituloEmLetras() {
  const titulo = document.getElementById("heroTitulo");
  if (!titulo) return;

  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefereMenosMovimento) return;

  const texto = titulo.textContent;
  titulo.setAttribute("aria-label", texto);
  titulo.textContent = "";

  const wrapperLetras = document.createElement("span");
  wrapperLetras.setAttribute("aria-hidden", "true");

  texto.split("").forEach((caractere, indice) => {
    const letra = document.createElement("span");
    letra.className = "hero__titulo-letra";
    letra.textContent = caractere === " " ? " " : caractere;
    letra.style.transitionDelay = `${0.5 + indice * 0.035}s`;
    wrapperLetras.appendChild(letra);
  });

  titulo.appendChild(wrapperLetras);

  // Força o navegador a "registrar" o estado inicial (opacity:0) antes de
  // adicionar a classe que dispara a transição — sem isso as duas mudanças
  // podem cair no mesmo frame e a transição simplesmente não roda.
  requestAnimationFrame(() => {
    titulo.classList.add("hero__titulo--revelado");
  });
}

/* --------------------------------------------------------------------------
   10. BRILHO NOS CARDS DE SERVIÇO (contido em cada card)
   Atualiza duas variáveis CSS (--mx/--my) com a posição do mouse relativa
   ao card, só enquanto o mouse está sobre ELE — o brilho (ver CSS,
   ".cartao-produto::after") nunca existe fora do card. Sem tela inteira,
   sem cursor customizado.
   -------------------------------------------------------------------------- */
function ativarBrilhoNosCards() {
  const cartoes = document.querySelectorAll(".cartao-produto");
  if (!cartoes.length) return;

  const semMouseDeVerdade = window.matchMedia("(pointer: coarse)").matches;
  if (semMouseDeVerdade) return;

  cartoes.forEach((cartao) => {
    cartao.addEventListener("mousemove", (evento) => {
      const caixa = cartao.getBoundingClientRect();
      const x = ((evento.clientX - caixa.left) / caixa.width) * 100;
      const y = ((evento.clientY - caixa.top) / caixa.height) * 100;
      cartao.style.setProperty("--mx", `${x}%`);
      cartao.style.setProperty("--my", `${y}%`);
    });
  });
}

/* --------------------------------------------------------------------------
   11. LINHA DO PROCESSO PREENCHENDO COM O SCROLL
   Atualiza --progresso-processo (0 a 1) conforme a lista de passos atravessa
   a viewport — a linha (ver CSS, ".processo__lista::after") "desenha" o
   percurso enquanto o visitante rola, em vez de aparecer pronta de uma vez.
   Só existe dentro da própria seção — não afeta o resto do scroll da página.
   -------------------------------------------------------------------------- */
function ativarLinhaDoProcesso() {
  const lista = document.querySelector(".processo__lista");
  if (!lista) return;

  const prefereMenosMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefereMenosMovimento) {
    lista.style.setProperty("--progresso-processo", "1");
    return;
  }

  const atualizar = () => {
    const caixa = lista.getBoundingClientRect();
    const alturaJanela = window.innerHeight;
    // 0 quando o topo da lista encosta na base da tela, 1 quando a base da
    // lista passa pelo topo — a linha desenha enquanto a seção atravessa.
    const progresso = (alturaJanela - caixa.top) / (alturaJanela + caixa.height);
    lista.style.setProperty("--progresso-processo", String(Math.min(1, Math.max(0, progresso))));
  };

  atualizar();
  window.addEventListener("scroll", atualizar, { passive: true });
  window.addEventListener("resize", atualizar);
}
