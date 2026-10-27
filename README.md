# Template de Site Institucional Estático

Template completo e reutilizável de site institucional (uma página só, com
rolagem por seções) para pequenos negócios locais — mercados, lojas,
prestadores de serviço, salões, etc. Feito para você reaproveitar em vários
clientes: copia a pasta, troca cores/textos/fotos, e sobe pra hospedagem
gratuita.

**Stack:** HTML + CSS + JavaScript puro. Sem build, sem framework, sem
dependência nenhuma pra instalar. 100% estático — funciona em qualquer
hospedagem, inclusive as gratuitas (Netlify, Vercel, GitHub Pages).

---

## Por que uma página só (com âncoras), em vez de várias páginas?

Decisão de propósito, para esse porte de site: uma `index.html` só, com
seções (`#inicio`, `#sobre`, `#servicos`, `#depoimentos`, `#contato`) navegadas
por âncoras, em vez de `sobre.html`, `contato.html` separados. Motivos:

- **Menos arquivos pra manter por cliente.** Cada site novo = 1 HTML, não 5.
  Menos chance de esquecer de atualizar o rodapé/menu em uma página e não nas
  outras.
- **Menos chance de erro ao customizar.** Meta tags de SEO, favicon, fontes —
  tudo isso fica num lugar só, não duplicado em 5 arquivos.
- **É o padrão do mercado pra esse tipo de site.** Mercado, salão, prestador de
  serviço local — o visitante quer rolar e ver tudo rápido, não navegar entre
  páginas. Isso também ajuda a conversão (o botão de WhatsApp está sempre a
  "um scroll" de distância).
- Se algum cliente específico precisar mesmo de páginas separadas (ex: um
  blog, uma página de política de privacidade), dá pra adicionar `outra.html`
  ao lado do `index.html` sem quebrar nada — a estrutura não impede isso.

---

## Estrutura de pastas

```
site-institucional-estatico/
├── index.html          → todo o conteúdo do site (seções comentadas)
├── es.html             → versão em espanhol, GERADA do index.html (ver seção 4b)
├── PRODUCT.md          → o que é verdade sobre a empresa (público, provas, limites)
├── DESIGN.md           → o sistema visual do site (cores, letra, o balão, regras)
├── css/
│   └── style.css        → TODO o visual: cores, fontes, layout, animações
├── js/
│   └── main.js           → menu, entradas, conversa da capa, painel de partidas,
│                            fichas, dúvidas, cartão de embarque
├── fonts/
│   └── chillax-400/500/600.woff2 → a fonte do site, servida do próprio site
├── images/
│   ├── logo.webp           → logomarca (barra, conversa)
│   ├── favicon.png          → ícone da aba do navegador
│   ├── banner.webp          → o avião na pista (capa)
│   ├── sobre.webp           → foto da sala (seção "Quem somos")
│   ├── guilhoche-roseta.svg → a impressão de segurança dos documentos (gerada)
│   ├── produto-1.webp a produto-6.webp → fotos dos seis serviços
│   ├── produto-7.webp a produto-12.webp → reservas para serviços novos
│   └── og-image.jpg         → imagem que aparece ao compartilhar o link
├── assets/              → fotos e vídeo de coleções abertas, com crédito
├── scripts/
│   ├── gerar-es.mjs       → gera o es.html (traduções na lista TEXTOS)
│   └── gerar-guilhoche.mjs → desenha os guilhoches (images/guilhoche-*.svg)
└── README.md            → este arquivo
```

Todas as imagens em `images/` já vêm com um **placeholder gerado
proceduralmente** (gradiente na cor da marca + ícone ou iniciais) em vez de
ficarem quebradas — dá pra ver o site pronto mesmo antes de colocar fotos
reais, e cada uma já indica no próprio nome do arquivo (`produto-1.jpg` etc.)
exatamente o que ela é.

---

## 1. Como abrir e testar localmente

Não precisa instalar nada. Duas opções:

### Opção A — abrir direto (mais simples)

