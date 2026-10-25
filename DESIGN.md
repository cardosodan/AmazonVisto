---
name: Amazon Visto
description: A conversa em que o visto começa. O tique duplo do WhatsApp ("visto") vira o visto do passaporte.
colors:
  noite: "#070b2e"
  tinta: "#0f1862"
  tinta-2: "#141e6c"
  papel: "#f3f4f1"
  papel-2: "#e5e6e0"
  ouro: "#c9a45c"
  ouro-escuro: "#b28d47"
  vermelho: "#b3121f"
  vermelho-escuro: "#8c0d18"
  tinta-suave: "#434b70"
  papel-suave: "rgba(243, 244, 241, 0.8)"
typography:
  capa:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.75rem, 0.6rem + 5.6vw, 5.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  titulo:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2rem, 1.3rem + 3.2vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  fala:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 1rem + 1.4vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  destaque:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 1.1rem + 0.7vw, 1.625rem)"
    fontWeight: 500
    lineHeight: 1.3
  texto:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "lnum"
  pequeno:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.5
  hora:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 400
    fontFeature: "tnum"
rounded:
  rabinho: "6px"
  campo: "18px"
  msg: "22px"
  raio: "26px"
  raio-g: "clamp(56px, 7vw, 120px)"
  foto-ficha: "32%"
  foto-janela: "38%"
spacing:
  margem: "clamp(20px, 5vw, 72px)"
  entre: "clamp(64px, 7.5vw, 112px)"
  altura-barra: "72px"
  msg-gap: "10px"
components:
  botao-acao:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    typography: "{typography.texto}"
    rounded: "26px 26px 26px 6px"
    padding: "0.85rem 1.75rem"
    height: "58px"
  botao-acao-hover:
    backgroundColor: "{colors.vermelho-escuro}"
    textColor: "{colors.papel}"
  botao-pequeno:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    typography: "{typography.pequeno}"
    padding: "0.6rem 1.2rem"
    height: "46px"
  resposta:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.papel}"
    typography: "{typography.texto}"
    rounded: "22px 6px 22px 22px"
    padding: "0.6rem 1.1rem"
    height: "48px"
  resposta-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  resposta-escolhida:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
  msg-minha:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
    rounded: "22px 6px 22px 22px"
    padding: "0.75rem 1rem 0.6rem"
  fala:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    typography: "{typography.fala}"
    rounded: "6px 26px 26px 26px"
    padding: "0.85rem 1.25rem 1rem"
  pergunta-balao:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
    typography: "{typography.destaque}"
    rounded: "22px 6px 22px 22px"
    padding: "0.85rem 1.1rem"
    height: "56px"
  pergunta-resposta:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    rounded: "6px 22px 22px 22px"
    padding: "0.9rem 1.2rem 1rem"
  campo:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
    typography: "{typography.texto}"
    rounded: "18px 6px 18px 18px"
    padding: "0 1.1rem"
    height: "54px"
  cupom:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    rounded: "6px clamp(56px, 7vw, 120px) clamp(56px, 7vw, 120px) clamp(56px, 7vw, 120px)"
    padding: "clamp(24px, 4vw, 56px)"
  barra:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.papel}"
    height: "{spacing.altura-barra}"
    padding: "0 {spacing.margem}"
  flutuante:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    rounded: "50% 50% 50% 8px"
    size: "56px"
---

# Design System: Amazon Visto

## Overview

**Creative North Star: "A conversa"**

O site é a conversa no WhatsApp em que o visto começa. O tique duplo da mensagem lida, que em português se chama "visto", vira o visto do passaporte. Tudo sai de um motivo só: o balão de mensagem, cantos redondos e um canto agudo (o "rabinho", `--rabinho`), com o tique duplo desenhado em SVG (`<symbol id="visto">`). Esse balão é gigante na capa, dá forma aos botões, às respostas rápidas, aos campos, ao cupom, às perguntas e à marca do rodapé, recorta as fotos e marca as listas.

A cor é uma questão de quem fala. Dourado é a Amazon Visto, papel é o cliente, e o fundo é a noite em que a conversa acontece. As seções são campos chapados inteiros, cada um empurrando o anterior, sem gradiente, sem sombra parada e sem fio fino. Uma família (Chillax, servida do próprio site em 400, 500 e 600) faz tudo; a hierarquia vem do tamanho e do peso, nunca de uma segunda fonte.

