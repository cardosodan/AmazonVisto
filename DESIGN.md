---
name: Amazon Visto
description: Os papéis de uma viagem que sai de Manaus, numa conversa só.
colors:
  noite: "#070b2e"
  tinta: "#0f1862"
  tinta-2: "#141e6c"
  papel: "#f3f4f1"
  papel-2: "#e5e6e0"
  papel-claro: "#fbfbf8"
  ouro: "#c9a45c"
  ouro-escuro: "#b28d47"
  vermelho: "#b3121f"
  vermelho-escuro: "#8c0d18"
  tinta-suave: "#434b70"
  papel-suave: "rgba(243, 244, 241, 0.8)"
  cabine: "#bec2c7"
  cabine-sombra: "#999fae"
  cabine-clara: "#d7d9d7"
  vedacao: "#6b7289"
  luz-noite: "rgb(110 124 230 / 0.2)"
  poca: "rgb(110 124 230 / 0.16)"
typography:
  capa:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(2.375rem, 0.9rem + 4.4vw, 4.75rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.03em"
  titulo:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 1.2rem + 3.2vw, 4rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.03em"
  fala:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 0.9rem + 1.5vw, 2.25rem)"
    fontWeight: 500
    lineHeight: 1.18
    letterSpacing: "-0.02em"
  destaque:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.1875rem, 1.05rem + 0.7vw, 1.625rem)"
    fontWeight: 600
    lineHeight: 1.18
    letterSpacing: "-0.01em"
  texto:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  pequeno:
    fontFamily: "Chillax, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  mrz:
    fontFamily: "OCR-B, OCR B, ui-monospace, Cascadia Mono, Consolas, Courier New, monospace"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "normal"
rounded:
  canto-papel: "4px"
  rabinho: "6px"
  raio-p: "20px"
  raio: "26px"
  mascara-foto: "38%"
  circulo: "50%"
spacing:
  margem: "clamp(20px, 5vw, 72px)"
  entre: "clamp(64px, 7.5vw, 112px)"
  altura-barra: "72px"
  moldura-capa: "12px"
components:
  botao-acao:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    typography: "{typography.texto}"
    rounded: "{rounded.raio}"
    padding: "0.85rem 1.75rem"
    height: "58px"
  botao-acao-hover:
    backgroundColor: "{colors.vermelho-escuro}"
    textColor: "{colors.papel}"
  botao-pequeno:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    typography: "{typography.pequeno}"
    rounded: "{rounded.raio}"
    padding: "0.6rem 1.2rem"
    height: "46px"
  resposta:
    backgroundColor: "{colors.noite}"
    textColor: "{colors.papel}"
    typography: "{typography.pequeno}"
    rounded: "{rounded.raio-p}"
    padding: "0.5rem 0.95rem"
    height: "44px"
  resposta-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
  resposta-escolhida:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
  conversa:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    rounded: "{rounded.raio}"
    padding: "24px 26px 26px"
  msg-minha:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
    rounded: "{rounded.raio-p}"
    padding: "0.65rem 0.9rem 0.55rem"
  fala:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    typography: "{typography.fala}"
    rounded: "{rounded.raio}"
    padding: "0.85rem 1.25rem 1rem"
  pergunta-balao:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.noite}"
    typography: "{typography.texto}"
    rounded: "{rounded.raio-p}"
    padding: "0.85rem 1.1rem"
    height: "56px"
  pergunta-resposta:
    backgroundColor: "{colors.ouro}"
    textColor: "{colors.noite}"
    rounded: "{rounded.raio-p}"
    padding: "0.9rem 1.2rem 1rem"
  campo-embarque:
    backgroundColor: "{colors.papel-2}"
    textColor: "{colors.noite}"
    typography: "{typography.texto}"
    rounded: "{rounded.raio-p}"
    padding: "0 1rem"
    height: "50px"
  documento:
    backgroundColor: "{colors.papel}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.canto-papel}"
  placa:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.papel}"
    rounded: "{rounded.canto-papel}"
    padding: "0.26em 0.1em 0.22em"
    width: "0.95em"
  flutuante:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.papel}"
    rounded: "{rounded.circulo}"
    size: "56px"
---

# Design System: Amazon Visto

## Overview

**Creative North Star: "Os papéis da viagem, numa conversa só"**

O site é a viagem de quem sai de Manaus, contada por dois tipos de peça. De um lado, os **documentos**: papel claro com granulado e guilhoche de segurança, cantos quase retos, a borda listrada do correio aéreo, a zona de leitura (MRZ) em letra de máquina e o carimbo redondo. São a página de dados do passaporte (capa), o painel de partidas e a página de visto (serviços), o cartão de visita (visite), o cartão de embarque que se preenche (contato) e o cartão-postal (rodapé). Do outro, a **conversa**: balões de cantos redondos com um canto agudo, o rabinho. São a conversa viva da capa, as provas, as dúvidas e os botões. O dourado é a voz da Amazon Visto; o papel é a voz do cliente.

O tique duplo do WhatsApp, que em português se chama "visto", liga as duas famílias. Na conversa ele marca a mensagem lida; no documento ele é o miolo do carimbo, o visto que o papel recebe. Todo "visto" do sistema (carimbo, marcador de lista, destino aberto, pergunta aberta, botão de enviar) usa o mesmo desenho (`#visto`, traço 1.9, pontas redondas).

