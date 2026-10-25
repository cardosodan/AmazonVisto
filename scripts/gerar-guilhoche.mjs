// Gera os guilhoches (impressão de segurança, como em passaportes e cédulas)
// como SVG de traço fino. Usados como máscara no CSS (a cor vem do CSS).
//
// Uso (na pasta do projeto):  node scripts/gerar-guilhoche.mjs images
import { writeFileSync } from "node:fs";

const destino = process.argv[2];
const f = (n) => (Math.round(n * 10) / 10).toString();

// Anel senoidal em coordenadas polares: rho = a + b·sin(n·t) + c·sin(m·t)
function anel(cx, cy, a, b, n, c = 0, m = 0, pontos = 720) {
  let d = "";
  for (let i = 0; i <= pontos; i++) {
    const t = (i / pontos) * Math.PI * 2;
    const r = a + b * Math.sin(n * t) + c * Math.sin(m * t);
    d += (i ? "L" : "M") + f(cx + r * Math.cos(t)) + " " + f(cy + r * Math.sin(t));
  }
  return d + "Z";
}

// Roseta: cada conjunto é um anel e as cópias giradas dele (via <use>),
// o que cria o trançado moiré típico do guilhoche.
function roseta() {
  const c = 500;
  const conjuntos = [
    { id: "a", d: anel(c, c, 420, 46, 48), copias: 8, passo: 360 / 48 / 8 },
    { id: "b", d: anel(c, c, 300, 54, 32), copias: 9, passo: 360 / 32 / 9 },
    { id: "c", d: anel(c, c, 190, 48, 20), copias: 8, passo: 360 / 20 / 8 },
    { id: "d", d: anel(c, c, 92, 40, 10), copias: 7, passo: 360 / 10 / 7 },
  ];
  let defs = "";
  let usos = "";
  for (const k of conjuntos) {
    defs += `<path id="${k.id}" d="${k.d}"/>`;
    for (let j = 0; j < k.copias; j++) usos += `<use href="#${k.id}" transform="rotate(${f(j * k.passo)} ${c} ${c})"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><defs>${defs}</defs><g fill="none" stroke="#000" stroke-width="1.1">${usos}<circle cx="${c}" cy="${c}" r="478"/><circle cx="${c}" cy="${c}" r="486"/></g></svg>`;
}

// Faixa que se repete na horizontal: ondas com períodos inteiros dentro do
// ladrilho (emendam sem costura), defasadas entre si.
function faixa() {
  const L = 320;
  const A = 140;
  const linhas = 18;
  let d = "";
  for (let k = 0; k < linhas; k++) {
    const fase = (k / linhas) * Math.PI * 2;
    for (let i = 0; i <= 160; i++) {
      const x = (i / 160) * L;
      const t = (x / L) * Math.PI * 2;
      const y = A / 2 + (k % 2 ? 50 * Math.sin(2 * t + fase) : 26 * Math.sin(4 * t - fase));
      d += (i ? "L" : "M") + f(x) + " " + f(y);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${L} ${A}" width="${L}" height="${A}"><path d="${d}" fill="none" stroke="#000" stroke-width="1"/></svg>`;
}

writeFileSync(`${destino}/guilhoche-roseta.svg`, roseta());
writeFileSync(`${destino}/guilhoche-faixa.svg`, faixa());
console.log("ok");