A página é viva na capa: a conversa tem presença real ("online agora" ou "visto por último … às 18:00", na hora de Manaus), carimba as mensagens com a hora de Manaus, "digita" e responde. Fora da capa o movimento é contido: entradas em cascata, uma foto que abre como obturador, os vistos do diagrama que se desenham. Tudo tem versão para "reduzir movimento".

**Key Characteristics:**
- Um motivo: o balão com um canto agudo e o tique duplo desenhado.
- Cor como voz: dourado fala pela empresa, papel pelo cliente, vermelho só age.
- Campos de seção chapados em noite, papel e tinta, que nunca se misturam.
- Uma família, Chillax, com seis degraus fluidos de tamanho.
- A capa é uma conversa que funciona e sai pronta para o WhatsApp.
- Bilíngue por geração: `es.html` sai do `index.html`, nunca é editado à mão.

## Colors

Azul-meia-noite de fundo, dourado e papel como as duas vozes, azul-marinho como segundo campo e um vermelho que só aparece onde se age.

### Primary
- **Dourado Visto** (`--ouro`): a voz da Amazon Visto. Fundo do balão gigante da capa (`.conversa`), dos balões de prova (`.fala`), das respostas das dúvidas (`.pergunta__resposta`), do cupom do contato (`.cupom`) e da marca do rodapé (`.rodape__marca`). Também é o traço do tique duplo sobre fundos escuros (`.dg-visto`, `.rodape__visto`, `.caminho__colunas h3 .icone-visto`), o contorno de foco padrão, a seleção de texto, o sublinhado de hover da barra e o `accent-color`/`caret-color`.
- **Dourado Fundo** (`--ouro-escuro`): só o polegar da barra de rolagem (`scrollbar-color`).

### Secondary
- **Vermelho Enviar** (`--vermelho`): só em ações. Fundo de `.botao--acao` (todos os botões de falar no WhatsApp e de enviar) e do botão flutuante (`.flutuante`).
- **Vermelho Pressionado** (`--vermelho-escuro`): hover do `.botao--acao`, só com mouse.

### Tertiary
- **Tinta** (`--tinta`): azul-marinho. Campo das seções Como funciona, Sobre e Contato; cor do texto no campo de papel (Serviços); tique duplo "visto" (lido) nas mensagens e nas perguntas abertas; marcadores das listas `.vistos`; contorno de foco dentro dos campos claros e dourados; hover das respostas rápidas.
- **Tinta Funda** (`--tinta-2`): fundo da janela do vídeo de nuvens (`.contato__janela`) enquanto o vídeo carrega.

### Neutral
- **Noite** (`--noite`): fundo da página, da barra, da capa, de Provas, de Dúvidas e do rodapé; texto sobre dourado e sobre papel.
- **Papel** (`--papel`): a voz do cliente (`.msg--minha`, `.pergunta__balao`, `.compositor textarea`, campos do cupom, resposta escolhida); campo da seção Serviços; texto sobre noite e tinta.
- **Papel Sombra** (`--papel-2`): fundo atrás das fotos recortadas das fichas, para a borda arredondada não ganhar fio escuro.
- **Tinta Suave** (`--tinta-suave`): texto secundário sobre papel (`.destino__fato`, `.ficha__dados dt`, placeholder) e tique duplo ainda "não visto".
- **Papel Suave** (`--papel-suave`): texto secundário sobre noite e tinta (selos da capa, textos de Sobre e de Como funciona, links e pé do rodapé).

### Named Rules
**A Regra das Vozes.** Dourado é a Amazon Visto falando, papel é o cliente. Um balão da empresa é dourado e tem o rabinho em cima, à esquerda; um balão do cliente é papel e tem o rabinho em cima, à direita. Nunca troque as vozes.

**A Regra do Vermelho.** Vermelho só existe em ação: o botão que leva ou envia ao WhatsApp. Nunca em título, ícone, destaque de texto ou fundo de seção.

