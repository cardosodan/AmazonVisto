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
├── css/
│   └── style.css        → TODO o visual: cores, fontes, layout, animações
├── js/
│   └── main.js           → menu mobile, animação de rolagem, ano do rodapé
├── images/
│   ├── logo.png            → logomarca (cabeçalho + rodapé)
│   ├── favicon.png          → ícone da aba do navegador
│   ├── banner.jpg            → imagem de fundo do topo (hero)
│   ├── sobre.jpg               → foto da seção "Sobre"
│   ├── produto-1.jpg a produto-6.jpg → fotos da vitrine de produtos/serviços
│   ├── depoimento-1.jpg a depoimento-3.jpg → "fotos" dos clientes nos depoimentos
│   └── og-image.jpg           → imagem que aparece ao compartilhar o link
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
  --cor-primaria: #1b6b5a; /* cor de destaque: botões, links, título do hero */
  --cor-primaria-escura: #124a3d;
  --cor-secundaria: #e8a33d; /* cor de contraste, usada com moderação */
  ...
}
```

Troque só esses valores hexadecimais pelas cores da marca do cliente — o
resto do site (botões, ícones, sombras, hover) se ajusta sozinho, porque tudo
referencia essas variáveis.

> Dica: para gerar uma versão "escura" de uma cor rapidamente (usada em
> `--cor-primaria-escura`/`--cor-secundaria-escura`), qualquer ferramenta de
> paleta de cores online ("shade generator") resolve em segundos.

### 2.3. Fontes

Duas mudanças, sempre juntas:

1. No `index.html`, troque o link do Google Fonts no `<head>`:
   ```html
   <link href="https://fonts.googleapis.com/css2?family=SUA_FONTE..." rel="stylesheet" />
   ```
   (em [fonts.google.com](https://fonts.google.com), escolha a fonte, marque
   os pesos que for usar, e copie o link `<link>` que o próprio site gera)
2. No `css/style.css`, troque as variáveis `--fonte-titulo` e `--fonte-corpo`
   no `:root` para o nome exato da fonte nova.

### 2.4. Textos

Abra `index.html` e procure por `TROCAR` (Ctrl+F) — todo texto de exemplo que
precisa virar conteúdo real do cliente está marcado com um comentário
`<!-- TROCAR: ... -->` explicando o que colocar ali. Principais pontos:

- Nome da empresa (aparece várias vezes: cabeçalho, hero, rodapé, meta tags)
- Frase de efeito do hero (`hero__frase`)
- Textos da seção "Sobre" (história, missão, diferenciais)
- Nome/descrição de cada produto ou serviço (seção "Serviços")
- Depoimentos (texto, nome, "cargo" de cada cliente — ou apague a seção
  inteira se o cliente não tiver depoimentos ainda; ela é opcional)
- Endereço, telefone, WhatsApp, e-mail e horário (seção "Contato")
- Meta tags de SEO e Open Graph, no `<head>` (ver seção 2.7 abaixo)

### 2.5. Imagens

Troque os arquivos dentro de `images/` **mantendo o mesmo nome**, e o site
já usa a imagem nova automaticamente (não precisa editar o HTML):

| Arquivo | Onde aparece | Tamanho recomendado |
|---|---|---|
| `logo.png` | Cabeçalho e rodapé | Quadrado, ~160×160px, fundo pode ser transparente |
| `favicon.png` | Aba do navegador | Quadrado, 64×64px |
| `banner.jpg` | Fundo da seção inicial (hero) | 1600×900px (paisagem) |
| `sobre.jpg` | Seção "Sobre" | 900×1100px (retrato) |
| `produto-1.jpg` … `produto-6.jpg` | Vitrine de produtos/serviços | 800×800px (quadrado) |
| `depoimento-1.jpg` … `depoimento-3.jpg` | Avatar nos depoimentos | 300×300px (quadrado, vira círculo via CSS) |
| `og-image.jpg` | Preview ao compartilhar o link (WhatsApp etc.) | 1200×630px |

Se o cliente tiver menos de 6 produtos/serviços, apague os `<article
class="cartao-produto">` extras no `index.html` (cada um é autocontido, dá
pra apagar sem afetar os outros). Se tiver mais de 6, copie um bloco inteiro
e ajuste o número do arquivo de imagem.

### 2.6. Links de WhatsApp, redes sociais e mapa

- **WhatsApp**: procure por `wa.me/5511999999999` no `index.html` (aparece
  várias vezes: botão do cabeçalho, hero, contato, botão flutuante) e troque
  pelo número real, **só dígitos**, no formato `55` + DDD + número. Ex: para
  `(11) 98888-7777`, fica `5511988887777`. Recomendo usar Buscar-e-substituir
  do seu editor pra trocar todas as ocorrências de uma vez.
- **Redes sociais**: no rodapé, troque `href="https://instagram.com/"` e
  `href="https://facebook.com/"` pelos perfis reais. Se alguma rede não
  existir, apague a tag `<a>` inteira daquele ícone.
- **Mapa (Google Maps)**: a forma mais simples é trocar só o endereço na URL
  do `iframe` da seção Contato:
  ```html
  <iframe src="https://www.google.com/maps?q=SEU+ENDEREÇO+AQUI&output=embed" ...>
  ```
  Troque `SEU+ENDEREÇO+AQUI` pelo endereço do cliente (espaços viram `+`).
  Para um resultado mais preciso (pino exato, não só busca por texto), use o
  método oficial: no Google Maps, busque o endereço → **Compartilhar** →
  **Incorporar um mapa** → copie o código e cole todo o `<iframe>` no lugar
  do atual.

### 2.7. SEO e Open Graph (aparência no Google e ao compartilhar o link)

No `<head>` do `index.html`:

```html
<title>Nome da Empresa | Frase curta descrevendo o negócio</title>
<meta name="description" content="1-2 frases sobre o negócio, pra quem, e o diferencial." />
...
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="images/og-image.jpg" />
<meta property="og:url" content="https://www.dominio-real-do-cliente.com.br/" />
```

`og:url` precisa ser a URL final de produção — atualize depois do deploy
(seção 3).

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

## 5. Checklist antes de entregar para o cliente

- [ ] Todos os `TROCAR` no `index.html` foram substituídos (busque por
      "TROCAR" com Ctrl+F pra garantir que não sobrou nenhum)
- [ ] Cores (`:root` em `css/style.css`) refletem a marca do cliente
- [ ] Todas as imagens em `images/` foram trocadas por fotos reais (nenhum
      placeholder "IMAGEM DE DESTAQUE" sobrando)
- [ ] Número de WhatsApp correto nos 4 lugares (cabeçalho, hero, contato,
      botão flutuante) — teste clicando em cada um
- [ ] Redes sociais do rodapé apontam para os perfis certos (ou foram
      removidas, se não existirem)
- [ ] Endereço, telefone, e-mail e horário reais na seção de Contato
- [ ] Mapa mostra o endereço certo (abra o `iframe` isoladamente pra
      conferir o pino)
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