Dê duplo clique no arquivo `index.html`. Ele abre no seu navegador padrão e
funciona 100% (é só HTML/CSS/JS, sem chamadas de servidor).

### Opção B — servidor local (recomendado antes de entregar pro cliente)

Alguns detalhes (como o `loading="lazy"` das imagens) se comportam de forma
mais parecida com produção quando servidos por `http://` em vez de
`file://`. Se você tem Python instalado (é comum no Windows moderno):

```powershell
cd caminho\para\site-institucional-estatico
python -m http.server 8000
```

Depois acesse `http://localhost:8000` no navegador. `Ctrl+C` no terminal pra
parar.

Se preferir, e usa VS Code, a extensão **Live Server** faz a mesma coisa com
um clique direito em `index.html` → "Open with Live Server".

---

## 2. Passo a passo: customizar para um cliente novo

Ordem recomendada, do mais rápido pro mais detalhado:

### 2.1. Copie a pasta inteira

```powershell
Copy-Item -Recurse "site-institucional-estatico" "site-cliente-fulano"
```

Sempre trabalhe numa cópia por cliente — nunca edite o template original.

### 2.2. Cores (1 arquivo só: `css/style.css`)

Abra `css/style.css`, vá até o bloco `:root` bem no topo do arquivo:

```css
:root {
  --noite: #070b2e;    /* fundo: a noite da viagem */
  --tinta: #0f1862;    /* azul-marinho: campo de seção, texto e carimbo no papel */
  --papel: #f3f4f1;    /* papel: os documentos e a voz do cliente */
  --ouro: #c9a45c;     /* dourado: a voz da Amazon Visto (os balões) */
  --vermelho: #b3121f; /* vermelho: as ações e a listra do correio aéreo */
  ...
}
```

Troque só esses valores e o resto do site se ajusta, porque tudo referencia
essas variáveis. As regras de uso de cada cor estão no `DESIGN.md`.

### 2.3. Fontes

A fonte (Chillax, da Indian Type Foundry, via Fontshare, de uso livre) é
servida do próprio site, em `fonts/`. Para trocar:

1. Coloque os arquivos `.woff2` da fonte nova em `fonts/` e ajuste os
   `@font-face` no começo do `css/style.css`.
2. Troque o nome na variável `--fonte` do `:root` e os dois
   `<link rel="preload">` do `<head>` do `index.html`.

### 2.4. Textos

Abra `index.html` e procure por `TROCAR` (Ctrl+F) — todo texto de exemplo que
precisa virar conteúdo real do cliente está marcado com um comentário
`<!-- TROCAR: ... -->` explicando o que colocar ali. Principais pontos:

- Nome da empresa (aparece várias vezes: cabeçalho, hero, rodapé, meta tags)
- O título da capa (`h1`) e as falas da conversa (`.conversa__roteiro`)
- Textos da seção "Quem somos"
- Nome, ficha e "O que está incluso" de cada serviço (seção "Serviços")
- Endereço, WhatsApp e horário (rodapé e presença da conversa)
- Meta tags de SEO e Open Graph, no `<head>` (ver seção 2.7 abaixo)

### 2.5. Imagens

Cada foto tem um arquivo **mestre** (a tabela abaixo e as fotos de
`assets/`) e versões menores em WebP ao lado dele (`banner-640.webp`,
`banner-960.webp`…), que são as que a página usa: no `srcset` de cada
`<img>`, o navegador escolhe a menor que basta para o tamanho da foto na
tela, então o celular não baixa a foto de 1920px. Para trocar uma foto,
troque o mestre **mantendo o mesmo nome** e gere as versões de novo:

```bash
pip install pillow
python scripts/gerar-imagens.py
```

As larguras de cada foto ficam no próprio script (foto nova = uma linha
nele e o `srcset` no HTML). A foto da capa, que é a primeira coisa grande
da página, ganha também versões AVIF (um terço menores), servidas por um
`<picture>` e pré-carregadas no `<head>`; ao mudar as larguras dela, mude
o `srcset` e o `sizes` nos dois lugares, que precisam ser iguais.