**A Regra dos Campos.** Cada seção é um campo chapado inteiro, na ordem: capa noite, Serviços papel, Como funciona tinta, Provas noite, Sobre tinta, Dúvidas noite, Contato tinta, rodapé noite. Dois campos vizinhos nunca têm a mesma cor, e nenhum campo se mistura com outro por gradiente.

## Typography

**Display Font:** Chillax (com Segoe UI, system-ui, sans-serif)
**Body Font:** Chillax (a mesma família)

**Character:** Uma geométrica redonda, amigável sem ser infantil, que conversa com a curva do balão. Títulos em 600 com tracking negativo; a fala da empresa em 500; o texto corrido em 400 com algarismos alinhados.

### Hierarchy
- **Capa** (600, `--t-capa`, 1): o título da capa ("Seu visto, visto por nós") e o nome do destino principal (`.destino--principal .destino__nome`, Estados Unidos).
- **Título** (600, `--t-titulo`, 1.04): os `h2` das seções, os nomes dos outros destinos (tracking -0.035em), os `h3` das fichas e os links do menu aberto no celular.
- **Fala** (500 a 600, `--t-fala`): a voz da empresa em destaque: os balões de prova (`.fala`) e a mensagem de abertura da capa (`.msg--abertura`, 600, 1.12). Frase, não título: até 36px.
- **Destaque** (500 a 600, `--t-destaque`): a marca na barra, a frase de apoio da capa (1.4), as respostas da conversa, as perguntas das dúvidas, os `h3` de Como funciona e Sobre, os `h4` das fichas.
- **Texto** (400, `--t-texto`, 1.5): corpo, botões (600), links da barra no desktop (500). Linhas entre 30ch e 40ch.
- **Pequeno** (400, `--t-pequeno`): selos da capa, rótulos das fichas, links e pé do rodapé, botão pequeno.
- **Hora** (400, 0.8125rem, algarismos tabulares, opacidade 0.75): só o carimbo de hora das mensagens (`.msg__hora`), como no próprio WhatsApp.

A marca do rodapé (`.rodape__marca`) é a exceção única de escala: `clamp(2.5rem, 11.6vw, 11rem)`, 600, tracking -0.045em, entrelinha 0.9, o nome inteiro dentro do balão dourado.

### Named Rules
**A Regra de Uma Família.** Chillax em 400, 500 e 600, e nada mais. Sem itálico, sem segunda família, sem caixa-alta.

**A Regra dos Números da Conversa.** Hora, presença e números de prova usam algarismos tabulares (`tabular-nums`); o resto usa `lining-nums`.

## Layout

Mobile-first. A margem lateral é `--margem` e o respiro vertical de cada seção é `--entre`, em cima e embaixo. A barra é fixa, com `--altura-barra`, e a rolagem por âncora desconta a barra mais 16px.

- **Capa:** uma coluna no celular (o balão da conversa desce para baixo do título); a partir de 900px, grade 7fr / 5fr, altura mínima 100svh, o balão estica até a borda de baixo e sangra a margem direita.
- **Seções de conversa** (Serviços, Provas, Dúvidas): uma coluna; a partir de 1024px, grade 3fr / 9fr com o título na coluna estreita.
- **Fichas de serviço:** foto acima do texto; a partir de 1024px, 5fr / 7fr com a foto `sticky` abaixo da barra. Listas em duas colunas a partir de 640px.
- **Como funciona:** no celular o diagrama fica em pé à esquerda e cada texto na altura do seu terço; a partir de 768px o diagrama deita e os textos viram três colunas.
- **Sobre:** a foto vem por último no celular; a partir de 1024px, duas colunas com a foto embaixo à esquerda, cortada pela borda de baixo da seção.
- **Contato:** a partir de 900px, cupom 7fr e janela de vídeo 5fr.
- **Rodapé:** um campo vazio com o tique duplo sozinho (`.rodape__fim`, o único vazio de propósito da página), a marca no balão, colunas 2 e depois 4 a partir de 900px.
- **Fios de conversa:** mensagens a 10px (`spacing.msg-gap` no frontmatter: `.conversa__mensagens`, `.pergunta`, `.compositor`, `.cupom__campos`); os balões de prova a 12px; as perguntas a 16px.