As cores entram em campos inteiros e chapados: azul-meia-noite de fundo, azul-marinho como campo de uma seção, papel nos documentos, dourado na voz da empresa e vermelho nas ações e na listra do envelope. Uma família tipográfica (Chillax, servida do próprio site). As cores são chapadas e lisas, com uma sombra macia para separar o papel do fundo e um brilho suave no fundo escuro (Elevation & Depth); sem fio fino. A densidade é de página de passaporte: blocos grandes de tipo e só os ornamentos que um documento de verdade tem.

**Key Characteristics:**
- Duas famílias com papéis fixos: documento (papel, `--canto-papel`) e conversa (balão, `--rabinho`).
- Dourado fala pela empresa, papel fala pelo cliente, vermelho é ação.
- O tique duplo é o único ícone de "visto", na conversa e no carimbo.
- Campos de cor inteiros, sem gradiente; profundidade por sobreposição de peças, não por sombra.
- Peças vivas com dado real: hora de Manaus, hora local de cada destino, destino do cartão de embarque.

## Colors

Cinco cores da marca (decisão do usuário) em campos chapados, com tons de apoio para texto e estados.

### Primary
- **Vermelho Correio Aéreo** (`--vermelho`): toda ação que leva ao WhatsApp (`.botao--acao`, `.flutuante`) e os paralelogramos da listra do envelope (`--listra`). Também o avião do cartão de embarque e o feixe do leitor de código de barras.
- **Vermelho Lacre** (`--vermelho-escuro`): só o hover do botão de ação.

### Secondary
- **Dourado da Voz** (`--ouro`): a voz da Amazon Visto. O balão da conversa da capa, as falas das provas, as respostas das dúvidas. Também o anel de foco padrão, `accent-color`, `caret-color`, `::selection` e o guilhoche das seções escuras (provas, contato).
- **Dourado Envelhecido** (`--ouro-escuro`): só o polegar da barra de rolagem.

### Tertiary
- **Azul-Marinho Tinta** (`--tinta`): a tinta dos documentos (texto sobre papel, plaquetas, carimbo, guilhoche sobre papel, tique dos marcadores) e o campo inteiro da seção Sobre. Anel de foco dentro de papel e de dourado.
- **Azul-Marinho Janela** (`--tinta-2`): fundo da janela do avião enquanto o vídeo carrega.

### Neutral
- **Azul-Meia-Noite** (`--noite`): fundo da página, barra, capa, provas, dúvidas, contato e rodapé; texto sobre dourado e sobre papel na conversa; o vinco das plaquetas.
- **Papel** (`--papel`): o papel dos documentos (com `--grao` por cima), o balão do cliente, o texto sobre fundos escuros.
- **Papel Sombreado** (`--papel-2`): campos do cartão de embarque, fileira de furos do canhoto, fundo atrás das fotos mascaradas.
- **Papel Claro** (`--papel-claro`): o miolo do selo do cartão-postal e, na janela do avião, a luz do céu (a soleira, a quina da parede, o reflexo no vidro, a alça da persiana).
- **Cabine** (`--cabine`, `--cabine-sombra`, `--cabine-clara`): só na janela do avião. A parede e a persiana são o Papel Sombreado puxado para a Tinta Desbotada (22%, 44% e 8%, em `color-mix` no oklab), para a cabine ficar na sombra perto do céu.
- **Tinta Desbotada** (`--tinta-suave`): texto secundário sobre papel (rótulos `dt`, fatos dos destinos, MRZ, cidade do cartão) e o tique ainda não "visto".
- **Papel Translúcido** (`--papel-suave`): texto de apoio sobre o campo azul-marinho e sobre a meia-noite do contato.

### Named Rules
**The Duas Vozes Rule.** Dourado é sempre a Amazon Visto falando; papel é sempre o cliente. Um balão dourado nunca é a pergunta do visitante, e um balão de papel nunca é a resposta da empresa.

**The Vermelho Age Rule.** Vermelho chapado é ação (levar ao WhatsApp) ou listra do correio aéreo. Não vira fundo de seção nem texto de destaque.

**The Campo Inteiro Rule.** Cada seção é um campo de uma cor só (`--noite`, `--tinta` ou `--papel` com `--grao`). Sem gradiente; a única textura do sistema é o ruído do papel.

## Typography

**Display Font:** Chillax (com Segoe UI, system-ui, sans-serif), pesos 400/500/600, `fonts/chillax-*.woff2`, `font-display: swap`
**Body Font:** Chillax, a mesma família
**Label/Mono Font:** `--fonte-mrz` (OCR-B, com ui-monospace, Cascadia Mono, Consolas, Courier New), só na zona de leitura dos documentos

**Character:** Uma geométrica de cantos macios, firme no 600 dos títulos e calma no 400 do texto, com tracking apertado nos tamanhos grandes. A letra de máquina aparece só onde um documento real a teria.

