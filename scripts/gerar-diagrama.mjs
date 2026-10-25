// Gera o diagrama "Da papelada ao visto" e coloca no index.html, no lugar do
// <figure class="caminho__diagrama">. Uso (na pasta do projeto):
//   node scripts/gerar-diagrama.mjs
//
// É o motivo do site (o balão com um canto agudo) repetido: à esquerda, solto
// em dois tons claros (a papelada); no meio, apertado numa faixa de três (a
// conversa); à direita, os vistos ✓✓ em fileiras, em dourado. Duas versões:
// deitada (desktop) e em pé (celular). As posições saem de um gerador com
// semente fixa, então o desenho é sempre o mesmo.
import { readFileSync, writeFileSync } from "node:fs";

const raiz = new URL("..", import.meta.url);
const arquivo = new URL("index.html", raiz);

let semente = 20251;
const aleatorio = () => ((semente = (semente * 16807) % 2147483647) / 2147483647);
const r1 = (n) => Math.round(n * 10) / 10;

// Balão de 14px: canto de cima à esquerda agudo, os outros arredondados.
const balao = `<path id="dgB" d="M0 0H8A6 6 0 0 1 14 6V8A6 6 0 0 1 8 14H6A6 6 0 0 1 0 8Z" />`;

function deitado() {
  const L = 1800, A = 400, meio = A / 2;
  let soltos = "", faixa = "", vistos = "";
  for (let i = 0; i < 46; i++) {
    const t = Math.pow(aleatorio(), 0.85);
    const x = 24 + t * 556;
    const espalho = (1 - t) * 168 + 14;
    const y = meio + (aleatorio() * 2 - 1) * espalho;
    const giro = (aleatorio() * 2 - 1) * (1 - t) * 70;
    const tom = aleatorio() < 0.5 ? "dg-claro" : "dg-medio";
    soltos += `<use href="#dgB" class="${tom}" transform="translate(${r1(x)} ${r1(y)}) rotate(${r1(giro)} 7 7)" />`;
  }
  for (let x = 604; x <= 1186; x += 22) {
    for (const dy of [-17, 0, 17]) faixa += `<use href="#dgB" class="dg-faixa" x="${x}" y="${meio + dy - 7}" style="--i:${(x - 604) / 22}" />`;
  }
  const linhas = [-96, -32, 32, 96];
  linhas.forEach((dy, l) => {
    for (let c = 0; c < 9; c++) {
      const abre = (1 - c / 8) * 0.55; // as fileiras saem juntas da faixa e se abrem
      const x = 1222 + c * 64;
      const y = meio + dy * (1 - abre) - 10;
      vistos += `<use href="#visto" class="dg-visto" x="${r1(x)}" y="${r1(y)}" width="31" height="20" style="--i:${c * 4 + l}" />`;
    }
  });
  return `<svg class="diagrama diagrama--deitado" viewBox="0 0 ${L} ${A}" preserveAspectRatio="xMidYMid meet" focusable="false"><defs>${balao}</defs>${soltos}${faixa}${vistos}</svg>`;
}

function empe() {
  const L = 600, A = 800, meio = L / 2;
  let soltos = "", faixa = "", vistos = "";
  for (let i = 0; i < 40; i++) {
    const t = Math.pow(aleatorio(), 0.85);
    const y = 18 + t * 236;
    const espalho = (1 - t) * 240 + 14;
    const x = meio + (aleatorio() * 2 - 1) * espalho;
    const giro = (aleatorio() * 2 - 1) * (1 - t) * 70;
    const tom = aleatorio() < 0.5 ? "dg-claro" : "dg-medio";
    soltos += `<use href="#dgB" class="${tom}" transform="translate(${r1(x)} ${r1(y)}) rotate(${r1(giro)} 7 7)" />`;
  }
  for (let y = 270; y <= 528; y += 22) {
    for (const dx of [-17, 0, 17]) faixa += `<use href="#dgB" class="dg-faixa" x="${meio + dx - 7}" y="${y}" style="--i:${(y - 270) / 22}" />`;
  }
  for (let l = 0; l < 6; l++) {
    for (let c = 0; c < 5; c++) {
      const abre = (1 - l / 5) * 0.55;
      const x = meio + (c - 2) * 96 * (1 - abre) - 15;
      const y = 566 + l * 38;
      vistos += `<use href="#visto" class="dg-visto" x="${r1(x)}" y="${r1(y)}" width="31" height="20" style="--i:${l * 5 + c}" />`;
    }
  }
  return `<svg class="diagrama diagrama--empe" viewBox="0 0 ${L} ${A}" preserveAspectRatio="xMidYMid meet" focusable="false"><defs>${balao.replace('id="dgB"', 'id="dgB2"')}</defs>${soltos.replaceAll("#dgB", "#dgB2")}${faixa.replaceAll("#dgB", "#dgB2")}${vistos}</svg>`;
}

let html = readFileSync(arquivo, "utf8");
const abre = '<figure class="caminho__diagrama entrada" aria-hidden="true">';
const ini = html.indexOf(abre);
const fim = html.indexOf("</figure>", ini);
if (ini < 0 || fim < 0) throw new Error("não achei o <figure class=\"caminho__diagrama\">");
const nl = html.includes("\r\n") ? "\r\n" : "\n";
html = html.slice(0, ini + abre.length) + nl + "        " + deitado() + nl + "        " + empe() + nl + "      " + html.slice(fim);
writeFileSync(arquivo, html);
console.log("diagrama ok");