Breakpoints em uso: 640px, 768px, 900px, 1024px (todos `min-width`, mais `max-width: 767px` e `639px` para os casos de celular).

## Elevation & Depth

Plano. A profundidade vem dos campos de cor e do corte: o balão da capa sangra pela direita e por baixo, a foto do Sobre é cortada pela borda da seção. Só um elemento tem sombra, porque só ele flutua de verdade.

### Shadow Vocabulary
- **Flutuante** (`box-shadow: 0 12px 28px -10px rgba(0, 0, 0, 0.45)`): o botão de WhatsApp fixo no canto (`.flutuante`). Nada mais.

### Named Rules
**A Regra da Sombra que Flutua.** Sombra só no que fica por cima do conteúdo ao rolar. Cartão, balão, foto e botão parados não têm sombra.

## Shapes

Toda forma é um balão: raio grande em três cantos e o canto agudo (`--rabinho`) no quarto. A posição do canto agudo diz quem fala.

- **Rabinho em cima à esquerda** (a mensagem que chega, a empresa): `.fala`, `.pergunta__resposta`, `.msg`, `.cupom`, `.rodape__marca`, o balão gigante da capa (`--rabinho 0 0 clamp(96px, 14vw, 240px)`) e as fotos recortadas (`.ficha__foto` com `--rabinho 32% 32% 32%`; `.sobre__foto` e `.contato__janela` com `--rabinho 38% 38% 38%`).
- **Rabinho em cima à direita** (o cliente): `.msg--minha`, `.resposta`, `.pergunta__balao`, `.compositor textarea`, campos do cupom (18px).
- **Rabinho embaixo à esquerda** (o botão de agir): `.botao` com `--raio --raio --raio --rabinho`.
- **Círculo:** só o logo (36px na barra, 44px na conversa) e os pontos de "digitando".

Escala de raios: `--rabinho` (canto agudo), 18px (campos), 22px (mensagens e perguntas), `--raio` (botões, balões de prova), `--raio-g` (cupom, marca do rodapé), e porcentagens (32%, 38%) nas fotos. Bordas desenhadas não existem: campos e botões têm `border: 0`.

O traço do tique duplo é sempre o mesmo glifo (`#visto`, viewBox 22 × 14), com ponta e junta redondas, na cor do texto (`currentColor`). A espessura se ajusta à escala: 1.9 no uso comum, 2.3 no diagrama, 1.5 no tique gigante do rodapé, 2.2 nas máscaras CSS dos marcadores.

## Components

### Buttons
Um botão é um balão que se envia.
- **Shape:** balão com o rabinho embaixo à esquerda (`--raio` em três cantos, `--rabinho` no quarto); altura mínima 58px.
- **Primary (`.botao--acao`):** vermelho com texto papel, 600, tamanho `--t-texto`, o tique duplo ou o ícone do WhatsApp ao lado do texto.
- **Pequeno (`.botao--pequeno`):** altura 46px, `--t-pequeno`.
- **Hover / Focus:** hover para `--vermelho-escuro` só com mouse (`hover: hover` e `pointer: fine`), em `--t-hover`; pressionar encolhe para `scale(0.97)` em `--t-press` com `--ease-out`; foco com contorno dourado de 3px afastado 3px (tinta dentro de campos claros e dourados).

### Respostas rápidas (chips)
- **Style:** balões do cliente em noite sobre o dourado da capa, texto papel, 500, altura mínima 48px, rabinho em cima à direita.
- **State:** `aria-pressed="true"` vira papel com texto noite (a mensagem escolhida); hover em tinta só com mouse; pressionar `scale(0.96)`.

### Cards / Containers
Não há cartões. Os containers são balões de fala:
- **Balão de prova (`.fala`):** dourado, texto noite em `--t-fala`, rabinho em cima à esquerda, até 30ch, em fila como numa conversa. A variante com foto (`.fala--foto`) leva a imagem 3:2 dentro do balão e a legenda embaixo.
- **Cupom (`.cupom`):** o compositor do fim, dourado com `--raio-g`, campos em papel dentro.
- **Ficha de serviço (`.ficha`):** direto no papel, sem painel: foto recortada no balão, título, dados em duas colunas, o caminho em quatro etapas e a lista com o tique duplo no lugar do marcador (`.vistos`).