### Hierarchy
Seis passos em `clamp()`. Em 1440px: 15 / 19 / 26 / 36 / 64 / 76px. Em 390px: 14 / 17 / 19,5 / 20 / 31,7 / 38px.
- **Capa** (600, `--t-capa`, 1): o h1 da página do passaporte.
- **Título** (600, `--t-titulo`, 1.04, -0.03em): h2 de seção, h3 das fichas até 1024px, código do cartão de embarque, título do postal, links do menu até 1024px.
- **Fala** (500, `--t-fala`, 1.18, -0.02em): frase, não título. Falas das provas, a primeira fala da janela, h2 do cartão de visita no desktop, h3 da ficha a partir de 1024px (ao lado do painel).
- **Destaque** (500 a 600, `--t-destaque`): apoio da capa a partir de 640px, mensagem de abertura da conversa, nomes dos destinos no painel (600, 1.15, -0.02em), legenda da foto nas provas, perguntas a partir de 768px, marca da barra, h2 do cartão de embarque e do cartão de visita no celular.
- **Texto** (400, `--t-texto`, 1.5): corpo, botões, campos, h4 das fichas (600). Larguras de leitura entre 30ch e 40ch.
- **Pequeno** (400 a 500, `--t-pequeno`): rótulos `dt`, o que é cada destino no painel, códigos e horas do painel até 1024px, horas das mensagens, respostas rápidas, pé do rodapé.
- **MRZ** (`--fonte-mrz`, 17px no SVG): linhas de `<` esticadas com `textLength`, então o tamanho real segue a largura do SVG.

### Named Rules
**The Seis Passos Rule.** Todo tamanho de texto sai de um dos seis tokens `--t-*`. Um tamanho novo é sinal de peça fora do sistema.

**The Fala Não É Título Rule.** O que a Amazon Visto diz em destaque fica em `--t-fala` (até 36px), nunca em `--t-titulo`.

**The Letra de Máquina Rule.** `--fonte-mrz` só existe dentro de `.mrz`. Fora da zona de leitura, tudo é Chillax.

## Layout

**Grade e margens.** Mobile-first. Margem lateral `--margem` (20px a 72px); ritmo vertical entre seções `--entre` (64px a 112px); barra fixa de `--altura-barra` (72px), com `scroll-padding-top` de 72px + 16px. Pontos de quebra: 640px, 768px, 900px, 1024px. A partir de 1024px, provas e dúvidas usam 3/12 para o título e 9/12 para o conteúdo; serviços usa 5fr | 6fr (título e painel | ficha).

**Sequência de campos** (o fundo de cada seção, de cima para baixo):
1. **Capa** (`--noite`): moldura de 12px (`moldura-capa`) em volta das peças. A página do passaporte em papel, com a listra no topo; a foto do avião; a conversa dourada. A partir de 900px, duas colunas iguais em `100svh`, com a conversa sobre o pé da foto.
2. **Serviços** (`--papel` + `--grao`): o painel de partidas (um quadro azul-marinho, compacto) e a ficha aberta, direto no papel, sempre lado a lado, com o painel grudado no alto da tela (`position: sticky`) enquanto a ficha passa: trocar de serviço é um toque, sem voltar para cima (pedido do cliente). A partir de 1280px, duas colunas (5fr | 6fr): título e painel à esquerda, a ficha à direita ocupando as duas linhas (`grid-template-rows: auto 1fr`). Até 1279px, o título em cima e, embaixo, a coluna estreita de plaquetas (`--trilho`, de 92px a 150px) ao lado da ficha. A ficha se arruma pela largura que tem (contêiner `fichas`): a partir de 460px, a foto ao lado do nome e as listas em duas colunas.
3. **Provas** (`--noite`, guilhoche dourado): as falas douradas em fio, uma embaixo da outra.
4. **Sobre** (`--tinta`): campo azul-marinho; a foto da sala na máscara de 38%, cortada pela borda de baixo da seção.
5. **Dúvidas** (`--noite`): perguntas à direita, respostas à esquerda, como numa conversa.
6. **Visite** (foto de Manaus vista do alto): o cartão de visita em papel e o mapa do Google com o endereço, numa moldura de papel de 6px. A partir de 900px a foto cobre a seção inteira (`82svh`), com o cartão à esquerda (27rem) e o mapa à direita (até 40rem, na altura do cartão, mínimo 420px); no celular, o mapa vem embaixo do cartão, com 300px de altura.
7. **A janela** (`--cabine`, a parede da cabine): a cena das nuvens. A cena gruda na tela e a rolagem leva a câmera até uma janela de avião de verdade, até o céu tomar a tela; no fim, as duas falas da Amazon Visto chegam sobre ele.
8. **Contato** (`--noite`, guilhoche dourado): o cartão de embarque sozinho, no centro (até 880px).
9. **Rodapé** (`--noite`): a listra fina do correio aéreo e, abaixo, o verso do cartão-postal com a borda de cima recortada.

