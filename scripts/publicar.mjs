// Deixa o site pronto para publicar, num comando só:
//   node scripts/publicar.mjs
//
// 1. A versão do CSS e do JS (o "?v=" no index.html e no 404.html) passa a
//    ser um resumo do conteúdo de cada arquivo: muda sozinha quando o
//    arquivo muda, e só então. O GitHub Pages guarda os arquivos em cache;
//    sem a versão nova, quem já visitou veria o CSS antigo com o HTML novo.
// 2. Gera o es.html (scripts/gerar-es.mjs) a partir do index.html.
//
// A verificação do GitHub (.github/workflows/verificar.yml) roda este mesmo
// script e falha se ele mudar algum arquivo: sinal de que alguém esqueceu de
// rodar antes do commit.
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const raiz = new URL("..", import.meta.url);
const ler = (arquivo) => readFileSync(new URL(arquivo, raiz));
// O resumo ignora o fim de linha (CRLF no Windows, LF no GitHub), para dar o
// mesmo valor em qualquer máquina.
const resumo = (arquivo) =>
  createHash("sha256").update(ler(arquivo).toString("utf8").replace(/\r\n/g, "\n")).digest("hex").slice(0, 10);

const versoes = { "css/style.css": resumo("css/style.css"), "js/main.js": resumo("js/main.js") };
for (const pagina of ["index.html", "404.html"]) {
  const antes = ler(pagina).toString("utf8");
  let depois = antes;
  for (const [arquivo, versao] of Object.entries(versoes)) {
    depois = depois.replace(new RegExp(`${arquivo.replace(/[./]/g, "\\$&")}\\?v=[\\w-]+`, "g"), `${arquivo}?v=${versao}`);
  }
  if (depois !== antes) {
    writeFileSync(new URL(pagina, raiz), depois);
    console.log(`${pagina}: versões atualizadas`);
  }
}
console.log(`css/style.css?v=${versoes["css/style.css"]}  js/main.js?v=${versoes["js/main.js"]}`);

const es = spawnSync(process.execPath, [fileURLToPath(new URL("scripts/gerar-es.mjs", raiz))], { stdio: "inherit" });
process.exit(es.status ?? 1);