### Inputs / Fields
- **Style:** papel, texto noite, sem borda, altura mínima 54px, raio 18px com rabinho em cima à direita (a voz do cliente). O `select` leva a seta desenhada em noite à direita. O `textarea` do compositor da capa segue o mesmo balão com 22px.
- **Focus:** contorno de 3px em tinta (dentro de `.cupom` e `.conversa`).
- **Placeholder:** `--tinta-suave`.

### Navigation
- **Barra (`.barra`):** fixa, noite, 72px; marca (logo em círculo de papel e "Amazon Visto" em `--t-destaque`) à esquerda; Serviços, Como funciona, Dúvidas e o seletor de idioma à direita, em `--t-texto` 500. Hover: sublinhado dourado de 2px afastado 6px.
- **Celular (até 767px):** o botão "Menu" abre um painel noite que desce da barra com os links em `--t-titulo`; fechado, fica inteiro acima da tela e invisível. Fecha ao tocar num link ou com Esc. Os rótulos de abrir e fechar vêm de `data-rotulo-*`.

### Destinos (signature)
Os serviços como faixas de letra grande: cada `.destino` é um link para a ficha (`#visto-americano`), nome em `--t-titulo` (Estados Unidos em `--t-capa`) e o fato em `--t-texto` tinta suave à direita. O destino aberto (`aria-current="true"`) ganha o tique duplo ao lado do nome. Trocar de ficha anima a ficha nova em 0.32s.

### A conversa da capa (signature)
O balão dourado gigante, cortado pela direita e por baixo, com uma conversa de verdade dentro:
- **Topo:** logo, "Amazon Visto" e a linha de presença (`#presenca`), calculada na hora de Manaus (`America/Manaus`): "online agora" de segunda a sexta, das 9h às 18h; fora disso, "visto por último hoje / ontem / sexta às 18:00". Atualiza na virada de cada minuto e quando a aba volta. Sem JS, mostra o horário de atendimento.
- **Mensagens:** a abertura da empresa em `--t-fala`, direto no dourado, sem balão; cada mensagem leva a hora de Manaus.
- **Interação:** tocar numa resposta rápida põe a mensagem do cliente (balão de papel, rabinho à direita, tique duplo em tinta suave); depois de 450ms o tique fica "visto" (tinta) e aparecem os três pontos de "digitando"; 1100ms depois chega a resposta daquele caso, e o compositor recebe a mensagem pronta (`data-mensagem`). Enviar abre o WhatsApp com esse texto; sem JS, o formulário faz o mesmo.

### Dúvidas como conversa
A pergunta é o balão do cliente (`.pergunta__balao`, papel, à direita, com o tique duplo que fica "visto" quando aberta); a resposta é a empresa (`.pergunta__resposta`, dourado, à esquerda). Uma aberta por vez, a primeira começa aberta; sem JS, todas aparecem.

### Diagrama "Da papelada ao visto"
Gerado por `scripts/gerar-diagrama.mjs` com semente fixa (20251) e escrito dentro do `index.html`: balões de 14px soltos em papel a 0.3 e 0.62 de opacidade (a papelada), apertados numa faixa de três (a conversa) e, à direita, fileiras de tiques duplos dourados (os vistos). Duas versões: deitada (a partir de 768px) e em pé (celular). Nunca edite o SVG à mão; rode o gerador.

### Botão flutuante
Vermelho, 56px, quase círculo com um canto de 8px embaixo à esquerda, ícone do WhatsApp em papel, a única sombra do sistema. Escondido enquanto a capa está na tela; entra em 0.24s e sai em 0.16s.

### Movimento
Easings: `--ease-out` (pressão, chegada de mensagens, trocas), `--ease-expo` (entradas ao rolar), `--ease-in-out` (obturador), `--ease-soft` (zoom da foto do obturador). Durações: `--t-press` (pressionar), `--t-hover` (hover de cor).