**Decisões de tamanho no celular (390px).**
- Botão principal com altura mínima de 58px; botão pequeno 46px; respostas rápidas e botão do menu 44px; perguntas 56px; campos 50px; botão flutuante 56px, afastado do `safe-area-inset`.
- A capa abre com o avião: a foto vem primeiro (`order: -1`, `46svh`, entre 280px e 480px, foco em 54% 40%), a página do passaporte sobe 56px sobre o pé dela (recuada 10px de cada lado) e a conversa vem depois, inteira.
- Até 1024px os cinco links ficam no menu: um painel que desce da barra e cobre a tela inteira abaixo dela, com os links em `--t-titulo`; aberto, o botão diz "Fechar" (`data-texto-fechar`).
- Até 1279px o painel é a coluna estreita ao lado da ficha: cada plaqueta tem o código em cima e o nome embaixo (13px a 14px, quebra só entre palavras; "Intercâmbio", o mais longo, cabe inteiro a 92px), sem a hora local, o que é cada destino e o pé "Partidas de Manaus", que voltam no painel inteiro a partir de 1280px (códigos e horas em `--t-texto`). O dourado marca a escolha; o tique duplo só aparece no painel inteiro.
- Listra do envelope com 24px de altura (40px a partir de 640px); listra fina com 8px (10px).
- Carimbo da capa com 76px (até 128px no desktop); carimbo da ficha com 76px (até 116px).
- A foto da ficha é uma faixa 16:9 no celular; a partir de 640px fica quadrada, ao lado do nome do serviço e dos dados (0.7fr | 1.3fr).
- No cartão-postal, o selo fica no canto de cima, como num postal de verdade; até 900px o título reserva o lugar dele (124px de altura e 110px à direita).
- No cartão de embarque, nome e cidade lado a lado e os dois seletores na largura inteira; o canhoto fica embaixo, separado por furos na horizontal, e mostra a MRZ. A partir de 640px o canhoto vai para a direita (190px), os furos ficam na vertical e a MRZ some (44 caracteres num canhoto estreito viram pó).
- O vidro da janela do avião tem `min(62vw, 32svh)` de largura (no desktop, `min(22vw, 36svh)`), na proporção 250 × 350; no desktop as vizinhas aparecem cortadas nas bordas. Perto, é a tela inteira nas duas larguras.
- O cartão de visita sobe 56px sobre o pé da foto de Manaus (`34svh`, mínimo 220px).

## Elevation & Depth

Liso e minimalista (pedido do cliente, outubro de 2026: depois de uma luz realista, com brilhos e relevo, que ficou "ultrarrealista" demais). As superfícies são de cor chapada: sem brilho, sem degradê, sem relevo, sem quina de luz. A profundidade vem da sobreposição de peças (a conversa sobre o pé da foto, o cartão de visita e o mapa sobre Manaus, a janela na parede da cabine, o carimbo sobre a zona de leitura, o cartão de embarque levemente girado, 0.6deg; 1.2deg a partir de 1024px) e de uma sombra só, macia e difusa, que tira o papel e o balão do fundo sem desenhar volume. A luz fica no fundo escuro, lisa. O papel tem textura (`--grao`) e marca d'água (o guilhoche `--roseta`, entre 5% e 10% de opacidade). Os tokens (`--sombra-*`, `--luz-noite`, `--poca`) ficam no `:root` e a aplicação na seção 15c do CSS.

### Shadow Vocabulary
Uma sombra macia que cai para baixo, na cor da noite (`--sombra: 0 1 10`), nunca preto, em duas camadas: um contato de 2px e uma difusa.
- **Pousada** (`--sombra-pousada`: a difusa de 40px, descendo 16px, a 42%): os papéis (página do passaporte, cartão de visita, mapa, cartão de embarque, cartão-postal), as fotos impressas (capa, ficha, sala), o painel do aeroporto e o balão grande da capa. A capa corta o que passa da borda dela (`overflow: clip`), para a sombra não escorrer para os serviços.
- **Acima** (`--sombra-acima`: a difusa de 24px, descendo 10px): os balões (falas, respostas, perguntas, mensagens), as respostas rápidas e o selo do postal.
- **Botão** (`--sombra-botao`: só a difusa de 18px): o botão de ação, liso; apertado (`:active`), a sombra some.
- **Flutuante** (`0 12px 28px -10px`): o botão fixo de WhatsApp; e a barra do topo, com uma sombra longa e leve embaixo.

### A luz
- `--luz-noite`: no alto das seções escuras (capa, provas, sobre, dúvidas, contato, rodapé), um brilho azul suave, liso.
- `--poca`: o mesmo brilho, atrás do papel de cada seção escura (a página do passaporte, as falas, as perguntas, o cartão de embarque, o postal). Cada seção diz onde o papel está (`--poca-x`, `--poca-y`) e o tamanho do brilho (`--poca-l`, `--poca-a`).
- A janela do avião tem a luz própria dela, a do céu (túnel, vedação, persiana), desenhada no SVG.

### Named Rules
**The Liso Rule.** Superfície lisa, de cor chapada: nada de brilho, degradê, relevo ou quina de luz em botão, balão, papel ou plaqueta. A profundidade é uma sombra só, macia, que cai para baixo na cor da noite; a luz é um brilho suave no fundo escuro. Sem sombra colorida e sem brilho em volta da peça (glow). Exceções às regras da casa (sombra só no que flutua; degradê só no brilho do fundo) registradas aqui e no `taste-skill-ignore` de cada linha.

## Shapes

Duas linguagens de canto, uma por família.