| Arquivo (mestre) | Onde aparece | Tamanho recomendado |
|---|---|---|
| `logo.webp` | Barra, conversa da capa (a página usa o `logo-128.webp`) | Quadrado, 320×320px |
| `favicon.png` | Aba do navegador | Quadrado, 64×64px |
| `banner.webp` | Capa, ao lado da página do passaporte | 1920×1281px (paisagem) |
| `sobre.webp` | Seção "Quem somos" (recortada no balão) | 900×1100px (retrato) |
| `produto-2.webp` … `produto-6.webp` | Fichas dos serviços (páginas de visto) | 800×800px (quadrado) |
| `og-image.jpg` | Preview ao compartilhar o link (WhatsApp etc.) | 1200×630px |

**A conversa da capa.** O balão dourado é uma conversa de verdade. Cada
botão de resposta (`<button class="resposta" data-servico="...">`) tem, no
bloco escondido `.conversa__roteiro`, um parágrafo com o mesmo nome em
`data-resposta`: o texto dele é o que a Amazon Visto "responde", e o
`data-mensagem` é a mensagem que fica pronta para o WhatsApp. A linha de
presença ("online agora" ou "visto por último … às 18:00") usa a hora de
Manaus e o horário de atendimento escrito no `main.js` (função
`ativarConversa`); ao mudar o horário, mude lá e no texto do rodapé.

**Serviços ("Para onde você vai?").** Os destinos são o painel de partidas
do aeroporto. Cada serviço tem duas peças ligadas pelo mesmo nome (ex.:
`visto-americano`): a linha do painel (`<a class="destino"
href="#visto-americano" data-servico="visto-americano"
data-fuso="America/New_York">`, com o código em plaquetas e a hora local do
fuso em `data-fuso`) e a ficha, uma página de visto (`<article
class="ficha" id="visto-americano">`), com país, modalidade, atendimento,
pagamento, "O que está incluso", o preço (com `hidden` até ter o valor), o
botão de WhatsApp, o carimbo e a zona de leitura (MRZ) no pé. Para incluir
um serviço, copie uma linha e a ficha dela e troque o nome, o código, o
fuso, a foto (`produto-7.webp` em diante já existem como reserva), o texto
do carimbo e os textos; lembre de criar também o botão de resposta e a fala
dele na conversa da capa, e a opção no cartão de embarque.

**Os documentos da viagem.** A capa (página do passaporte), as fichas
(páginas de visto), o cartão de visita, o cartão de embarque e o
cartão-postal do rodapé são "papel": granulado e guilhoche de segurança
atrás do conteúdo. Os guilhoches são desenhados por
`node scripts/gerar-guilhoche.mjs images`. O carimbo é um SVG com o texto
na volta do anel (troque o texto dentro do `<textPath>`). No cartão de
embarque, cada opção de serviço diz o destino em `data-destino`
(`"JFK:Para Nova York"`); passaporte e intercâmbio não têm, então o código
gira pelos destinos de `data-mundo`.

As fotos e o vídeo de `assets/` (Teatro Amazonas, Ponte Rio Negro,
passaporte e cartão de embarque, nuvens pela janela do avião) vêm de
coleções abertas, com fonte e licença em `assets/credits.json` e o crédito
no rodapé. O carimbo de passaporte de Belize ficou de reserva; se voltar a
usar, credite no rodapé.

### 2.6. Links de WhatsApp, redes sociais e mapa

- **WhatsApp**: procure por `wa.me/5511999999999` no `index.html` (aparece
  várias vezes: botão do cabeçalho, hero, contato, botão flutuante) e troque
  pelo número real, **só dígitos**, no formato `55` + DDD + número. Ex: para
  `(11) 98888-7777`, fica `5511988887777`. Recomendo usar Buscar-e-substituir
  do seu editor pra trocar todas as ocorrências de uma vez.
- **Redes sociais**: no rodapé, troque `href="https://instagram.com/"` e
  `href="https://facebook.com/"` pelos perfis reais. Se alguma rede não
  existir, apague a tag `<a>` inteira daquele ícone.