| Movimento | Onde | Valores |
| --- | --- | --- |
| Entrada em cascata | `.entrada`, uma vez ao entrar na tela | sobe 24px e aparece; 0.8s / 0.9s `--ease-expo`; 75ms entre partes da mesma seção, até 0.45s |
| Mensagem que chega | `.msg.chegando`, resposta das dúvidas | `chegar`: sobe 10px de `scale(0.96)` a partir do canto do rabinho; 0.42s (0.36s nas dúvidas) `--ease-out` |
| Digitando | três pontos de `.msg--digitando` | `digitar` 1s em loop, defasado 0.15s |
| Obturador | foto do visto americano, uma vez | `clip-path` de baixo para cima em 1.1s `--ease-in-out`, foto de `scale(1.12)` a 1 em 1.5s `--ease-soft` |
| Vistos que se desenham | `.dg-visto` do diagrama | `stroke-dashoffset` 26 → 0 em 0.5s, 22ms entre cada; a faixa aparece antes, 8ms entre cada |
| Troca de ficha | `.ficha.trocando` | `trocarFicha` 0.32s |
| Contador | seguidores no Instagram | de 0 ao valor do HTML em 1.4s, uma vez |
| Fotos que carregam | `img[loading="lazy"]` | fade de 0.5s |
| Vídeo das nuvens | `.contato__janela` | toca só na tela, pausa fora |

**Reduzir movimento:** com `prefers-reduced-motion: reduce` nada se esconde para entrar (as regras de entrada só existem em `no-preference`), animações e transições caem para 0.001ms, a rolagem fica instantânea, a conversa responde na hora sem "digitando", o obturador já vem aberto, o contador mostra o valor final, o vídeo fica no quadro parado e as fotos não fazem fade. Sem JS, nada fica escondido.

### Bilíngue e pendências
- `es.html` é gerado do `index.html` por `scripts/gerar-es.mjs` (pares `[português, espanhol]` em `TEXTOS`, trocas de atributo em `ESTRUTURA`). Na versão em espanhol todos os links e formulários de WhatsApp vão para o número do Peru, com a mensagem traduzida, e o seletor de idioma aponta de volta para o português. O script avisa traduções sem par e trechos que ainda parecem português. Nunca edite `es.html` à mão.
- O que a empresa ainda não informou fica no HTML com `hidden` e um comentário `TROCAR:` (ou `TROCAR/REVISAR:` para o que precisa de confirmação): preço "a partir de", itens específicos de cada serviço, CNPJ, Reclame Aqui, URL real, horário de atendimento. O `TROCAR` atravessa para o `es.html` (o preço perde o "R$").

## Do's and Don'ts

### Do:
- **Do** dar a cada nova forma o canto agudo do balão (`--rabinho`), na posição de quem fala: em cima à esquerda para a empresa, em cima à direita para o cliente, embaixo à esquerda para o botão.
- **Do** pôr a voz da empresa em dourado com texto noite e a voz do cliente em papel com texto noite.
- **Do** desenhar o tique duplo sempre com o mesmo `<symbol id="visto">`, traço redondo em `currentColor`.
- **Do** alternar os campos de seção (noite, papel, tinta) para que dois vizinhos nunca tenham a mesma cor.
- **Do** usar só os tamanhos de `--t-*` e Chillax em 400, 500 ou 600.
- **Do** dar hover só com mouse (`hover: hover` e `pointer: fine`), pressão em escala em todo controle e uma versão para reduzir movimento em toda animação nova.
- **Do** acrescentar o par de tradução em `scripts/gerar-es.mjs` para todo texto novo e gerar o `es.html` de novo.
- **Do** guardar todo dado pendente com `hidden` e um comentário `TROCAR:`.

### Don't:
- **Don't** usar vermelho fora de uma ação de WhatsApp ou de envio.
- **Don't** usar gradiente, sombra em elemento parado ou fio fino de borda e divisória.
- **Don't** misturar dois campos de seção numa mesma faixa ou pôr um cartão de outra cor dentro de um campo.
- **Don't** escrever o tique duplo como caractere de texto (✓✓); ele é sempre o SVG desenhado.
- **Don't** editar `es.html` ou o SVG do diagrama à mão; eles são gerados.
- **Don't** mostrar a presença "online" fora do horário real de atendimento na hora de Manaus.