- **Documento** (`--canto-papel`, 4px): quase reto, como papel cortado. Página do passaporte, foto do avião, cartão de visita, cartão de embarque, plaquetas do painel.
- **Balão** (cantos redondos e um canto agudo de `--rabinho`, 6px). A posição do rabinho diz quem fala: **em cima à esquerda** é a Amazon Visto chegando (conversa, falas, respostas das dúvidas, foto dentro da fala); **em cima à direita** é o cliente (mensagem do cliente, perguntas, respostas rápidas, compositor, campos do cartão de embarque); **embaixo à esquerda** é o botão (`.botao`, `.flutuante`). Raios: `--raio-p` (20px) em mensagens, campos e perguntas; `--raio` (26px) em botões, falas e no balão da conversa.
- **Máscara de foto** (`--rabinho 38% 38% 38%`): a foto como um balão grande, na ficha de serviço e na foto da sala.
- **Janela de avião** (o vidro de 250 × 350 com raio de 110; a abertura na parede de 342 × 448 com raio de 156): o desenho da cena da janela, no SVG.
- **Círculo** (50%): logo na barra e no topo da conversa; o botão flutuante é um círculo com o canto do rabinho.
- **Bordas que um papel tem:** a listra do envelope (`.listra`), o picote do postal (`.verso__recorte`), os furos do canhoto (`4px dotted` em `--papel-2`), a borda serrilhada do selo (`5px dotted` em `--papel`).

### Named Rules
**The Quem Fala Rule.** O canto agudo aponta para quem fala. Um balão sem rabinho, ou com o rabinho do lado errado, está fora do sistema.

## Components

### Buttons
O botão é um balão: a ação que manda a mensagem.
- **Shape:** `--raio` com o rabinho embaixo à esquerda.
- **Primary (`.botao--acao`):** vermelho com texto papel, 600, `--t-texto`, 58px de altura mínima. Quando envia, leva o tique duplo depois do texto.
- **Pequeno (`.botao--pequeno`):** 46px, `--t-pequeno`.
- **Hover / Focus:** hover só com mouse (`hover: hover` e `pointer: fine`), para `--vermelho-escuro`; pressão `scale(0.97)` em `--t-press` (140ms) com `--ease-out`. Foco: contorno de 3px em `--ouro`, afastado 3px (em `--tinta` dentro de papel e de dourado).

### Respostas rápidas (chips)
- **Style:** balão do cliente em `--noite` sobre o dourado da conversa, `--t-pequeno` 500, 44px.
- **State:** `aria-pressed="true"` vira papel com texto meia-noite; hover em `--tinta`; pressão `scale(0.96)`.

### Cards / Containers
- **Documento** (`.capa__cartao`, `.servicos`, `.cartao-visita`, `.embarque`, `.verso`): papel com `--grao`, texto `--tinta`, `--canto-papel`, com `isolation: isolate` para o guilhoche por trás (`::before`/`::after`, máscara `--roseta`, na cor do texto, opacidade de 0.05 a 0.1).
- **Shadow Strategy:** nenhuma (ver Elevation & Depth).
- **Border:** nenhuma; o contorno é a mudança de campo.

### Inputs / Fields
- **Style:** balões do cliente em `--papel-2`, sem borda, `--raio-p` com o rabinho em cima à direita, 50px, `--t-texto` 500; o rótulo do cartão fica em cima, em `--t-pequeno` e `--tinta-suave`. O `select` leva a seta em SVG embutido.
- **Compositor** (`.compositor textarea`): o mesmo balão, em `--papel`, sem redimensionar.
- **Focus:** o contorno de foco global, em `--tinta`.

### Navigation
- **Barra** (`.barra`): fixa, `--noite`, 72px; marca com o escudo em círculo e o nome em `--t-destaque`.
- **Desktop (a partir de 1024px):** links em linha, `--t-texto` 500, sublinhado de 2px que aparece em `--ouro` no hover (só com mouse).
- **Celular e tablet:** o botão "Menu" abre um painel que desce da barra e cobre a tela abaixo dela (entra em 0.5s com `--ease-gaveta`, sai em 0.3s com `--ease-out`); fechado, fica inteiro acima da tela e com `visibility: hidden`. Aberto, o botão diz "Fechar". Fecha com Esc ou ao tocar num link; rótulos em `data-rotulo-abrir`, `data-rotulo-fechar` e `data-texto-fechar`.

### A conversa da capa (signature)
O balão dourado (`.conversa`) com o rabinho em cima à esquerda: no desktop, no pé da foto do avião; no celular, logo abaixo da página do passaporte.
- **Topo:** logo e a linha de presença (`#presenca`), calculada na hora de Manaus (`America/Manaus`): "online agora" de segunda a sexta, das 9h às 18h; fora disso, "visto por último {dia} às 18:00", com `{dia}` = hoje (depois das 18h num dia útil), sexta (domingo, ou segunda antes das 9h) ou ontem. Recalcula na virada de cada minuto e quando a aba volta a ficar visível. Os textos vêm dos `data-*` do HTML.
- **Mensagens:** a Amazon Visto fala direto no dourado (`.msg--deles`, sem balão próprio; a abertura em `--t-destaque` 600); o cliente fala num balão de papel (`.msg--minha`). Cada mensagem leva a hora de Manaus.
- **Roteiro (`ativarConversa` no main.js):** tocar numa resposta rápida limpa a conversa até a saudação, publica a mensagem do cliente com o tique duplo cinza e carrega a mensagem pronta (`data-mensagem`) no compositor. Aos **450ms** o tique fica "visto" (`.e-vista`, `--tinta`) e aparecem os três pontos de "digitando"; **1100ms** depois chega a resposta (`data-resposta`). Uma escolha nova cancela a anterior (contador de rodada).
- **Compositor:** com JS, só aparece quando a resposta chega (`.conversa.e-respondida`); antes disso, o caminho direto é o botão da página do passaporte. Sem JS, o formulário aparece e envia sozinho (`action` do wa.me). Enviar abre `wa.me/{data-whatsapp}?text=…`.