- **Mapa**: no "Visite a gente" aparece primeiro uma imagem do mapa
  (`images/mapa-centro.webp`, do OpenStreetMap, nas cores do site, com o
  pino no centro); o Google Maps interativo só carrega quando a pessoa toca
  em "Ver no mapa do Google", para a página não levar os scripts e os
  cookies do Google de graça. Para mudar o endereço:
  1. Troque o endereço nos links do Google Maps do `index.html` (o
     `q=` do botão do mapa, do seu `data-mapa` e do "Abrir no mapa"; espaços
     viram `%20`).
  2. Troque `LAT` e `LON` (o ponto do pino) em `scripts/gerar-mapa.py` e
     rode `python scripts/gerar-mapa.py`, que baixa os quadrados do
     OpenStreetMap e gera a imagem de novo.
  3. Troque o `geo` (as mesmas coordenadas) e o endereço nos dados para o
     Google (`application/ld+json`, no `<head>`).

  O crédito "© Colaboradores do OpenStreetMap" é obrigatório (licença ODbL)
  e já está na imagem e no rodapé.

### 2.7. SEO e Open Graph (aparência no Google e ao compartilhar o link)

No `<head>` do `index.html`:

```html
<title>Nome da Empresa | Frase curta descrevendo o negócio</title>
<meta name="description" content="1-2 frases sobre o negócio, pra quem, e o diferencial." />
...
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="https://www.dominio-real-do-cliente.com.br/images/og-image.jpg" />
<meta property="og:url" content="https://www.dominio-real-do-cliente.com.br/" />
```

O `og:image` e o `og:url` precisam ser endereços completos (o WhatsApp e o
Facebook não acham um caminho relativo). Logo abaixo ficam o `canonical` e
os `hreflang` (que ligam a versão em português à em espanhol) e, no fim do
`<head>`, os dados para o Google em JSON-LD (agência de viagem: endereço,
telefones, horário, coordenadas, Instagram e serviços), que ajudam a
empresa a aparecer na busca local e no mapa. Os mesmos dados que estão na
página; ao mudar telefone, horário ou endereço, mude lá também. Para trocar
o domínio, veja a seção 4d.

### 2.8. Favicon "de verdade" antes de entregar

O `favicon.png` incluso já funciona na maioria dos navegadores modernos, mas
para cobrir 100% dos casos (Apple touch icon, Android, etc.) antes de
entregar pro cliente, vale gerar o pacote completo:

1. Vá em [realfavicongenerator.net](https://realfavicongenerator.net)
2. Suba o `images/logo.png` (ou uma versão quadrada em alta resolução do
   logo)
3. Baixe o pacote gerado e substitua o `favicon.png`/adicione os arquivos
   extras que ele indicar, atualizando os `<link rel="icon" ...>` no
   `<head>` conforme a documentação que o gerador fornece.

---

## 3. Deploy gratuito

Qualquer uma das três opções abaixo é gratuita e gera um link `https://`
funcionando em minutos. Todas detectam automaticamente que é um site
estático (não precisam de nenhuma configuração de build).

### Opção A — Netlify (mais simples, arrastar e soltar)

1. Crie uma conta grátis em [app.netlify.com](https://app.netlify.com)
2. No painel, vá em **Sites** → arraste a pasta inteira do projeto
   (`site-cliente-fulano`) direto para a área indicada ("Drag and drop your
   site output folder here")
3. Em alguns segundos o Netlify gera uma URL tipo
   `nome-aleatorio.netlify.app` — já é o site no ar
4. (Opcional) Em **Site settings → Change site name**, troque por um nome
   mais legível, tipo `mercadofulano.netlify.app`

Alternativa via linha de comando (útil se for repetir isso muitas vezes):

```powershell
npm install -g netlify-cli
cd site-cliente-fulano
netlify deploy --prod
```

### Opção B — Vercel

1. Crie uma conta grátis em [vercel.com](https://vercel.com)
2. Instale a CLI: `npm install -g vercel`
3. Dentro da pasta do projeto:
   ```powershell
   cd site-cliente-fulano
   vercel --prod
   ```
4. Responda as perguntas (nome do projeto, etc. — pode aceitar os padrões) e
   a Vercel devolve a URL pública, tipo `site-cliente-fulano.vercel.app`

(Também dá pra arrastar a pasta pelo painel web da Vercel, igual ao Netlify,
sem precisar instalar nada — procure "Deploy" na página inicial do painel.)

### Opção C — GitHub Pages

Exige que o projeto esteja num repositório do GitHub:

```powershell
cd site-cliente-fulano
git init
git add .
git commit -m "Site do cliente Fulano"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/site-cliente-fulano.git
git push -u origin main
```

Depois, no GitHub: **Settings** → **Pages** → em "Source", selecione a
branch `main` e a pasta `/ (root)` → **Save**. Em 1-2 minutos o site fica
disponível em `https://seu-usuario.github.io/site-cliente-fulano/`.

> Netlify/Vercel são geralmente mais práticos para entregar pra cliente
> (deploy mais rápido, domínio próprio mais simples de configurar). GitHub
> Pages é uma boa opção se você já organiza os projetos como repositórios
> Git de qualquer forma.

---

## 4. Configurar um domínio próprio do cliente

Depois que o site já está publicado (seção 3) com uma URL tipo
`algumacoisa.netlify.app`, aponte o domínio real do cliente
(`www.mercadofulano.com.br`, por exemplo) para ele:

### 4.1. Comprar o domínio (se o cliente ainda não tiver)

- Domínio `.com.br`: [registro.br](https://registro.br)
- Domínio `.com` ou outros: [namecheap.com](https://namecheap.com),
  [godaddy.com](https://godaddy.com), ou o próprio Netlify/Vercel também
  vendem domínio direto no painel deles.

### 4.2. Apontar o domínio para o Netlify

1. No painel do Netlify, abra o site → **Domain settings** → **Add a domain**
2. Digite o domínio do cliente (ex: `mercadofulano.com.br`)
3. O Netlify mostra os registros de DNS que você precisa cadastrar no painel
   onde o domínio foi comprado — normalmente:
   - Um registro **A** apontando para o IP do Netlify (o próprio painel
     mostra o IP exato)
   - Ou, mais simples, trocar os **nameservers** do domínio para os do
     Netlify (o painel também mostra quais)
4. HTTPS (cadeado) é configurado automaticamente pelo Netlify depois que o
   DNS propaga (pode levar de alguns minutos até ~24h)

### 4.3. Apontar o domínio para a Vercel

Mesmo princípio: no painel do projeto → **Settings** → **Domains** → adicione
o domínio → a Vercel mostra o registro DNS (`A` ou `CNAME`, dependendo do
caso) pra você cadastrar no painel do registrador do domínio. HTTPS também é
automático.

### 4.4. Propagação de DNS

Depois de configurar os registros, pode levar de alguns minutos até 24-48h
para o domínio "propagar" globalmente (é assim que DNS funciona, não é nada
que você esteja fazendo errado se não funcionar na hora). Dá pra acompanhar
com ferramentas como [dnschecker.org](https://dnschecker.org).

---

## 4b. Versão em espanhol (`es.html`)

O `es.html` é **gerado** a partir do `index.html` — não edite ele à mão.
Sempre que mudar o `index.html`, rode na pasta do projeto:

```
node scripts/gerar-es.mjs
```

O script traduz os textos (lista `TEXTOS` dentro de `scripts/gerar-es.mjs`),
troca todos os botões de WhatsApp para o número do Peru com a mensagem em
espanhol e, no fim, avisa se alguma tradução não encontrou o texto ou se
sobrou algum trecho em português. Texto novo no `index.html` = adicionar o
par `[português, espanhol]` nessa lista.

## 4c. Publicar uma mudança no CSS ou no JS

O navegador guarda o `style.css` e o `main.js` para não baixar de novo a
cada visita (o GitHub Pages diz para guardar por 10 minutos). Por isso, o
endereço deles tem uma versão (`style.css?v=…`), e ela precisa mudar quando
o arquivo muda. **Antes de cada commit, rode:**

```bash
node scripts/publicar.mjs
```

Ele calcula a versão pelo conteúdo do CSS e do JS (muda sozinha quando o
arquivo muda, e só então) no `index.html` e no `404.html`, e gera o
`es.html`. Sem isso, quem já visitou o site continua vendo o visual antigo
com o HTML novo.

### Verificação automática no GitHub

A cada push, o GitHub roda `.github/workflows/verificar.yml`:

1. **Versões e espanhol em dia**: roda o `publicar.mjs` e falha se ele mudar
   algum arquivo (alguém esqueceu de rodar antes do commit).
2. **Lighthouse no celular** (`.github/lighthouserc.json`), no `index.html`
   e no `es.html`: desempenho, acessibilidade, boas práticas e SEO, com
   aviso quando uma nota cai (sem barrar o push). O relatório fica nos
   artefatos da execução, na aba **Actions** do repositório.

## 4d. Trocar o domínio

O site diz ao Google e às redes qual é o endereço dele: hoje,
`https://cardosodan.github.io/AmazonVisto/`. Ao passar para o domínio
próprio, faça um Buscar-e-substituir desse endereço pelo novo (com a barra
no fim) nestes arquivos, e rode o `gerar-es.mjs`:

- `index.html`: `canonical`, os três `hreflang`, `og:image`, `og:url` e os
  dados para o Google (`url`, `logo`, `image` no `application/ld+json`);
- `scripts/gerar-es.mjs`: o `og:url` e o `canonical` da versão em espanhol;
- `404.html`: o `<base>`;
- `robots.txt` e `sitemap.xml`.

No GitHub Pages de um repositório (`usuario.github.io/Repositorio/`), o
Google só lê o `robots.txt` da raiz do domínio, então o deste projeto só
passa a valer no domínio próprio; até lá, envie o `sitemap.xml` pelo
Google Search Console.

## 5. Checklist antes de entregar para o cliente

- [ ] Todos os `TROCAR` no `index.html` foram substituídos (busque por
      "TROCAR" com Ctrl+F pra garantir que não sobrou nenhum) — inclusive
      nas fichas (preço e itens de cada serviço, com `hidden` até lá), no
      horário (cartão de visita, rodapé e presença da conversa) e no
      CNPJ/Reclame Aqui do rodapé
- [ ] `es.html` gerado de novo depois da última mudança no `index.html`
      (`node scripts/gerar-es.mjs`)
- [ ] Cores (`:root` em `css/style.css`) refletem a marca do cliente
- [ ] Todas as imagens em `images/` foram trocadas por fotos reais (nenhum
      placeholder "IMAGEM DE DESTAQUE" sobrando)
- [ ] Número de WhatsApp correto nos 4 lugares (cabeçalho, hero, contato,
      botão flutuante) — teste clicando em cada um
- [ ] Redes sociais do rodapé apontam para os perfis certos (ou foram
      removidas, se não existirem)
- [ ] Endereço, telefone, e-mail e horário reais na seção de Contato
- [ ] Os links "Abrir no mapa" (cartão de visita) e do endereço no
      rodapé levam ao endereço certo
- [ ] `<title>`, `meta description` e Open Graph preenchidos com o conteúdo
      real (teste como fica ao colar o link publicado numa conversa do
      WhatsApp)
- [ ] `og:url` aponta para a URL final de produção, não mais um placeholder
- [ ] Favicon aparece corretamente na aba do navegador
- [ ] Testado em pelo menos um celular de verdade (não só redimensionando a
      janela do navegador no computador)
- [ ] Site publicado (Netlify/Vercel/GitHub Pages) e, se aplicável, domínio
      próprio já apontando e com HTTPS ativo

---

## 6. Sobre reutilização/licença

Este template é seu para usar, customizar e vender quantas vezes quiser para
clientes diferentes. Não há nenhuma dependência de terceiros com licença
restritiva — só HTML/CSS/JS escritos do zero e a fonte do Google Fonts (uso
gratuito, inclusive comercial).