### O painel de partidas (signature)
Um quadro azul-marinho (`.painel`, `--tinta`, `--canto-papel`), como o do aeroporto. Cada serviço é uma linha curta (`.destino`), em faixas alternadas (`--tinta` e `--tinta-2`): código em plaquetas | nome em `--t-destaque` 600, com o que é embaixo em `--t-pequeno` e `--papel-suave` | hora local de lá. As plaquetas do painel são `--noite` com o vinco em `--tinta`. O destino escolhido acende em `--ouro` com texto `--noite`; a pressão escurece a linha para `--noite`. O pé (`.painel__origem`, em `--noite`) usa a mesma grade das linhas.
- **Hora local (`ativarPainel`):** cada linha com `data-fuso` (Nova York, Toronto, Xangai, Lima, São Paulo) mostra a hora de lá; o pé (`.painel__origem`, "Partidas de Manaus") mostra a data por extenso no idioma da página e a hora de Manaus. Atualiza na virada do minuto. Sem JS, as horas não aparecem.
- **Plaquetas (`.placas`):** uma letra por plaqueta em `--tinta`, com o vinco de 2px em `--noite` a 55%; os dois-pontos não são plaqueta. Quando o texto muda, cada plaqueta que mudou vira (`virarPlaqueta`, 0.34s, `rotateX` com `perspective: 240px`), 90ms depois da anterior, com a letra trocada aos 170ms.
- **Código que gira:** no intercâmbio, o código percorre `data-codigos` (JFK, YYZ, PEK, LIM) a cada 2,8s, só enquanto o painel está na tela.
- **Abrir a ficha (`ativarServicos`):** cada linha é um link para a ficha (`#visto-americano`); com JS só a ficha escolhida aparece, a linha aberta acende (`aria-current`), a ficha troca com `trocarFicha` (0.32s) e o carimbo bate de novo. A página nunca desce: até 1279px, onde a coluna de plaquetas começa na altura da ficha, ela só sobe quando o começo da ficha ficou para cima da tela (quem lia o fim de uma ficha longa vê a nova do começo, e a coluna fica onde estava); a partir de 1280px fica parada. O endereço com `#` abre a ficha certa.

### A página de visto (ficha)
- Duas partes: a cabeça (`.ficha__cabeca`: nome, descrição e dados em `dl` de duas colunas), ao lado da foto na máscara de 38% com o carimbo no canto de baixo; e o resto (`.ficha__resto`, na largura inteira): o caminho em quatro etapas sem caixas, a lista com o tique duplo como marcador (`.vistos`), o botão de ação e a MRZ no pé.
- A primeira foto (visto americano) abre como obturador (`.obturador`) e o carimbo bate em seguida.

### O carimbo
SVG com dois anéis (traço 2.6 e 1.3), o texto na volta (`textPath`, 600, 8.6px, 0.06em) e o tique duplo no meio, em `--tinta` com o filtro `#tintaCarimbo` (tinta desgastada), girado entre -10deg e -14deg, com opacidade de 0.85 a 0.9. Aparece na capa, em cada ficha e no cartão-postal.

### A janela (signature)
A cena das nuvens (`.janela`): o vídeo da asa sobre as nuvens visto por uma janela de avião de verdade, na parede da cabine (`--cabine`). Com movimento, a seção tem `100lvh + 130svh` e o palco (`100lvh`, mínimo 560px) gruda no topo; sem movimento, o palco tem `100svh`, não gruda e mostra só o céu e as falas.
- **O desenho (`.janela__aviao`, no index.html):** SVG numa mesma medida, com o vidro de 250 × 350 e o centro em 0,0, as vizinhas a 525 (2,1 vidros, como numa cabine); o que se repete entra com `<use>`. A parede tem três aberturas; em cada uma, o túnel da moldura (o alto na sombra, `--cabine-sombra`, a soleira clara, `--papel-claro`, e mais luz perto do vidro), a sombra da vedação no túnel, a vedação de borracha, a borda grossa do acrílico de fora vista através do vidro, o reflexo da cabine no vidro e o furinho de respiro. A persiana é um painel fosco (mais escuro no alto e nas laterais) com a alça embaixo: face de cima clara, frente na sombra, a quina de baixo pegando o céu e o encaixe do dedo. Na parede, a luz do céu (mais forte embaixo de cada janela) e a quina que dobra para dentro do túnel, clara embaixo. A janela do meio tem a persiana a 46%; a da esquerda, a 69%; a da direita, quase toda erguida.
- **Duas camadas, como uma câmera:** a de longe (`.janela__longe`: túnel, vedação, vidro, persianas) e a de perto (`.janela__perto`: parede e luz). Chegar perto é aumentar a escala das duas a partir do centro do vidro, a de perto mais (`--janela-fundo`, 1.22): o túnel se alarga enquanto a janela cresce e as vizinhas saem pelas bordas. A escala da de longe (`--janela-aberta`) é a menor que leva o vidro de cantos redondos para fora dos quatro cantos do palco, mais 4%; `ativarJanela` mede a cada tamanho de tela (no CSS ficam 3.6 e 5.4 de reserva).
- **Presa à rolagem:** enquanto o palco está grudado, a rolagem leva a câmera até a janela, e rolar de volta afasta. São `@keyframes` só de `transform` e `opacity`, ligadas à rolagem por `animation-timeline` (a `view-timeline` `--janela`, faixa `contain`, `view-timeline-inset: 0`), que o navegador roda na placa de vídeo, sem repintar nada a cada quadro. Onde não há `animation-timeline`, `ativarJanela` mede a rolagem uma vez por quadro e passa para as mesmas animações (`currentTime`). Tempos, em partes do caminho grudado: a persiana sobe de 0 a 20% e a luz na parede vai de 45% a 100% até 22%; a câmera chega de 10% a 70%; o reflexo e os detalhes do vidro somem de 26% a 50%; as falas de 64% a 76% e de 70% a 82%; o resto segura o céu. Curvas da easings.net, mais brandas que os tokens para não virar tranco sob o dedo: easeInOutQuad (`cubic-bezier(0.45, 0, 0.55, 1)`) na câmera e easeOutSine (`cubic-bezier(0.61, 1, 0.88, 1)`) no resto.
- **O vídeo:** duas versões da mesma gravação (Wikimedia Commons, CC BY-SA 4.0), por `<source media>`: 720p até 899px (1,8 MB) e 1080p no computador (5,3 MB); quem não lê o `media` fica com o 720p. O pôster é um quadro de 1920 × 1080. Só carrega e toca enquanto está na tela (`ativarVideos`).
- **A barra do navegador no celular:** o palco usa `lvh`, para não sobrar uma faixa de parede embaixo quando a barra some; as falas sobem `100lvh - 100svh`, o tanto que a barra pode cobrir.
- **Falas:** dois balões dourados da Amazon Visto no canto de baixo, à esquerda: "Sua próxima viagem começa com uma conversa." (`--t-fala`, até 18ch) e "A análise inicial é gratuita, pelo WhatsApp." (`--t-texto`).
- **Sem JS ou com menos movimento:** só o céu, com as falas. O botão flutuante some durante a cena.

### O cartão de embarque (signature)
O formulário de contato (`#embarque`) é um cartão de embarque em papel, no centro da seção (até 880px), girado 0.6deg (1.2deg a partir de 1024px).
- **Rota:** MAO, o avião vermelho e o destino em plaquetas. O destino segue o serviço escolhido (`data-destino="JFK:Para Nova York"`): as plaquetas viram e a cidade troca num fade de 0.25s (200ms de espera). Passaporte e intercâmbio não têm um destino só: a cidade vira "Para o mundo" (`data-varios`) e o código gira por `data-mundo` a cada 2,8s, enquanto estiver na tela.
- **Campos:** Passageiro, Cidade, Serviço, Situação; e os dados Portão WhatsApp, Embarque Agora, Análise Gratuita.
- **Enviar:** monta a mensagem a partir de `data-modelo` ("Olá! Meu nome é {nome}, sou de {cidade} e quero ajuda com: {servico} ({situacao}).") e abre o WhatsApp; sem cidade, o trecho da cidade sai da frase.
- **Canhoto:** trecho, classe, código de barras com o feixe vermelho que passa uma vez (`lerCodigo`, 1.6s, 1.1s depois de o cartão entrar) e a MRZ no celular.

### Provas e dúvidas como conversa
- **Provas:** falas douradas (`.fala`, `--t-fala`) em fio, uma delas com a foto do Teatro Amazonas dentro do balão; o número de seguidores conta de 0 até 55,7 mil em 1400ms (ease-out cúbico), uma vez.
- **Dúvidas:** a pergunta é o balão de papel do cliente, à direita, com o tique que fica "visto" quando aberta; a resposta é o balão dourado da Amazon Visto, à esquerda. Uma aberta por vez; a primeira começa aberta. Sem JS, todas aparecem.

### Botão flutuante
Balão vermelho de 56px (círculo com o rabinho embaixo à esquerda), com a única sombra do sistema. Escondido enquanto estão na tela a capa (que tem a conversa), o cartão de embarque (que tem o próprio enviar) e o rodapé, para não cobrir botões nem textos; entra em 0.24s com `--ease-out` e sai mais rápido, em 0.16s. Hover `scale(1.06)`, pressão `scale(0.94)` em 100ms.

### Movimento
Curvas: `--ease-out` (pressão, chegadas, trocas), `--ease-expo` (entradas ao rolar), `--ease-in-out` (obturador, feixe), `--ease-soft` (zoom da foto do obturador), `--ease-gaveta` (menu). Tempos: `--t-press` 140ms, `--t-hover` 180ms.

| Movimento | Onde | Valor |
|---|---|---|
| Chegada da capa | título, apoio, botão e selos da `.capa__cartao` | `capaChega` 0.6s `--ease-expo`, sobe 14px, 60ms entre um e outro; só CSS, no carregamento (o topo nunca espera o JS) |
| Entrada ao rolar | `.entrada` | sobe 24px; opacidade 0.8s, transform 0.9s, `--ease-expo`; cascata de 75ms por seção (máx. 0.45s) |
| Mensagem que chega | `.msg.chegando`, compositor, resposta das dúvidas | `chegar` 0.42s (0.36s no compositor e nas dúvidas), cresce do canto do rabinho |
| Digitando | `.msg--digitando` | três pontos, 1s em loop, 0.15s de defasagem |
| Plaqueta que vira | `.placas .virando` | `virarPlaqueta` 0.34s, 90ms entre plaquetas |
| Troca de ficha | `.ficha.trocando` | `trocarFicha` 0.32s + `carimbarTroca` 0.32s aos 0.14s |
| Obturador | `.obturador` | `clip-path` 1.1s `--ease-in-out`; foto de 1.12 a 1 em 1.5s `--ease-soft`; `carimbar` 0.42s aos 0.9s |
| Feixe do leitor | `.embarque__laser` | `lerCodigo` 1.6s aos 1.1s, uma vez |
| Roseta da capa | `.capa__cartao::before` | gira 360deg em 240s, em loop |
| Fotos que carregam | `img[loading="lazy"]` | fade de 0.5s |
| Vídeo da janela | `video[muted]` | toca só enquanto está na tela |

**Com "reduzir movimento":** nada fica escondido à espera de animação (entradas, obturador e carimbo só se escondem dentro de `prefers-reduced-motion: no-preference` e com `.js`). O JS escreve as plaquetas sem virar, não gira códigos, publica a resposta da conversa na hora (sem "digitando"), troca a cidade sem fade, não conta o número, não toca o vídeo (fica o pôster) e não liga o fade das fotos. O CSS zera as durações (0.001ms) e a rolagem suave.

### Bilíngue
`es.html` é gerado do `index.html` por `node scripts/gerar-es.mjs`: troca o `lang`, o link de idioma (`.barra__idioma` e o link do rodapé), todos os textos por pares [português, espanhol] (incluindo os `data-*` da presença, `data-modelo`, `data-varios` e `data-mensagem`) e manda todo WhatsApp para o número do Peru (+51 939 125 188). O script avisa as traduções que não acharam texto e as sobras em português. Texto novo no `index.html` precisa do par no script; o `es.html` nunca se edita à mão. A data do painel e o contador usam o `lang` da página.

### Pendências (TROCAR)
Marcadas com comentários `TROCAR` ou `TROCAR/REVISAR` no `index.html`, e com `hidden` enquanto não houver dado: URL real em `og:url`; horário real de atendimento (presença da conversa, cartão de visita, rodapé); respostas do roteiro da conversa; o que a empresa faz em cada etapa do caminho; itens específicos de cada serviço (`<li hidden>`); preço "a partir de" (`.ficha__preco[hidden]`); política da taxa consular e as respostas das dúvidas; CNPJ (`.verso__cnpj`) e link do Reclame Aqui (`.verso__reclame`). Ao preencher, tira-se o `hidden` e o par em espanhol entra no `gerar-es.mjs`.

## Do's and Don'ts

### Do:
- **Do** decidir primeiro a família da peça nova: documento é papel com `--grao`, `--canto-papel` e texto `--tinta`; conversa é balão com `--rabinho`.
- **Do** pôr o rabinho do lado de quem fala: em cima à esquerda para a Amazon Visto (dourado), em cima à direita para o cliente (papel), embaixo à esquerda para botões.
- **Do** usar o tique duplo `#visto` para todo "visto", "lido", "aberto" ou "enviado".
- **Do** dar aos documentos o que um documento real tem: listra do correio aéreo, MRZ, carimbo, guilhoche entre 5% e 10% de opacidade.
- **Do** ligar as peças vivas a dado real (hora de Manaus, hora local, serviço escolhido) e dar a cada uma uma versão parada para "reduzir movimento".
- **Do** manter hover só com mouse (`hover: hover` e `pointer: fine`) e pressão em escala em todo elemento que se toca.
- **Do** rodar `node scripts/gerar-es.mjs` depois de qualquer mudança no `index.html`.

### Don't:
- **Don't** usar gradiente, sombra em peça parada ou fio fino; a única sombra é a do `.flutuante`.
- **Don't** pôr a resposta da Amazon Visto em papel nem a pergunta do cliente em dourado.
- **Don't** usar vermelho fora de ação e da listra do envelope.
- **Don't** criar um tamanho de texto fora dos seis `--t-*`, nem usar `--fonte-mrz` fora da zona de leitura.
- **Don't** arredondar documento com raio de balão, nem dar canto de papel a um balão.
- **Don't** esconder conteúdo sem JS: só se esconde para entrar quando há `.js` e `no-preference`.
- **Don't** inventar depoimento, taxa de aprovação ou preço; o que falta fica em `TROCAR`, com `hidden`.
